/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;


/**
 *
 * @author ASUS
 */
@Entity
@Table(name = "produits")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "description" , nullable = false)
    private String description;
    
    @Column(name = "prix", nullable = false )
    private int prix;
    
    @Column(name = "photo")
    private String photo;
    

    public Product() {
    }

    public Product(String nom, String description, int prix) {
        this.nom = nom;
        this.description = description;
        this.prix = prix;
    }

    
    public Product(long id, String nom, String description, int prix, String photo) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.photo = photo;
    }

    public long getId() {
        return id;
    }

    public String getNom() {
        return nom;
    }

    public String getDescription() {
        return description;
    }

    public int getPrix() {
        return prix;
    }

    public String getPhoto() {
        return photo;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrix(int prix) {
        this.prix = prix;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
     
}
