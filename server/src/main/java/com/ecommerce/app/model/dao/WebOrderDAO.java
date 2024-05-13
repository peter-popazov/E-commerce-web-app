package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.WebOrder;
import com.ecommerce.app.user.AppUser;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class WebOrderDAO {

    private final EntityManager entityManager;

    public List<WebOrder> findByAppUser(AppUser user) {
        return entityManager.createQuery("SELECT wo FROM WebOrder wo WHERE wo.appUser = :user", WebOrder.class)
                .setParameter("user", user)
                .getResultList();
    }

}

