package org.example.backend.entity;

import jakarta.persistence.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@Table(name = "empresas", schema = "albru")
public class Empresa {
    @Id
    @Column(name = "id_empresa", nullable = false)
    private Integer id;

    @Column(name = "nombre_empresa_1", length = 40)
    private String nombreEmpresa1;

    @OneToMany(mappedBy = "idEmpresa")
    private Set<EmpresaPlan> empresaPlans = new LinkedHashSet<>();

    public Set<EmpresaPlan> getEmpresaPlans() {
        return empresaPlans;
    }

    public void setEmpresaPlans(Set<EmpresaPlan> empresaPlans) {
        this.empresaPlans = empresaPlans;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombreEmpresa1() {
        return nombreEmpresa1;
    }

    public void setNombreEmpresa1(String nombreEmpresa1) {
        this.nombreEmpresa1 = nombreEmpresa1;
    }

}