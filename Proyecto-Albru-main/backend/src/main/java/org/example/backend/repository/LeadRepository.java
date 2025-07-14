package org.example.backend.repository;

import org.example.backend.entity.LeadContacto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<LeadContacto,Integer> {

}
