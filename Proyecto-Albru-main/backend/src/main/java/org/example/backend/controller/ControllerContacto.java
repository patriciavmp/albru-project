package org.example.backend.controller;

import org.example.backend.entity.Contacto;
import org.example.backend.service.ContactoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/contacto")
public class ControllerContacto {
    ContactoService contactoService;

    @Autowired
    ControllerContacto(ContactoService contactoService){
        this.contactoService = contactoService;
    }

    @GetMapping("/all")
    List<Contacto> getAll(){
        return contactoService.findAll();
    }

    @GetMapping("/{contacto_id}")
    Contacto getById(Integer contacto_id){
        return contactoService.findById(contacto_id).get();
    }
}
