package com.sena.crud_basic.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "participant_event")
public class Participant_Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pa_ev_id")
    private int id;

    // Claves Foraneas
    @ManyToOne
    @JoinColumn(name = "ev_id", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "pa_id", nullable = false)
    private Participant participant;

    // Constructores
    public Participant_Event() {
    }

    public Participant_Event(int id, Participant participant, Event event) {
        this.id = id;
        this.participant = participant;
        this.event = event;
    }

    // Getters and Setters
    // id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // event
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    // participant
    public Participant getParticipant() {
        return participant;
    }

    public void setParticipant(Participant participant) {
        this.participant = participant;
    }    
}