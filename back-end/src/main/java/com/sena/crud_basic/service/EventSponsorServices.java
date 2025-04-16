package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.EventSponsorDTO;
import com.sena.crud_basic.DTO_Response.EventSponsorResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.IEventSponsor;
import com.sena.crud_basic.mapper.EventSponsorMapper;
import com.sena.crud_basic.model.Event_Sponsor;

@Service
public class EventSponsorServices {
    @Autowired
    private IEventSponsor eventSponsorData;

    public List<EventSponsorResponseDTO> findAllEventSponsors() {
        List<Event_Sponsor> eventSponsors = eventSponsorData.findAllEventSponsorsJoin();
        return EventSponsorMapper.toResponseDTOList(eventSponsors);
    }

    public EventSponsorResponseDTO findByIdEventSponsor(int id) {
        return eventSponsorData.findEventSponsorByIdJoin(id)
                .map(EventSponsorMapper::toResponseDTO)
                .orElseThrow(() -> new NoSuchElementException("EventSponsor con ID " + id + " no encontrado"));
    }

    public responseDTO save(EventSponsorDTO eventSponsorDTO) {
        Event_Sponsor eventSponsor = EventSponsorMapper.toEntity(eventSponsorDTO);
        Event_Sponsor savedEventSponsor = eventSponsorData.save(eventSponsor);
        EventSponsorDTO savedEventSponsorDTO = EventSponsorMapper.toDTO(savedEventSponsor);
        return new responseDTO(
            HttpStatus.CREATED, 
            "EventSponsor creado con exito",
            savedEventSponsorDTO
        );
    }

    public responseDTO update(EventSponsorDTO eventSponsorDTO) {
        Event_Sponsor eventSponsor = eventSponsorData.findById(eventSponsorDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + eventSponsorDTO.getId() + " no encontrada"));

        Event_Sponsor updateEventSponsor = EventSponsorMapper.toEntity(eventSponsorDTO);
        eventSponsor.setEvent(updateEventSponsor.getEvent());
        eventSponsor.setSponsor(updateEventSponsor.getSponsor());

        Event_Sponsor updatedEventSponsor = eventSponsorData.save(eventSponsor);
        EventSponsorDTO updatedEventSponsorDTO = EventSponsorMapper.toDTO(updatedEventSponsor);

        return new responseDTO(HttpStatus.OK, "EventSponsor actualizado con exito", updatedEventSponsorDTO);
    }

    public responseDTO delete(int id) {
        Event_Sponsor eventSponsor = eventSponsorData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("EventSponsor con ID " + id + " no encontrado"));

        eventSponsorData.delete(eventSponsor);
        return new responseDTO(HttpStatus.OK, "EventSponsor con id " + id + " eliminado con exito");
    }
}