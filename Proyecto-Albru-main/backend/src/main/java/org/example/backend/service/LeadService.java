package org.example.backend.service;

import org.example.backend.entity.LeadContacto;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Optional;

public interface LeadService {
    List<LeadContacto> findAll();

    Optional<LeadContacto> findById(Integer lead_id);

    void save(LeadContacto user);

    void importarLeadsDesdeExcel(InputStream inputStream) throws Exception;

}
