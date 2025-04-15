package com.sena.crud_basic.DTO;

import java.math.BigDecimal;

public class TicketDTO {
    private int id;
    private BigDecimal price;
    private int availableQuantity;
    private int eventId;
    private int typeTicketId;

    public TicketDTO() {}

    public TicketDTO(int id, BigDecimal price, int availableQuantity, int eventId, int typeTicketId) {
        this.id = id;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.eventId = eventId;
        this.typeTicketId = typeTicketId;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getPrice() {
        return price;
    }
    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }
    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public int getEventId() {
        return eventId;
    }
    public void setEventId(int eventId) {
        this.eventId = eventId;
    }

    public int getTypeTicketId() {
        return typeTicketId;
    }
    public void setTypeTicketId(int typeTicketId) {
        this.typeTicketId = typeTicketId;
    }
}