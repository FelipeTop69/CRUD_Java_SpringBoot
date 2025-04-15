package com.sena.crud_basic.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ev_id")
    private int id;

    @Column(name = "ev_name", length = 30, nullable = false)
    private String name;

    @Column(name = "ev_description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "ev_date", nullable = false)
    private LocalDateTime date;

    // Claves Foraneas
    @ManyToOne
    @JoinColumn(name = "org_id", nullable = false)
    private Organizer organizer;

    @ManyToOne
    @JoinColumn(name = "loc_id", nullable = false)
    private Location location;

    @ManyToOne
    @JoinColumn(name = "cat_id", nullable = false)
    private Category category;

    // PNI
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Participant_Event> participantEvents = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event_Sponsor> eventSponsors = new ArrayList<>();

    // Constructores
    public Event() {}

    public Event(int id, String name, String description, LocalDateTime date, Organizer organizer, Location location,
            Category category, List<Ticket> tickets, List<Participant_Event> participantEvents, List<Event_Sponsor> eventSponsors) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.organizer = organizer;
        this.location = location;
        this.category = category;
        this.tickets = tickets;
        this.participantEvents = participantEvents;
        this.eventSponsors = eventSponsors;
    }

    //Getters and Setters
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

    // description
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // date
    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    // organizer
    public Organizer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Organizer organizer) {
        this.organizer = organizer;
    }

    // location
    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    // category
    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    // tickets
    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    // participantEvents
    public List<Participant_Event> getparticipantEvents() {
        return participantEvents;
    }

    public void setparticipantEvents(List<Participant_Event> participantEvents) {
        this.participantEvents = participantEvents;
    }

    // eventSponsors
    public List<Event_Sponsor> getEventSponsors() {
        return eventSponsors;
    }

    public void setEventSponsors(List<Event_Sponsor> eventSponsors) {
        this.eventSponsors = eventSponsors;
    }
}