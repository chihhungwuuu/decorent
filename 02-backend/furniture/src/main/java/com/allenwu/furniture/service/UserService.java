package com.allenwu.furniture.service;

import com.allenwu.furniture.entity.User;

import java.util.Optional;

public interface UserService {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    User findById(long id);

    void save(User user);
}
