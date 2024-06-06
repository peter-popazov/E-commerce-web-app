package com.ecommerce.app.order;

import com.ecommerce.app.user.AppUser;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
@PreAuthorize("hasAnyRole('USER', 'STAFF')")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<WebOrder>> getOrders(@AuthenticationPrincipal AppUser appUser) {
        return ResponseEntity.ok(orderService.getOrders(appUser));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<WebOrder> getOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.getOrder(orderId));
    }

    @PostMapping("/{addressId}")
    public ResponseEntity<WebOrder> addOrder(@AuthenticationPrincipal AppUser appUser,
                                             @RequestBody List<WebOrderContentDTO> dto, @PathVariable Long addressId) throws MessagingException {
        return ResponseEntity.ok(orderService.addOrder(appUser, dto, addressId));
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.ok("Order deleted successfully");
    }
}
