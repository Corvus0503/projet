/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.controller;

import java.util.List;

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

import com.springTest.demo.model.OrderNotification;
import com.springTest.demo.exception.ResourceNotFoundException;
import com.springTest.demo.repository.OrderNotificationRepository;
import java.util.HashMap;
import java.util.Map;
/**
 *
 * @author ASUS
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orderNotification")
public class OrderNotificationController {
    @Autowired
    private OrderNotificationRepository OrderNotificationRepository;
    
	@GetMapping
	public List<OrderNotification> getAllEOrderNotificatiion(){
		return OrderNotificationRepository.findAll();
	}		
       
	@PostMapping
	public OrderNotification createOrderNotificatiion(@RequestBody OrderNotification orderNotification) {
		return OrderNotificationRepository.save(orderNotification);
	}
        
        @DeleteMapping
	public ResponseEntity<Map<String, Boolean>> deleteOrderNotificatiion(@PathVariable Long id){
		OrderNotification order = OrderNotificationRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		OrderNotificationRepository.delete(order);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
