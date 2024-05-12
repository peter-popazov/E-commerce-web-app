package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenDAO extends JpaRepository<Token, Long> {

    Optional<Token> findByToken(String token);
}
