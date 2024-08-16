package com.allenwu.furniture.service;

import com.allenwu.furniture.dao.UserRepository;
import com.allenwu.furniture.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void updateUserDetail(long id, String username, String email, String cellphone){
        User myUser = userRepository.findById(id);
        myUser.setUsername(username);
        myUser.setEmail(email);
        myUser.setCellphone(cellphone);
        userRepository.save(myUser);

    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User findById(long id) {
        return userRepository.findById(id);
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }
}
