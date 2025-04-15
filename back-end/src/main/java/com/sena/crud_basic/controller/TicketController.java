package com.sena.crud_basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO.TicketDTO;
import com.sena.crud_basic.DTO_Response.TicketResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.TicketServices;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/v1/ticket")
public class TicketController {

    @Autowired
    private TicketServices ticketServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<TicketResponseDTO>> findAllTickets() {
        List<TicketResponseDTO> listTickets = ticketServices.findAllTickets();
        return ResponseEntity.ok(listTickets);
    }
    
    @GetMapping("/GetById/{id}")
    public ResponseEntity<TicketResponseDTO> findTicketById(@PathVariable int id) {
        TicketResponseDTO ticket = ticketServices.findByIdTicket(id);
        return ResponseEntity.ok(ticket);
    }

    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody TicketDTO ticketDTO) {
        responseDTO response = ticketServices.save(ticketDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody TicketDTO ticketDTO) {
        responseDTO response = ticketServices.update(ticketDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = ticketServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}