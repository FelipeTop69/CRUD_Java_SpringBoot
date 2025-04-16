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
import jakarta.persistence.Table;

@Entity
@Table(name = "participant")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pa_id")
    private int id;

    @Column(name = "pa_name", length = 30, nullable = false)
    private String name;

    @Column(name = "pa_phone", length = 10, nullable = false)
    private String phone;

    // PNI
    @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant_Event> participantEvents = new ArrayList<>();

    // Constructores
    public Participant() {
    }

    public Participant(int id, String name, String phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
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

    // participantEvents
    public List<Participant_Event> getParticipantEvents() {
        return participantEvents;
    }

    public void setParticipantEvents(List<Participant_Event> participantEvents) {
        this.participantEvents = participantEvents;
    }
}