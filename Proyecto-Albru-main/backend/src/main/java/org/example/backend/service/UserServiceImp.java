package org.example.backend.service;


import org.example.backend.dto.UserDto;
import org.example.backend.entity.Authority;
import org.example.backend.entity.User;
import org.example.backend.mapper.UserMapper;
import org.example.backend.repository.AuthorityRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImp implements UserService {
    private final PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private UserMapper userMapper;

    @Autowired
    public UserServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthorityRepository authorityRepository, UserMapper userMapper){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityRepository = authorityRepository;
        this.userMapper = userMapper;
    }

    @Override
    public List<UserDto> findAll() {
        return userRepository.findAll().stream().map(x->userMapper.toDto(x)).toList();
    }

    @Override
    public UserDto findById(String dni) {
        Optional<User> result = userRepository.findById(dni);
        User temp = null;
        if(result.isPresent()){
            temp = result.get();
        }
        return userMapper.toDto(temp);
    }



    @Override

    public void save(UserDto userDto) {
        User user = userMapper.toEntity(userDto);
        Optional<Authority> authority = authorityRepository.findById(userDto.getAuthorityId());
        user.setAuthority(authority.get());
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    @Override
    public void deleteByDni(String dni) {
        userRepository.deleteById(dni);
    }


}
