package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.EventDTO;
import com.sena.crud_basic.DTO_Response.EventResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.IEvent;
import com.sena.crud_basic.mapper.EventMapper;
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class EventServices {
    @Autowired
    private IEvent eventData;

    public List<EventResponseDTO> findAllEvents() {
        List<Event> events = eventData.findAllEventsJoin();
        return EventMapper.toResponseDTOList(events);
    }

    public EventResponseDTO findByIdEvent(int id) {
        return eventData.findEventByIdJoin(id)
                .map(EventMapper::toResponseDTO)
                .orElseThrow(() -> new NoSuchElementException("Event con ID " + id + " no encontrado"));
    }

    public responseDTO save(EventDTO eventDTO) {
        String normalizeName  = StringNormalizer.normalize(eventDTO.getName());

        List<Event> allEvents = eventData.findAll();

        boolean exists = allEvents.stream()
            .map(t -> StringNormalizer.normalize(t.getName()))
            .anyMatch(name -> name.equals(normalizeName));

        if (exists) {
            throw new IllegalArgumentException("Ya existe una Event con el nombre " + eventDTO.getName());
        }

        Event event = EventMapper.toEntity(eventDTO);
        Event savedEvent = eventData.save(event);
        EventDTO savedEventDTO = EventMapper.toDTO(savedEvent);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Event creado con exito",
            savedEventDTO
        );
    }

    public responseDTO update(EventDTO eventDTO) {
        Event event = eventData.findById(eventDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Evento con ID " + eventDTO.getId() + " no encontrado"));

        event.setName(eventDTO.getName());
        event.setDescription(eventDTO.getDescription());
        event.setDate(eventDTO.getDate());

        Event updatedData = EventMapper.toEntity(eventDTO);
        event.setOrganizer(updatedData.getOrganizer());
        event.setLocation(updatedData.getLocation());
        event.setCategory(updatedData.getCategory());

        Event updatedEvent = eventData.save(event);
        return new responseDTO(HttpStatus.OK, "Evento actualizado", EventMapper.toDTO(updatedEvent));
    }

    public responseDTO delete(int id) {
        Event event = eventData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Event con ID " + id + " no encontrado"));

        eventData.delete(event);
        return new responseDTO(HttpStatus.OK, "Event con id " + id + " eliminado con éxito");
    }
}