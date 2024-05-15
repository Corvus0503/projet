/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.model;

/**
 *
 * @author ASUS
 */
public class JwtResponse {
    private String status;
    private String username;

    public JwtResponse(String status, String username) {
        this.status = status;
        this.username = username;
    }

    public String getStatus() {
        return status;
    }

    public String getUsername() {
        return username;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    
}
