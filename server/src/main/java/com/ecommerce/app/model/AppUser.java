package com.ecommerce.app.model;

import com.ecommerce.app.api.config.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Setter
@NoArgsConstructor
@Entity
@Table(name = "app_user")
public class AppUser implements UserDetails {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Long id;

    @Getter
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Getter
    @JsonIgnore
    @Column(name = "password", nullable = false)
    private String password;

    @Getter
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Getter
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Getter
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @JsonIgnore
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Address> addresses = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    @JsonIgnore
    public List<Address> getAddresses() {
        return addresses;
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }
}
