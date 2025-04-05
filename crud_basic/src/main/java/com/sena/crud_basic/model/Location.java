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

@Entity(name = "location")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_id")
    private int loc_id;

    @Column(name = "loc_name", length = 30, nullable = false)
    private String name;

    @Column(name = "loc_address", length = 50, nullable = false)
    private String address;

    @Column(name = "loc_capacity", nullable = false)
    private int capacity;

    // PNI
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event> events = new ArrayList<>();

    // Constructores
    public Location() {
    }

    public Location(int loc_id, String name, String address, int capacity, List<Event> events) {
        this.loc_id = loc_id;
        this.name = name;
        this.address = address;
        this.capacity = capacity;
        this.events = events;
    }

    // Getters and Setters
    public int getLoc_id() {
        return loc_id;
    }

    public void setLoc_id(int loc_id) {
        this.loc_id = loc_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }    
}
