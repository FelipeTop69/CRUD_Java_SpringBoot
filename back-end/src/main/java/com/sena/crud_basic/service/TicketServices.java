package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.TicketDTO;
import com.sena.crud_basic.DTO_Response.TicketResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.ITicket;
import com.sena.crud_basic.mapper.TicketMapper;
import com.sena.crud_basic.model.Ticket;

@Service
public class TicketServices {
    @Autowired
    private ITicket ticketData;

    public List<TicketResponseDTO> findAllTickets() {
        List<Ticket> tickets = ticketData.findAllTicketsJoin();
        return TicketMapper.toResponseDTOList(tickets);
    }

    public TicketResponseDTO findByIdTicket(int id) {
        return ticketData.findTicketByIdJoin(id)
                .map(TicketMapper::toResponseDTO)
                .orElseThrow(() -> new NoSuchElementException("Ticket con ID " + id + " no encontrado"));
    }

    public responseDTO save(TicketDTO ticketDTO) {
        Ticket ticket = TicketMapper.toEntity(ticketDTO);
        Ticket savedTicket = ticketData.save(ticket);
        TicketDTO savedTicketDTO = TicketMapper.toDTO(savedTicket);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Ticket creado con exito",
            savedTicketDTO
        );
    }

    public responseDTO update(TicketDTO ticketDTO) {
        Ticket ticket = ticketData.findById(ticketDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + ticketDTO.getId() + " no encontrada"));

        ticket.setPrice(ticketDTO.getPrice());
        ticket.setAvailableQuantity(ticketDTO.getAvailableQuantity());

        Ticket updateTicket = TicketMapper.toEntity(ticketDTO);
        ticket.setEvent(updateTicket.getEvent());
        ticket.setTypeTicket(updateTicket.getTypeTicket());

        Ticket updatedTicket = ticketData.save(ticket);
        TicketDTO updatedTicketDTO = TicketMapper.toDTO(updatedTicket);

        return new responseDTO(HttpStatus.OK, "Ticket actualizado con exito", updatedTicketDTO);
    }

    public responseDTO delete(int id) {
        Ticket ticket = ticketData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Ticket con ID " + id + " no encontrado"));

        ticketData.delete(ticket);
        return new responseDTO(HttpStatus.OK, "Ticket con id " + id + " eliminado con éxito");
    }
}