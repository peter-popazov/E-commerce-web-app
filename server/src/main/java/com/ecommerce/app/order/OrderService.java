package com.ecommerce.app.order;

import com.ecommerce.app.model.WebOrder;
import com.ecommerce.app.model.dao.WebOrderDAO;
import com.ecommerce.app.user.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final WebOrderDAO webOrderDAO;

    @Autowired
    public OrderService(WebOrderDAO webOrderDAO) {
        this.webOrderDAO = webOrderDAO;
    }

    public List<WebOrder> getOrders(AppUser user) {
        return webOrderDAO.findByAppUser(user);
    }
}
