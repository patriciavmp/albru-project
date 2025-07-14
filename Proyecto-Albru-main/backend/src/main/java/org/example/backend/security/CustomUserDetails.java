package org.example.backend.security;

import org.example.backend.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

import static org.aspectj.weaver.tools.cache.SimpleCacheFactory.enabled;

public class CustomUserDetails implements UserDetails {

    private final User usuario;

    public CustomUserDetails(User usuario) {
        this.usuario = usuario;
    }


    public String getName() {
        return usuario.getNombres();
    }

    public String getLastName() {
        return usuario.getApellidos();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of((GrantedAuthority) usuario.getAuthority());
    }

    @Override
    public String getPassword() {
        return usuario.getPassword();
    }

    @Override
    public String getUsername() {
        return usuario.getDni();
    }

    public String getRoleName(){
        return usuario.getAuthority().getAuthority();
    }

    public String getFullName(){
        return getName()+ " " + getLastName();
    }

    public String getGenero(){
        return usuario.getGenero();
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
}