package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.ParticipantEventDTO;
import com.sena.crud_basic.DTO_Response.ParticipantEventResponseDTO;
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Participant;
import com.sena.crud_basic.model.Participant_Event;

public class ParticipantEventMapper {
    // ParticipantEventDTO
    public static ParticipantEventDTO toDTO(Participant_Event participantEvent) {
        return new ParticipantEventDTO(
            participantEvent.getId(),
            participantEvent.getParticipant().getId(),
            participantEvent.getEvent().getId()
        );
    }

    public static Participant_Event toEntity(ParticipantEventDTO dto) {
        Participant participant = new Participant();
        participant.setId(dto.getParticipantId());

        Event event = new Event();
        event.setId(dto.getEventId());

        return new Participant_Event(
            dto.getId(),
            participant,
            event
        );
    }

    public static List<ParticipantEventDTO> toDTOList(List<Participant_Event> participantEvents) {
        return participantEvents.stream().map(ParticipantEventMapper::toDTO).collect(Collectors.toList());
    }

    // ParticipantEventResponseDTO
    public static ParticipantEventResponseDTO toResponseDTO(Participant_Event participantEvent) {
        return new ParticipantEventResponseDTO(
            participantEvent.getId(),
            participantEvent.getParticipant().getId(),
            participantEvent.getParticipant().getName(),
            participantEvent.getEvent().getId(),
            participantEvent.getEvent().getName()
        );
    }

    public static List<ParticipantEventResponseDTO> toResponseDTOList(List<Participant_Event> participantEvents) {
        return participantEvents.stream().map(ParticipantEventMapper::toResponseDTO).collect(Collectors.toList());
    }
}
