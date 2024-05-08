package com.ecommerce.app.api.security;

import com.auth0.jwt.exceptions.JWTDecodeException;
import com.ecommerce.app.model.AppUser;
import com.ecommerce.app.model.dao.AppUserDAO;
import com.ecommerce.app.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
public class JWTRequestFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final AppUserDAO appUserDAO;

    public JWTRequestFilter(JWTService jwtService, AppUserDAO appUserDAO) {
        this.jwtService = jwtService;
        this.appUserDAO = appUserDAO;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String tokenHeader = request.getHeader("Authorization");
        if (tokenHeader != null && tokenHeader.startsWith("Bearer ")) {
            String token = tokenHeader.substring(7);
            try {
                String username = jwtService.getUserName(token);
                Optional<AppUser> appUser = appUserDAO.findByUsernameIgnoreCase(username);
                if (appUser.isPresent()) {
                    AppUser user = appUser.get();
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, List.of());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }

            } catch (JWTDecodeException _) {
            }
        }
        filterChain.doFilter(request, response);
    }
}
