/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author ASUS
 */
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private double totalAmount;
    private String deliveryAddress;
    private String longitude;
    private String latitude;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    //@JsonManagedReference
    private Set<OrderDetail> order_details = new HashSet<>();

    // Add this method to maintain bidirectional relationship
    public void addOrderDetail(OrderDetail orderDetail) {
        order_details.add(orderDetail);
        orderDetail.setOrder(this);
    }

    // Add this method to maintain bidirectional relationship
    public void removeOrderDetail(OrderDetail orderDetail) {
        order_details.remove(orderDetail);
        orderDetail.setOrder(null);
    }
    
    public Order () {}

    public Order(Long id, String status, double totalAmount, String deliveryAddress, String longitude, String latitude, User user) {
        this.id = id;
        this.status = status;
        this.totalAmount = totalAmount;
        this.deliveryAddress = deliveryAddress;
        this.longitude = longitude;
        this.latitude = latitude;
        this.user = user;
    }

    
    public Long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public User getUser() {
        return user;
    }

    public String getLongitude() {
        return longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public Set<OrderDetail> getOrder_details() {
        return order_details;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setOrder_details(Set<OrderDetail> order_details) {
        this.order_details = order_details;
    }
    
    
}
