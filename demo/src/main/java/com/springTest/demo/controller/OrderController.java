/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.springTest.demo.model.Order;
import com.springTest.demo.model.OrderDetail;
import com.springTest.demo.exception.ResourceNotFoundException;
import com.springTest.demo.repository.OrderRepository;
import com.springTest.demo.controller.NotificationController;

/**
 *
 * @author ASUS
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
        @Autowired
	private OrderRepository OrderRepository;
        
        @Autowired
        private NotificationController notificationController;
	
	// get all employees
	@GetMapping
	public List<Order> getAllOrder(){
		return OrderRepository.findAll();
	}		
       
	// create employee rest api
	@PostMapping
        @Transactional
	public Order createOrder(@RequestBody Order order) {
            for (OrderDetail detail : order.getOrder_details()) {
                order.addOrderDetail(detail);
            }
             notificationController.notifyAdmin("New order placed with ID: " + order.getId());
		return OrderRepository.save(order);
	}
	
	// get employee by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
		Order order = OrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(order);
	}
	
	// update employee rest api
	
	@PutMapping("/{id}")
	public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order userDetails){
		Order order = OrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		order.setStatus(order.getStatus());
		order.setTotalAmount(order.getTotalAmount());
		order.setDeliveryAddress(order.getDeliveryAddress());
		order.setUser(order.getUser());
		order.setOrder_details(order.getOrder_details());
		
		Order updatedOrder = OrderRepository.save(order);
		return ResponseEntity.ok(updatedOrder);
	}
        
        @PutMapping("/{id}/status")
        public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody Order statusUpdateDTO) {
                Order order = OrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
                order.setStatus(statusUpdateDTO.getStatus());
                Order updatedOrder = OrderRepository.save(order);
		return ResponseEntity.ok(updatedOrder);
        }
	
	// delete employee rest api
	@DeleteMapping
	public ResponseEntity<Map<String, Boolean>> deleteOrder(@PathVariable Long id){
		Order order = OrderRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		OrderRepository.delete(order);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
