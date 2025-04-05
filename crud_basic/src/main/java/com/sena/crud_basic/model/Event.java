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
    private int ev_id;

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
    private List<User_Event> userEvents = new ArrayList<>();

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Event_Sponsor> eventSponsors = new ArrayList<>();

    // Constructores
    public Event() {
    }

    

    public Event(int ev_id, String name, String description, LocalDateTime date, Organizer organizer, Location location,
            Category category, List<Ticket> tickets, List<User_Event> userEvents, List<Event_Sponsor> eventSponsors) {
        this.ev_id = ev_id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.organizer = organizer;
        this.location = location;
        this.category = category;
        this.tickets = tickets;
        this.userEvents = userEvents;
        this.eventSponsors = eventSponsors;
    }



    //Getters and Setters
    public int getEv_id() {
        return ev_id;
    }

    public void setEv_id(int ev_id) {
        this.ev_id = ev_id;
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

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public Organizer getOrganizer() {
        return organizer;
    }

    public void setOrganizer(Organizer organizer) {
        this.organizer = organizer;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public List<User_Event> getUserEvents() {
        return userEvents;
    }

    public void setUserEvents(List<User_Event> userEvents) {
        this.userEvents = userEvents;
    }

    public List<Event_Sponsor> getEventSponsors() {
        return eventSponsors;
    }

    public void setEventSponsors(List<Event_Sponsor> eventSponsors) {
        this.eventSponsors = eventSponsors;
    }

    


}
