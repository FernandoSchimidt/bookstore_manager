package com.fernandoschimidt.bookstoremanager.controllers;

import com.fernandoschimidt.bookstoremanager.entity.Author;
import com.fernandoschimidt.bookstoremanager.entity.User;
import com.fernandoschimidt.bookstoremanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user) {
        return userRepository.save(user);
    }
}
