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

@Entity(name = "sponsor")
public class Sponsor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sp_id")
    private int id;

    @Column(name = "sp_name", length = 30, nullable = false)
    private String name;

    @Column(name = "sp_phone", length = 10, nullable = false)
    private String phone;

    // PNI
    @OneToMany(mappedBy = "sponsor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event_Sponsor> eventSponsors = new ArrayList<>();

    // Constructores
    public Sponsor() {
    }

    public Sponsor(int id, String name, String phone, List<Event_Sponsor> eventSponsors) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.eventSponsors = eventSponsors;
    }

    // Getters and Setters
    // id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // event_sponsor
    public List<Event_Sponsor> getEventSponsors() {
        return eventSponsors;
    }

    public void setEventSponsors(List<Event_Sponsor> eventSponsors) {
        this.eventSponsors = eventSponsors;
    }
}