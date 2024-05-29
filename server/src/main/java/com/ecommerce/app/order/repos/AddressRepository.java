package com.ecommerce.app.order.repos;

import com.ecommerce.app.address.Address;
import com.ecommerce.app.user.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByAppUser(AppUser appUser);

    void deleteByAppUser(AppUser appUser);
}
