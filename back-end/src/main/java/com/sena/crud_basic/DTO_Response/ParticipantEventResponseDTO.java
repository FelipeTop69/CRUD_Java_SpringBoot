package com.sena.crud_basic.DTO_Response;

public class ParticipantEventResponseDTO {
    private int id;
    private int participantId;
    private String participantName;
    private int eventId;
    private String eventName;

    public ParticipantEventResponseDTO() {}

    public ParticipantEventResponseDTO(int id, int participantId, String participantName, int eventId, String eventName) {
        this.id = id;
        this.participantId = participantId;
        this.participantName = participantName;
        this.eventId = eventId;
        this.eventName = eventName;
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


    public int getParticipantId() {
        return participantId;
    }
    public void setParticipantId(int participantId) {
        this.participantId = participantId;
    }
    public String getParticipantName() {
        return participantName;
    }
    public void setParticipantName(String participantName) {
        this.participantName = participantName;
    }
}   