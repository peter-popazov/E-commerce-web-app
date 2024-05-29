package com.ecommerce.app.order.repos;

import com.ecommerce.app.order.WebOrderContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WebOrderContentRepository extends JpaRepository<WebOrderContent, Long> {
}
