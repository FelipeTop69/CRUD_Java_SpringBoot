package com.sena.crud_basic.DTO;

public class EventSponsorDTO {
    private int id;
    private int eventId;
    private int sponsorId;

    public EventSponsorDTO() {}

    public EventSponsorDTO(int id, int eventId, int sponsorId) {
        this.id = id;
        this.eventId = eventId;
        this.sponsorId = sponsorId;
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

    public int getSponsorId() {
        return sponsorId;
    }
    public void setSponsorId(int sponsorId) {
        this.sponsorId = sponsorId;
    }
}