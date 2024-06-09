package com.ecommerce.app.address;

import com.ecommerce.app.logging.LoggingService;
import com.ecommerce.app.order.repos.AddressRepository;
import com.ecommerce.app.user.AppUser;
import com.ecommerce.app.user.AppUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final AppUserRepository appUserRepository;

    public List<Address> getUserAddress(AppUser user) {
        return addressRepository.findByAppUser(user);
    }

    @Transactional
    public AddressResponse saveAddress(AppUser user, AddressDTO addressDTO) {

        user.setFirstName(addressDTO.getFirstName());
        user.setLastName(addressDTO.getLastName());
        appUserRepository.save(user);

        var address = Address.builder()
                .addressLine1(addressDTO.getAddressLine1())
                .addressLine2(addressDTO.getAddressLine2())
                .city(addressDTO.getCity())
                .country(addressDTO.getCountry())
                .appUser(user)
                .build();

        return AddressResponse.builder()
                .id(addressRepository.save(address).getId())
                .build();
    }

    @Transactional
    public void updateAddress(AddressDTO addressDTO, Long addressId) {
        Address existingAddress = addressRepository.findById(addressId).
                orElseThrow(() -> new RuntimeException("No address found with id: " + addressId));

        existingAddress.setAddressLine1(addressDTO.getAddressLine1());
        existingAddress.setAddressLine2(addressDTO.getAddressLine2());
        existingAddress.setCity(addressDTO.getCity());
        existingAddress.setCountry(addressDTO.getCountry());

        addressRepository.save(existingAddress);
    }

    @Transactional
    public void deleteAddress(Long addressId) {
        addressRepository.deleteById(addressId);
    }
}
