package com.example.userregistration.service;

import com.example.userregistration.model.User;
import com.example.userregistration.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public String update(User user) {
        Optional<User> user1optional = userRepository.findByUsername(user.getUsername());
        if (user1optional.isPresent()) {

            User existingUser = user1optional.get();
            existingUser.setUsername(user.getUsername());
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setStreetAddress(user.getStreetAddress());
            existingUser.setCity(user.getCity());
            existingUser.setZipCode(user.getZipCode());
            existingUser.setState(user.getState());
            userRepository.save(existingUser);
            return "success";
        } else
            return "user not found";
    }

}