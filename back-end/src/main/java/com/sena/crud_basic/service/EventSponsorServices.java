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
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Event_Sponsor;
import com.sena.crud_basic.model.Sponsor;

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
        // Validar si ya existe la relación
        if (eventSponsorData.existsByEventIdAndSponsorId(
                eventSponsorDTO.getEventId(),
                eventSponsorDTO.getSponsorId())) {
            throw new IllegalArgumentException(
                    "Ya existe este patrocinio");
        }

        // Resto de la lógica de guardado...
        Event_Sponsor eventSponsor = EventSponsorMapper.toEntity(eventSponsorDTO);
        Event_Sponsor savedEventSponsor = eventSponsorData.save(eventSponsor);
        EventSponsorDTO savedEventSponsorDTO = EventSponsorMapper.toDTO(savedEventSponsor);

        return new responseDTO(
                HttpStatus.CREATED,
                "EventSponsor creado con éxito",
                savedEventSponsorDTO);
    }

    public responseDTO update(EventSponsorDTO eventSponsorDTO) {
        Event_Sponsor existing = eventSponsorData.findById(eventSponsorDTO.getId())
                .orElseThrow(() -> new NoSuchElementException(
                        "EventSponsor con ID " + eventSponsorDTO.getId() + " no encontrado"));

        // Validar duplicados al actualizar
        if ((existing.getEvent().getId() != eventSponsorDTO.getEventId() ||
                existing.getSponsor().getId() != eventSponsorDTO.getSponsorId()) &&
                eventSponsorData.existsByEventIdAndSponsorId(
                        eventSponsorDTO.getEventId(),
                        eventSponsorDTO.getSponsorId())) {
            throw new IllegalArgumentException(
                    "Ya existe este patrocinio");
        }

        // Resto de la lógica de actualización...
        existing.setEvent(new Event(eventSponsorDTO.getEventId(), null, null, null, null, null, null));
        existing.setSponsor(new Sponsor(eventSponsorDTO.getSponsorId(), null, null));

        Event_Sponsor updatedEventSponsor = eventSponsorData.save(existing);
        return new responseDTO(
                HttpStatus.OK,
                "EventSponsor actualizado con éxito",
                EventSponsorMapper.toDTO(updatedEventSponsor));
    }

    public responseDTO delete(int id) {
        Event_Sponsor eventSponsor = eventSponsorData.findById(id)
                .orElseThrow(() -> new NoSuchElementException("EventSponsor con ID " + id + " no encontrado"));

        eventSponsorData.delete(eventSponsor);
        return new responseDTO(HttpStatus.OK, "EventSponsor con id " + id + " eliminado con exito");
    }
}