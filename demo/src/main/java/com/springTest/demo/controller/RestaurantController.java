/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
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

import com.springTest.demo.model.Restaurant;
import com.springTest.demo.exception.ResourceNotFoundException;
import com.springTest.demo.repository.RestaurantRepository;
/**
 *
 * @author ASUS
 */
@RestController
@RequestMapping("/api/reaturant/")
public class RestaurantController {
    @Autowired
	private RestaurantRepository RestaurantRepository;
	
	// get all produits
	@GetMapping("/")
	public List<Restaurant> getAllProduit(){
		return RestaurantRepository.findAll();
	}		
	
	// createproduits rest api
	@PostMapping("/")
	public Restaurant createProduit(@RequestBody Restaurant user) {
		return RestaurantRepository.save(user);
	}
	
	// getproduits by id rest api
	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> getProduitById(@PathVariable Long id) {
		Restaurant erestaurant = RestaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		return ResponseEntity.ok(erestaurant);
	}
	
	// updateproduits rest api
	
	@PutMapping("/{id}")
	public ResponseEntity<Restaurant> updateProduit(@PathVariable Long id, @RequestBody Restaurant userDetails){
		Restaurant restaurant = RestaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		
		restaurant.setNom(userDetails.getNom());
		restaurant.setAdresse(userDetails.getAdresse());
		restaurant.setOuverture(userDetails.getOuverture());
		restaurant.setFermeture(userDetails.getFermeture());
		restaurant.setEmail(userDetails.getEmail());
		restaurant.setTelephone(userDetails.getTelephone());
		
		Restaurant updatedEmployee = RestaurantRepository.save(restaurant);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// deleteproduits rest api
	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduit(@PathVariable Long id){
		Restaurant restaurant = RestaurantRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		
		RestaurantRepository.delete(restaurant);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
