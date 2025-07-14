package org.example.backend.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "lead_contacto", schema = "albru")
public class LeadContacto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lead_id", nullable = false)
    private Integer id;

    @Column(name = "celular", length = 9)
    private String celular;

    @Column(name = "fecha")
    private Instant fecha;

    @Column(name = "celular_alt", length = 9)
    private String celularAlt;

    @ColumnDefault("'nuevo'")
    @Column(name = "estado", length = 20)
    private String estado;

    @OneToMany(mappedBy = "lead")
    private Set<Contacto> contactos = new LinkedHashSet<>();

    public Set<Contacto> getContactos() {
        return contactos;
    }

    public void setContactos(Set<Contacto> contactos) {
        this.contactos = contactos;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public Instant getFecha() {
        return fecha;
    }

    public void setFecha(Instant fecha) {
        this.fecha = fecha;
    }

    public String getCelularAlt() {
        return celularAlt;
    }

    public void setCelularAlt(String celularAlt) {
        this.celularAlt = celularAlt;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

}