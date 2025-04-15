package com.sena.crud_basic.DTO_Response;

import java.math.BigDecimal;

public class TicketResponseDTO {
    private int id;
    private BigDecimal price;
    private int availableQuantity;
    private int eventId;
    private String eventName;
    private int typeTicketId;
    private String typeTicketName;

    public TicketResponseDTO() {}

    public TicketResponseDTO(int id, BigDecimal price, int availableQuantity, int eventId, String eventName, int typeTicketId,
            String typeTicketName) {
        this.id = id;
        this.price = price;
        this.availableQuantity = availableQuantity;
        this.eventId = eventId;
        this.eventName = eventName;
        this.typeTicketId = typeTicketId;
        this.typeTicketName = typeTicketName;
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

    public String getEventName() {
        return eventName;
    }
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public int getTypeTicketId() {
        return typeTicketId;
    }
    public void setTypeTicketId(int typeTicketId) {
        this.typeTicketId = typeTicketId;
    }

    public String getTypeTicketName() {
        return typeTicketName;
    }
    public void setTypeTicketName(String typeTicketName) {
        this.typeTicketName = typeTicketName;
    }
}