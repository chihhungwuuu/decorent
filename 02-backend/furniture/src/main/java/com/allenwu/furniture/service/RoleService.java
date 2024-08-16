package com.allenwu.furniture.service;

import com.allenwu.furniture.entity.ERole;
import com.allenwu.furniture.entity.Role;

import java.util.Optional;

public interface RoleService {
    Optional<Role> findByName(ERole name);
}
