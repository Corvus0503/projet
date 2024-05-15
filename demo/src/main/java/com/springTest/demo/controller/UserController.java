/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/File.java to edit this template
 */
package com.springTest.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.springTest.demo.model.User;
import com.springTest.demo.exception.ResourceNotFoundException;
import com.springTest.demo.repository.UserListRepository;
/**
 *
 * @author ASUS
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
	private UserListRepository UserRepository;
	
	// get all employees
	@GetMapping("/user")
	public List<User> getAllEmployees(){
		return UserRepository.findAll();
	}		
       
        
	
	// create employee rest api
	@PostMapping("/user")
	public User createEmployee(@RequestBody User user) {
		return UserRepository.save(user);
	}
	
	// get employee by id rest api
	@GetMapping("/user/{id}")
	public ResponseEntity<User> getEmployeeById(@PathVariable Long id) {
		User employee = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}
	
	// update employee rest api
	
	@PutMapping("/user/{id}")
	public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody User userDetails){
		User employee = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		employee.setNom(userDetails.getNom());
		employee.setPrenom(userDetails.getPrenom());
		employee.setAdresse(userDetails.getAdresse());
		employee.setEmail(userDetails.getEmail());
		employee.setPassword(userDetails.getPassword());
		employee.setTelephone(userDetails.getTelephone());
		employee.setType(userDetails.getType());
		
		User updatedEmployee = UserRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// delete employee rest api
	@DeleteMapping("/user/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		User employee = UserRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		UserRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
