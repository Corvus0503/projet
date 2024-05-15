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
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id_rest ;

    @Column(name = "nom", nullable = false)
    private String nom;
    
    @Column(name = "ouverture", nullable = false)
    private String ouverture;
    
    @Column(name = "fermeture", nullable = false)
    private String fermeture;
    
    @Column(name = "adresse", nullable = false)
    private String adresse;

    @Column(name = "email" , nullable = false)
    private String email;
    
    @Column(name = "telephone", nullable = false )
    private int telephone;

    public Restaurant(long id_rest, String nom, String email, int telephone) {
        this.id_rest = id_rest;
        this.nom = nom;
        this.email = email;
        this.telephone = telephone;
    }

    public long getId_rest() {
        return id_rest;
    }

    public String getNom() {
        return nom;
    }

    public String getOuverture() {
        return ouverture;
    }

    public String getFermeture() {
        return fermeture;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getEmail() {
        return email;
    }

    public int getTelephone() {
        return telephone;
    }

    public void setId_rest(long id_rest) {
        this.id_rest = id_rest;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setOuverture(String ouverture) {
        this.ouverture = ouverture;
    }

    public void setFermeture(String fermeture) {
        this.fermeture = fermeture;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelephone(int telephone) {
        this.telephone = telephone;
    }
}
