package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "user_event")
public class User_Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "us_ev_id")
    private int id;

    // Claves Foraneas
    @ManyToOne
    @JoinColumn(name = "ev_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "us_id", nullable = false)
    private User user;

    // Constructores
    public User_Event() {
    }

    public User_Event(int id, Event event, User user) {
        this.id = id;
        this.event = event;
        this.user = user;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }    
}
