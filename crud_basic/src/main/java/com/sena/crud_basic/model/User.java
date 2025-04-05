package com.sena.crud_basic.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "us_id")
    private int id;

    @Column(name = "us_name", length = 30, nullable = false)
    private String name;

    @Column(name = "us_phone", length = 10, nullable = false)
    private String phone;

    // PNI
    @OneToMany(mappedBy = "user")
    private List<User_Event> userEvents = new ArrayList<>();

    // Constructores
    public User() {
    }

    public User(int id, String name, String phone, List<User_Event> userEvents) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.userEvents = userEvents;
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<User_Event> getUserEvents() {
        return userEvents;
    }

    public void setUserEvents(List<User_Event> userEvents) {
        this.userEvents = userEvents;
    }

    
}
