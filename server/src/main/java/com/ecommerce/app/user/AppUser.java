package com.ecommerce.app.user;

import com.ecommerce.app.address.Address;
import com.ecommerce.app.user.utils.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "app_user")
@EntityListeners(AuditingEntityListener.class)
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
    @Column(name = "first_name")
    private String firstName;

    @Getter
    @Column(name = "last_name")
    private String lastName;

    @Getter
    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "account_locked")
    private boolean accountLocked;

    @JsonIgnore
    @OneToMany(mappedBy = "appUser", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<Address> addresses = new ArrayList<>();

    @Getter
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    @Getter
    @Column(name = "created_date", nullable = false, updatable = false)
    private String createdDate;

    @Getter
    @Column(name = "updated_date", insertable = false)
    private String lastModifiedDate;

    @JsonIgnore
    public List<Address> getAddresses() {
        return addresses;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    public String getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
