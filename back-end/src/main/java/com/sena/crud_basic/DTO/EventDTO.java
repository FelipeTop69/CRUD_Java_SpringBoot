package com.sena.crud_basic.DTO;

import java.time.LocalDateTime;

public class EventDTO {
    private int id;
    private String name;
    private String description;
    private LocalDateTime date;
    private int organizerId;
    private int locationId;
    private int categoryId;

    public EventDTO() {}

    public EventDTO(int id, String name, String description, LocalDateTime date, int organizerId, int locationId,
            int categoryId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.organizerId = organizerId;
        this.locationId = locationId;
        this.categoryId = categoryId;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
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

    public int getOrganizerId() {
        return organizerId;
    }
    public void setOrganizerId(int organizerId) {
        this.organizerId = organizerId;
    }

    public int getLocationId() {
        return locationId;
    }
    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}