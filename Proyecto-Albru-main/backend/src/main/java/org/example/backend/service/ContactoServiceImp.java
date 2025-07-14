package org.example.backend.service;

import org.example.backend.entity.Contacto;
import org.example.backend.entity.LeadContacto;
import org.example.backend.repository.ContactoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactoServiceImp implements ContactoService {
    ContactoRepository contactoRepository;


    @Autowired
    public ContactoServiceImp(ContactoRepository contactoRepository){
        this.contactoRepository = contactoRepository;
    }

    @Override
    public List<Contacto> findAll() {
        return contactoRepository.findAll();
    }

    @Override
    public Optional<Contacto> findById(Integer contacto_id) {
        Optional<Contacto> lead = null;
        lead = contactoRepository.findById(contacto_id);
        return lead;
    }

    @Override
    public void save(Contacto contacto) {
        contactoRepository.save(contacto);
    }
}
