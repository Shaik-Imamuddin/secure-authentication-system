package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Map;

import com.example.demo.service.UserService;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService service;

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public UserController(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {

        User existingUser = repo.findByEmail(user.getEmail());

        if (existingUser != null) {
            return "User already exists";
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return "Registration Successful";
    }

    @PostMapping("/login")
    public Map<String,String> login(@RequestBody User user) {
        return service.login(user.getEmail(), user.getPassword());
    }

    @PostMapping("/forgot")
    public String forgot(@RequestParam String email) {
        return service.sendOtp(email);
    }

    @PostMapping("/reset")
    public String reset(@RequestParam String email,
                        @RequestParam String otp,
                        @RequestParam String newPassword) {
        return service.resetPassword(email, otp, newPassword);
    }
}