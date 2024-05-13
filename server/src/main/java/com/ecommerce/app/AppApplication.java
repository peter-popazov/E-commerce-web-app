package com.ecommerce.app;

import com.ecommerce.app.model.dao.RoleDAO;
import com.ecommerce.app.user.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@EnableJpaAuditing
@SpringBootApplication
public class AppApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(RoleDAO roleDAO) {
        return _ -> {
            if (roleDAO.findByName("USER").isEmpty()) {
                roleDAO.save(Role.builder().name("USER").build());
            }
        };
    }

}
