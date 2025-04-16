package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.EventDTO;
import com.sena.crud_basic.DTO_Response.EventResponseDTO;
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Location;
import com.sena.crud_basic.model.Organizer;
import com.sena.crud_basic.model.Category;


public class EventMapper {
    // EventDTO
    public static EventDTO toDTO(Event event) {
        return new EventDTO(
            event.getId(),
            event.getName(),
            event.getDescription(),
            event.getDate(),
            event.getOrganizer().getId(),
            event.getLocation().getId(),
            event.getCategory().getId()
        );
    }

    public static Event toEntity(EventDTO dto) {
        Organizer organizer = new Organizer();
        organizer.setId(dto.getOrganizerId());

        Location location = new Location();
        location.setId(dto.getLocationId());

        Category category = new Category();
        category.setId(dto.getCategoryId());

        return new Event(
            dto.getId(),
            dto.getName(),
            dto.getDescription(),
            dto.getDate(),
            organizer,
            location,
            category
        );
    }

    public static List<EventDTO> toDTOList(List<Event> events) {
        return events.stream().map(EventMapper::toDTO).collect(Collectors.toList());
    }

    // EventResponseDTO
    public static EventResponseDTO toResponseDTO(Event event) {
        return new EventResponseDTO(
            event.getId(),
            event.getName(),
            event.getDescription(),
            event.getDate(),

            event.getOrganizer().getId(),
            event.getOrganizer().getName(),

            event.getLocation().getId(),
            event.getLocation().getName(),
            
            event.getCategory().getId(),
            event.getCategory().getName()
        );
    }

    public static List<EventResponseDTO> toResponseDTOList(List<Event> events) {
        return events.stream().map(EventMapper::toResponseDTO).collect(Collectors.toList());
    }
}
