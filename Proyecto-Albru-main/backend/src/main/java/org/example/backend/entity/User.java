package org.example.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name ="user")
public class User {
    @Id
    @Column(length = 8)
    private String dni;

    @Column(name = "nombres", length = 50)
    private String nombres;

    @Column(name = "apellidos", length = 50)
    private String apellidos;

    @Column(name = "genero", length = 10)
    private String genero;

    @Column(name = "password", length = 68)
    private String password;

    @ManyToOne
    @JoinColumn(name = "authority_id")
    private Authority authority;

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @Column(name = "enabled")
    private Boolean enabled;


    @JsonIgnore
    @OneToMany(mappedBy = "asesorDni")
    private Set<Contacto> contactos = new LinkedHashSet<>();

    public Set<Contacto> getContactos() {
        return contactos;
    }

    public String getRoleName() {
        return this.authority.getAuthority();
    }

    public void setContactos(Set<Contacto> contactos) {
        this.contactos = contactos;
    }

    public Authority getAuthority() {
        return authority;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getDni() {
        return dni;
    }
}
