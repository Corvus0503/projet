/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.service;

import java.util.List;

import com.springTest.demo.model.Order;
import com.springTest.demo.model.OrderDetail;
import com.springTest.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
/**
 *
 * @author ASUS
 */
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Order saveOrder(Order order) {
        // Associer chaque OrderDetail à l'Order avant de sauvegarder
        for (OrderDetail detail : order.getOrder_details()) {
            order.addOrderDetail(detail);
        }
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
