/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.model;

import jakarta.persistence.*;
/**
 *
 * @author ASUS
 */
@Entity
@Table(name = "notification")
public class OrderNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String deliveryAddress;

    public OrderNotification() {
    }

    public OrderNotification(Long id, String deliveryAddress) {
        this.id = id;
        this.deliveryAddress = deliveryAddress;
    }

    public Long getId() {
        return id;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
    
    
}
