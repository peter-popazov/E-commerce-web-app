package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.AppUser;
import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface AppUserDAO extends ListCrudRepository<AppUser, Long> {

    Optional<AppUser> findByUsernameIgnoreCase(String username);

    Optional<AppUser> findByEmailIgnoreCase(String email);

}
