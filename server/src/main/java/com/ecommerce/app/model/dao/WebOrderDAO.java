package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.WebOrder;
import com.ecommerce.app.user.AppUser;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class WebOrderDAO {

    private final EntityManager entityManager;

    @Transactional
    public List<WebOrder> findByAppUser(Long userId) {
        return entityManager.createQuery("SELECT wo FROM WebOrder wo WHERE wo.appUser.id = :user_id", WebOrder.class)
                .setParameter("user_id", userId)
                .getResultList();
    }

}

