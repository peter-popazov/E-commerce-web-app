package com.ecommerce.app.staff;

import com.ecommerce.app.auth.AuthService;
import com.ecommerce.app.auth.dto.AuthResponse;
import com.ecommerce.app.auth.dto.RegistrationBody;
import com.ecommerce.app.logging.LoggingController;
import com.ecommerce.app.product.Product;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@LoggingController
@RestController
@RequestMapping("/staff")
public class StaffController {

    private final StaffService staffService;
    private final AuthService authService;

    @Autowired
    public StaffController(StaffService staffService, AuthService authService) {
        this.staffService = staffService;
        this.authService = authService;
    }

    @PreAuthorize("hasRole('STAFF')")
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerStaff(@Valid @RequestBody RegistrationBody registrationBody) throws MessagingException {
        registrationBody.setRole("STAFF");
        return ResponseEntity.ok(authService.register(registrationBody));
    }

    @PreAuthorize("hasRole('STAFF')")
    @PostMapping("/product")
    public ResponseEntity<Product> addProduct(@Valid @RequestBody ProductBody productBody) {
        return ResponseEntity.ok(staffService.addNewProduct(productBody));
    }

    @PreAuthorize("hasRole('STAFF')")
    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.getProductById(id));
    }

    @PreAuthorize("hasRole('STAFF')")
    @PutMapping("/product/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id,
                                                 @Valid @RequestBody ProductBody productBody) {
        return ResponseEntity.ok(staffService.updateProduct(id, productBody));
    }

    @PreAuthorize("hasRole('STAFF')")
    @DeleteMapping("/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        staffService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
