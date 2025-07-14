package org.example.backend.mapper;

import org.example.backend.dto.UserDto;
import org.example.backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "authorityId", expression = "java(user.getAuthority().getId())")
    @Mapping(target = "roleName", expression = "java(user.getRoleName())")
    UserDto toDto(User user);


    @Mapping(target = "authority", ignore = true)
    @Mapping(target = "contactos", ignore = true)
    User toEntity(UserDto dto);
}
