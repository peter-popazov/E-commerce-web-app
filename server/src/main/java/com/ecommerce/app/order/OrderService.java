package com.ecommerce.app.order;

import com.ecommerce.app.address.Address;
import com.ecommerce.app.model.Product;
import com.ecommerce.app.order.repos.AddressRepository;
import com.ecommerce.app.order.repos.WebOrderContentRepository;
import com.ecommerce.app.order.repos.WebOrderRepository;
import com.ecommerce.app.product.ProductRepository;
import com.ecommerce.app.user.AppUser;
import com.ecommerce.app.user.AppUserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final WebOrderRepository webOrderRepository;
    private final AppUserDAO appUserDAO;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final WebOrderContentRepository webOrderContentRepository;

    public List<WebOrder> getOrders(AppUser user) {
        Long userId = user.getId();
        return webOrderRepository.findByAppUserId(userId);
    }

    public WebOrder getOrder(Long orderId) {
        return webOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order with this is is not present " + orderId));
    }

    @Transactional
    public WebOrder addOrder(AppUser appUser, List<WebOrderContentDTO> dto, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));

        WebOrder newWebOrder = WebOrder.builder()
                .appUser(appUser)
                .address(address)
                .build();

        WebOrder savedOrder = webOrderRepository.save(newWebOrder);

        for (WebOrderContentDTO orderContentDTO : dto) {
            Product product = productRepository.findById(orderContentDTO.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id:" + orderContentDTO.getProductId()));

            WebOrderContent webOrderContent = WebOrderContent.builder()
                    .product(product)
                    .quantity(orderContentDTO.getQuantity())
                    .webOrder(savedOrder)
                    .build();

            savedOrder.getContents().add(webOrderContent);
            webOrderContentRepository.save(webOrderContent);
        }

        return webOrderRepository.save(savedOrder);
    }

    public void deleteOrder(Long orderId) {
        WebOrder webOrder = webOrderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order with this is is not present " + orderId));
        webOrderRepository.delete(webOrder);
    }
}
