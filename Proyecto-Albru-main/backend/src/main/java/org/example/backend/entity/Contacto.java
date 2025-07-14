package org.example.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "contacto", schema = "albru")
public class Contacto {
    @Id
    @Column(name = "contacto_id", nullable = false)
    private Integer id;

    @Column(name = "fecha_contacto")
    private LocalDate fechaContacto;

    @Column(name = "estado", length = 20)
    private String estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "asesor_dni")
    private User asesorDni;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id")
    private EmpresaPlan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lead_id")
    private LeadContacto lead;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_dni")
    private ContactoLocation clienteDni;

    public ContactoLocation getClienteDni() {
        return clienteDni;
    }

    public void setClienteDni(ContactoLocation clienteDni) {
        this.clienteDni = clienteDni;
    }

    public LeadContacto getLead() {
        return lead;
    }

    public void setLead(LeadContacto lead) {
        this.lead = lead;
    }

    public EmpresaPlan getPlan() {
        return plan;
    }

    public void setPlan(EmpresaPlan plan) {
        this.plan = plan;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDate getFechaContacto() {
        return fechaContacto;
    }

    public void setFechaContacto(LocalDate fechaContacto) {
        this.fechaContacto = fechaContacto;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public User getAsesorDni() {
        return asesorDni;
    }

    public void setAsesorDni(User asesorDni) {
        this.asesorDni = asesorDni;
    }

}