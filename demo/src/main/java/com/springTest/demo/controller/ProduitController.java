/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.springTest.demo.model.Product;
import com.springTest.demo.exception.ResourceNotFoundException;
import com.springTest.demo.repository.ProduitRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
/**
 *
 * @author ASUS
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ProduitController {
    
    private static final String UPLOAD_PATH = "C:/Users/ASUS/Desktop/L/java/projet/Front/src/uploads/";
    @Autowired
	private ProduitRepository ProduitRepository;
	
	// get all produits
	@GetMapping("/produits")
	public List<Product> getAllProduit(){
		return ProduitRepository.findAll();
	}		
	
	// createproduits rest api
	@PostMapping("/produits")
	public Product createProduit(@RequestParam("photo") MultipartFile photo,
                                 @RequestParam("nom") String nom,
                                 @RequestParam("description") String description,
                                 @RequestParam("prix") int prix) throws IOException {
            Product produit = new Product(nom, description, prix);

            // Save photo
            if (photo != null && !photo.isEmpty()) {
                byte[] bytes = photo.getBytes();
                Path path = Paths.get(UPLOAD_PATH + photo.getOriginalFilename());
                Files.write(path, bytes);
                produit.setPhoto(photo.getOriginalFilename());
                System.out.println(path);
            }

            return ProduitRepository.save(produit);
        }
	
	// getproduits by id rest api
	@GetMapping("/produits/{id}")
	public ResponseEntity<Product> getProduitById(@PathVariable Long id) {
		Product employee = ProduitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		return ResponseEntity.ok(employee);
	}
	
	// updateproduits rest api
	
	@PutMapping("/produits/{id}")
	public ResponseEntity<Product> updateProduit(@PathVariable Long id, @RequestBody Product userDetails){
		Product produit = ProduitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		
		produit.setNom(userDetails.getNom());
		produit.setDescription(userDetails.getDescription());
		produit.setPrix(userDetails.getPrix());
		
		Product updatedEmployee = ProduitRepository.save(produit);
		return ResponseEntity.ok(updatedEmployee);
	}
	
	// deleteproduits rest api
	@DeleteMapping("/produits/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteProduit(@PathVariable Long id){
		Product produit = ProduitRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Produit not exist with id :" + id));
		
		ProduitRepository.delete(produit);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
