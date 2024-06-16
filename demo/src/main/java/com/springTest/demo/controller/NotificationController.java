/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.springTest.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
/**
 *
 * @author ASUS
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NotificationController {

    @Autowired
    private SimpMessagingTemplate template;

    @MessageMapping("/sendOrderNotification")
    @SendTo("/topic/notifications")
    public String sendOrderNotification(String message) {
        return message;
    }

    public void notifyAdmin(String message) {
        template.convertAndSend("/topic/notifications", message);
    }
}
