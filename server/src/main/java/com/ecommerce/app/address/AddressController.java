package com.ecommerce.app.address;

import com.ecommerce.app.user.AppUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

    @GetMapping
    public ResponseEntity<List<Address>> getUserAddress(@AuthenticationPrincipal AppUser user) {
        return ResponseEntity.ok(addressService.getUserAddress(user));
    }

    @PostMapping("/all")
    public ResponseEntity<?> addUserAddress(@AuthenticationPrincipal AppUser user, @RequestBody AddressDTO addressDTO) {
        addressService.saveAddress(user, addressDTO);
        return ResponseEntity.ok("Address successfully added");
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(@RequestBody AddressDTO addressDTO, @PathVariable Long addressId) {
        addressService.updateAddress(addressDTO, addressId);
        return ResponseEntity.ok("Address successfully updated");
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<?> deleteUserAddress(@PathVariable Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseEntity.ok("Address successfully deleted");
    }
}
