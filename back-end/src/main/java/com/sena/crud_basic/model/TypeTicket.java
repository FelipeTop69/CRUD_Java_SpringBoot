package com.sena.crud_basic.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "typeTicket")
public class TypeTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tyt_id")
    private int id;

    @Column(name = "tyt_name", length = 30, nullable = false)
    private String name;

    @Column(name = "tyt_description", columnDefinition = "TEXT", nullable = true)
    private String description;

    // PNI
    @OneToMany(mappedBy = "typeTicket", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

    // Constructores
    public TypeTicket() {
    }

    public TypeTicket(int id, String name, String description, List<Ticket> tickets) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tickets = tickets;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    
}
