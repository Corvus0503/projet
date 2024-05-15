/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;


import com.springTest.demo.model.User;
import com.springTest.demo.model.JwtResponse;
import com.springTest.demo.repository.UserRepository;
import com.springTest.demo.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 *
 * @author ASUS
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository UserRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        User user = UserRepository.findByUsername(loginRequest.getUsername());
        if (user == null) {
            throw new ResourceNotFoundException("User not found");
        }
        
        if(!loginRequest.getPassword().equals(user.getPassword())){
            throw new ResourceNotFoundException("wrong password");
        }
        
        return ResponseEntity.ok(user);
    }
}
