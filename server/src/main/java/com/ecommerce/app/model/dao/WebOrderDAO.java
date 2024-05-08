package com.ecommerce.app.model.dao;

import com.ecommerce.app.model.WebOrder;
import com.ecommerce.app.model.AppUser;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

//public interface WebOrderDAO extends ListCrudRepository<WebOrder, Long> {
//
//    List<WebOrder> findByAppUser(AppUser user);
//
//}

@Repository
public class WebOrderDAO  {

    private EntityManager entityManager;

    public WebOrderDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<WebOrder> findByAppUser(AppUser user) {
        return entityManager.createQuery("SELECT wo FROM WebOrder wo WHERE wo.appUser = :user", WebOrder.class)
                .setParameter("user", user)
                .getResultList();
    }

}

