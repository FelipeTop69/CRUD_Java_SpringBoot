package com.sena.crud_basic.model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "event_sponsor")
public class Event_Sponsor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ev_es_id")
    private int id;

    // Claves Foraneas
    @ManyToOne
    @JoinColumn(name = "ev_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "sp_id", nullable = false)
    private Sponsor sponsor;

    // Constructores
    public Event_Sponsor() {
    }

    public Event_Sponsor(int id, Event event, Sponsor sponsor) {
        this.id = id;
        this.event = event;
        this.sponsor = sponsor;
    }

    // Getters adn Setters
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

    public Sponsor getSponsor() {
        return sponsor;
    }

    public void setSponsor(Sponsor sponsor) {
        this.sponsor = sponsor;
    }

    
}
