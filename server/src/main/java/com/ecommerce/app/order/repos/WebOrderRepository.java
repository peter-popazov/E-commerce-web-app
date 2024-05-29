package com.ecommerce.app.order.repos;

import com.ecommerce.app.order.WebOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WebOrderRepository extends JpaRepository<WebOrder, Long> {

    @Query("SELECT wo FROM WebOrder wo WHERE wo.appUser.id = :userId")
    List<WebOrder> findByAppUserId(@Param("userId") Long userId);
}

