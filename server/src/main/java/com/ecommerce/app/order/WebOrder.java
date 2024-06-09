package com.ecommerce.app.order;

import com.ecommerce.app.address.Address;
import com.ecommerce.app.user.AppUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "web_order")
@EntityListeners(AuditingEntityListener.class)
public class WebOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private AppUser appUser;

    @ManyToOne(optional = false)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @OneToMany(mappedBy = "webOrder", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<WebOrderContent> contents;

    @Column(name = "created_date", updatable = false)
    private String createdDate;

    @Column(name = "updated_date", insertable = false)
    private String lastModifiedDate;

    public WebOrder() {
        this.contents = new ArrayList<>();
    }

    @Builder
    public WebOrder(AppUser appUser, Address address, String createdDate, String lastModifiedDate) {
        this.appUser = appUser;
        this.address = address;
        this.contents = new ArrayList<>();
        this.createdDate = createdDate;
        this.lastModifiedDate = lastModifiedDate;
    }

    @Override
    public String toString() {
        return "WebOrder{" +
                "id=" + id +
                '}';
    }
}