package com.sena.crud_basic.DTO_Response;

public class EventSponsorResponseDTO {
    private int id;
    private int eventId;
    private String eventName;
    private int sponsorId;
    private String sponsorName;

    public EventSponsorResponseDTO() {}

    public EventSponsorResponseDTO(int id, int eventId, String eventName, int sponsorId, String sponsorName) {
        this.id = id;
        this.eventId = eventId;
        this.eventName = eventName;
        this.sponsorId = sponsorId;
        this.sponsorName = sponsorName;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
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


    public int getSponsorId() {
        return sponsorId;
    }
    public void setSponsorId(int sponsorId) {
        this.sponsorId = sponsorId;
    }

    public String getSponsorName() {
        return sponsorName;
    }
    public void setSponsorName(String sponsorName) {
        this.sponsorName = sponsorName;
    }
}