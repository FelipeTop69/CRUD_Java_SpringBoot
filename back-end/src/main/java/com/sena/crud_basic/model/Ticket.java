package com.sena.crud_basic.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tick_id")
    private int id;

    @Column(name = "tick_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "tick_available_quantity", nullable = false)
    private int availableQuantity;

    // Claves Foraneas
    @ManyToOne
    @JoinColumn(name = "id_event", nullable = false)
    private Event event;

    @ManyToOne
    @JoinColumn(name = "tyt_id", nullable = false)
    private TypeTicket typeTicket;

    // Constructores
    public Ticket() {
    }

    public Ticket(int id, BigDecimal price, int availableQuantity, Event event, TypeTicket typeTicket) {
        this.id = id;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.event = event;
        this.typeTicket = typeTicket;
    }

    // Getters and Setters
    // id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // price
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    // availableQuantity
    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    // event
    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    // typeTicket
    public TypeTicket getTypeTicket() {
        return typeTicket;
    }

    public void setTypeTicket(TypeTicket typeTicket) {
        this.typeTicket = typeTicket;
    }
}