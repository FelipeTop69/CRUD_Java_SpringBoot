package com.sena.crud_basic.DTO_Response;

import java.time.LocalDateTime;

public class EventResponseDTO {
    private int id;
    private String name;
    private String description;
    private LocalDateTime date;

    private int organizerId;
    private String organizerName;

    private int locationId;
    private String locationName;

    private int categoryId;
    private String categoryName;

    public EventResponseDTO() {}

    public EventResponseDTO(int id, String name, String description, LocalDateTime date, int organizerId,
            String organizerName, int locationId, String locationName, int categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.organizerId = organizerId;
        this.organizerName = organizerName;
        this.locationId = locationId;
        this.locationName = locationName;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
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

    public String getOrganizerName() {
        return organizerName;
    }
    public void setOrganizerName(String organizerName) {
        this.organizerName = organizerName;
    }


    public int getLocationId() {
        return locationId;
    }
    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getLocationName() {
        return locationName;
    }
    public void setLocationName(String locationName) {
        this.locationName = locationName;
    }


    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
}
