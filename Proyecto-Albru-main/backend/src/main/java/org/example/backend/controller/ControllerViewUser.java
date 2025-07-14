package org.example.backend.controller;


import org.example.backend.dto.UserDto;
import org.example.backend.entity.User;
import org.example.backend.repository.AuthorityRepository;
import org.example.backend.repository.LeadRepository;
import org.example.backend.service.LeadContactoImp;
import org.example.backend.service.UserService;
import org.example.backend.service.UserServiceImp;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.InputStream;


@Controller
@RequestMapping("/user")
public class ControllerViewUser {
    private final UserServiceImp userServiceImp;
    private final AuthorityRepository authorityRepository;
    private final LeadRepository leadRepository;
    private final LeadContactoImp leadContactoImp;

    public ControllerViewUser(UserServiceImp userServiceImp, AuthorityRepository authorityRepository, LeadRepository leadRepository, LeadContactoImp leadContactoImp) {
        this.userServiceImp = userServiceImp;
        this.authorityRepository = authorityRepository;
        this.leadRepository = leadRepository;
        this.leadContactoImp = leadContactoImp;
    }


    @GetMapping("/")
    public String inicio(){
        return "inicio";
    }       
    @GetMapping("/registro")
    public String registro() {
        return "registro";
    }
    @GetMapping("/leads")
    public String leads(Model model) {
        model.addAttribute("listaLeads",leadContactoImp.findAll());
        model.addAttribute("usuario",new UserDto());
        return "leads";
    }


    @GetMapping("/perfil")
    public String perfil() {
        return "perfil";
    }
    @GetMapping("/asistenciaSeguimiento")
    public String asistenciaSeguimiento() {
        return "asistenciaSeguimiento";
    }
    @GetMapping("/actividades")
    public String actividades() {
        return "actividades";
    }
    @GetMapping("/detallesAdmin")
    public String detallesAdmin() {
        return "detallesAdmin";
    }

    @GetMapping("/ayudaAdmin")
    public String ayudaAdmin() {
        return "ayudaAdmin";
    }

    @GetMapping("/ayudaAsesor")
    public String ayudaAsesor() {
        return "ayudaAsesor";
    }

    @GetMapping("/admin")
    public String registerForm(Model model){

        model.addAttribute("listaUsuarios", userServiceImp.findAll());
        model.addAttribute("usuario", new UserDto());
        model.addAttribute("listaAuthorities", authorityRepository.findAll());
        return "admin";
    }

    @PostMapping("/admin")
    public String register(@ModelAttribute UserDto userDto){
        userServiceImp.save(userDto);
        return "redirect:/user/admin?success";
    }

    @PostMapping("/delete/{id}")
    public String delete(@PathVariable("id") String dni) {
        userServiceImp.deleteByDni(dni);
        return "redirect:/user/admin?deleted=success";
    }

    // Nuevo método para importar leads desde Excel
    @PostMapping("/importar/excel")
    public String importarExcel(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Por favor, seleccione un archivo para subir.");
            return "redirect:/user/leads";
        }
        try (InputStream inputStream = file.getInputStream()) {
            leadContactoImp.importarLeadsDesdeExcel(inputStream);
            redirectAttributes.addFlashAttribute("success", "Archivo importado correctamente.");
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error al importar el archivo: " + e.getMessage());
        }
        return "redirect:/user/leads";
    }


    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }

    @GetMapping("/editar/{dni}")
    public String editarUsuario(@PathVariable("dni") String dni, Model model) {
        UserDto userDto = userServiceImp.findById(dni);
        model.addAttribute("usuario", userDto);
        model.addAttribute("listaUsuarios", userServiceImp.findAll());
        model.addAttribute("listaAuthorities", authorityRepository.findAll());
        return "admin";
    }

    @PostMapping("/update")
    public String actualizarUsuario(@ModelAttribute("usuario") UserDto usuarioActualizado) {
        UserDto usuarioExistente = userServiceImp.findById(usuarioActualizado.getDni());

        if (usuarioExistente != null) {
            usuarioExistente.setNombres(usuarioActualizado.getNombres());
            usuarioExistente.setApellidos(usuarioActualizado.getApellidos());
            usuarioExistente.setGenero(usuarioActualizado.getGenero());
            usuarioExistente.setAuthorityId(usuarioActualizado.getAuthorityId());

            userServiceImp.save(usuarioExistente);
        }

        return "redirect:/user/admin";
    }

}
