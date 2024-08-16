package com.allenwu.furniture.dao;

import com.allenwu.furniture.entity.ERole;
import com.allenwu.furniture.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(ERole name);
}
