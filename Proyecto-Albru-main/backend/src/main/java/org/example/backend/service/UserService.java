package org.example.backend.service;

import org.example.backend.dto.UserDto;
import org.example.backend.entity.User;

import java.util.List;

public interface UserService {
    List<UserDto> findAll();

    UserDto findById(String dni);

    void save(UserDto user);

    void deleteByDni(String dni);
}
