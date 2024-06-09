package com.ecommerce.app.order;

import com.ecommerce.app.address.Address;
import com.ecommerce.app.email.EmailService;
import com.ecommerce.app.email.EmailTemplateName;
import com.ecommerce.app.email.OrderItem;
import com.ecommerce.app.logging.LoggingService;
import com.ecommerce.app.product.Product;
import com.ecommerce.app.order.repos.AddressRepository;
import com.ecommerce.app.order.repos.WebOrderContentRepository;
import com.ecommerce.app.order.repos.WebOrderRepository;
import com.ecommerce.app.product.ProductRepository;
import com.ecommerce.app.user.AppUser;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@LoggingService
@Service
@RequiredArgsConstructor
public class OrderService {

    private final WebOrderRepository webOrderRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final WebOrderContentRepository webOrderContentRepository;
    private final EmailService emailService;

    public List<WebOrder> getOrders(AppUser user) {
        Long userId = user.getId();
        return webOrderRepository.findByAppUserId(userId);
    }

    public WebOrder getOrder(Long orderId) {
        return webOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order with this is is not present " + orderId));
    }

    @Transactional
    public WebOrder addOrder(AppUser appUser, List<WebOrderContentDTO> dto, Long addressId) throws MessagingException {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        WebOrder newWebOrder = WebOrder.builder()
                .appUser(appUser)
                .address(address)
                .createdDate(String.valueOf(LocalDateTime.now()))
                .build();

        WebOrder savedOrder = webOrderRepository.save(newWebOrder);

        List<OrderItem> orderItems = new ArrayList<>();

        for (WebOrderContentDTO orderContentDTO : dto) {
            Product product = productRepository.findById(orderContentDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id:" + orderContentDTO.getProductId()));

            Integer initialQuantity = product.getInventory().getQuantity();
            if (initialQuantity < orderContentDTO.getQuantity()) {
                throw new RuntimeException("Not enough inventory");
            }
            product.getInventory().setQuantity(initialQuantity - orderContentDTO.getQuantity());

            WebOrderContent webOrderContent = WebOrderContent.builder()
                    .product(product)
                    .quantity(orderContentDTO.getQuantity())
                    .webOrder(savedOrder)
                    .build();

            savedOrder.getContents().add(webOrderContent);
            webOrderContentRepository.save(webOrderContent);

            var orderItem = OrderItem
                    .builder()
                    .name(product.getName())
                    .image(product.getFilePath())
                    .price(product.getPrice())
                    .quantity(orderContentDTO.getQuantity())
                    .build();

            orderItems.add(orderItem);
        }

        Integer totalPrice = orderItems.stream()
                .mapToInt(item -> item.getPrice() * item.getQuantity())
                .sum();

        emailService.sendOrderEmail(appUser.getEmail(), appUser.getUsername(), EmailTemplateName.ORDER_CONFIRMATION, orderItems, totalPrice, "Your Order Confirmation");

        return webOrderRepository.save(savedOrder);
    }

    public void deleteOrder(Long orderId) {
        WebOrder webOrder = webOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order with this is is not present " + orderId));
        webOrderRepository.delete(webOrder);
    }
}
