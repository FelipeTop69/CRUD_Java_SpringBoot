package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.EventSponsorDTO;
import com.sena.crud_basic.DTO_Response.EventSponsorResponseDTO;
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Event_Sponsor;
import com.sena.crud_basic.model.Sponsor;

public class EventSponsorMapper {
    // EventSponsorDTO
    public static EventSponsorDTO toDTO(Event_Sponsor eventSponsor) {
        return new EventSponsorDTO(
            eventSponsor.getId(),
            eventSponsor.getEvent().getId(),
            eventSponsor.getSponsor().getId()
        );
    }

    public static Event_Sponsor toEntity(EventSponsorDTO dto) {
        Event event = new Event();
        event.setId(dto.getEventId());

        Sponsor sponsor = new Sponsor();
        sponsor.setId(dto.getSponsorId());

        return new Event_Sponsor(
            dto.getId(),
            event,
            sponsor
        );
    }

    public static List<EventSponsorDTO> toDTOList(List<Event_Sponsor> eventSponsors) {
        return eventSponsors.stream().map(EventSponsorMapper::toDTO).collect(Collectors.toList());
    }

    // EventSponsorResponseDTO
    public static EventSponsorResponseDTO toResponseDTO(Event_Sponsor eventSponsor) {
        return new EventSponsorResponseDTO(
            eventSponsor.getId(),
            eventSponsor.getEvent().getId(),
            eventSponsor.getEvent().getName(),
            eventSponsor.getSponsor().getId(),
            eventSponsor.getSponsor().getName()
        );
    }

    public static List<EventSponsorResponseDTO> toResponseDTOList(List<Event_Sponsor> eventSponsors) {
        return eventSponsors.stream().map(EventSponsorMapper::toResponseDTO).collect(Collectors.toList());
    }
}