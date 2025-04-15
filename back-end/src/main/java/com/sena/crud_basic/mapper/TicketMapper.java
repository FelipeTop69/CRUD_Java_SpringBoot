package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.TicketDTO;
import com.sena.crud_basic.DTO_Response.TicketResponseDTO;
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Ticket;
import com.sena.crud_basic.model.TypeTicket;

public class TicketMapper {
    // TicketDTO
    public static TicketDTO toDTO(Ticket ticket) {
        return new TicketDTO(
            ticket.getId(),
            ticket.getPrice(),
            ticket.getAvailableQuantity(),
            ticket.getEvent().getId(),
            ticket.getTypeTicket().getId()
        );
    }

    public static Ticket toEntity(TicketDTO dto) {
        Event event = new Event();
        event.setId(dto.getEventId());

        TypeTicket typeTicket = new TypeTicket();
        typeTicket.setId(dto.getTypeTicketId());

        return new Ticket(
            dto.getId(),
            dto.getPrice(),
            dto.getAvailableQuantity(),
            event,
            typeTicket
        );
    }

    public static List<TicketDTO> toDTOList(List<Ticket> tickets) {
        return tickets.stream().map(TicketMapper::toDTO).collect(Collectors.toList());
    }

    // TicketResponseDTO
    public static TicketResponseDTO toResponseDTO(Ticket ticket) {
        return new TicketResponseDTO(
            ticket.getId(),
            ticket.getPrice(),
            ticket.getAvailableQuantity(),
            ticket.getEvent().getId(),
            ticket.getEvent().getName(), 
            ticket.getTypeTicket().getId(),
            ticket.getTypeTicket().getName()
        );
    }

    public static List<TicketResponseDTO> toResponseDTOList(List<Ticket> tickets) {
        return tickets.stream().map(TicketMapper::toResponseDTO).collect(Collectors.toList());
    }
}