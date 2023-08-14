package com.example.userregistration.controller;

import com.example.userregistration.model.User;
import com.example.userregistration.service.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @PutMapping("/update")
    public void updateUser(@RequestBody User user){

        userService.update(user);
    }

//    @GetMapping("all")
//    public List<User> users(){
//        return userService.findAll();
//    }

    @PostMapping("/profile")
    public ResponseEntity<User> user(@RequestBody User user) {
        Optional<User> user2 = userService.findByUsername(user.getUsername());
        if(user2.isPresent()) {
            return new ResponseEntity<User>(user2.get(), HttpStatus.OK);
        }
        return new ResponseEntity<User>(user2.get(), HttpStatus.NOT_FOUND);
    }



    @PostMapping("/login")
    public ResponseEntity<User> login (@RequestBody User user) {
        Optional<User> user2 = userService.findByUsername(user.getUsername());
        if (user2.get().getUsername().equals(user.getUsername()) && user2.get().getPassword().equals(user.getPassword())) {
            return new ResponseEntity<User>(user, HttpStatus.OK);
        }
        return new ResponseEntity<User>(user, HttpStatus.NOT_FOUND);
    }

    @PostMapping("/save")
    public ResponseEntity<User> saveOrUpdate(@RequestBody User user) {
        User savedUser = userService.save(user);
        return new ResponseEntity<User>(savedUser, HttpStatus.CREATED);

    }
}