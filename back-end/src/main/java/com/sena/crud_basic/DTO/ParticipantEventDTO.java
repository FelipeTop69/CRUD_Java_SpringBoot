package com.sena.crud_basic.DTO;

public class ParticipantEventDTO {
    private int id;
    private int participantId;
    private int eventId;

    public ParticipantEventDTO() {}

    public ParticipantEventDTO(int id, int participantId, int eventId) {
        this.id = id;
        this.participantId = participantId;
        this.eventId = eventId;
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

    public int getParticipantId() {
        return participantId;
    }
    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }
}