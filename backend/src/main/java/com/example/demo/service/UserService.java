package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import com.example.demo.repository.UserRepository;
import com.example.demo.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

import java.util.Date;
import java.util.Random;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private JavaMailSender mailSender;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    private final SecretKey key = 
            Keys.hmacShaKeyFor(
                "mySuperSecretKeyForJwtAuthentication12345678"
                .getBytes()
            );

    public String register(User user) {

        if (repo.findByEmail(user.getEmail()) != null)
            return "Email already exists";

        if (repo.findByPhone(user.getPhone()) != null)
            return "Phone already exists";

        user.setPassword(encoder.encode(user.getPassword()));

        repo.save(user);

        return "Registration Successful";
    }

    public Map<String,String> login(String email, String password) {

        User user = repo.findByEmail(email);

        if (user == null || !encoder.matches(password, user.getPassword()))
            throw new RuntimeException("Invalid Credentials");

        String token = Jwts.builder()
                .setSubject(email)
                .claim("name", user.getName())
                .setIssuedAt(new Date())
                .setExpiration(
                    new Date(System.currentTimeMillis() + 1000 * 60 * 60)
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();

        Map<String,String> response = new HashMap<>();
        response.put("token", token);
        response.put("name", user.getName());

        return response;
    }

    public String sendOtp(String email) {

        User user = repo.findByEmail(email);

        if (user == null)
            return "Email not found";

        String otp = String.valueOf(
                new Random().nextInt(900000) + 100000
        );

        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));

        repo.save(user);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset OTP");
        message.setText("Your OTP is: " + otp);

        mailSender.send(message);

        return "OTP Sent Successfully";
    }

    public String resetPassword(String email, String otp, String newPassword) {

        User user = repo.findByEmail(email);

        if (user == null)
            return "User not found";

        if (!user.getOtp().equals(otp) ||
            user.getOtpExpiry().isBefore(LocalDateTime.now()))
            return "Invalid or Expired OTP";

        user.setPassword(encoder.encode(newPassword));
        user.setOtp(null);

        repo.save(user);

        return "Password Reset Successful";
    }
}