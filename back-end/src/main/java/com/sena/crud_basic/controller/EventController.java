package com.sena.crud_basic.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO.EventDTO;
import com.sena.crud_basic.DTO_Response.EventResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.EventServices;

@RestController
@RequestMapping("api/v1/event")
public class EventController {
    @Autowired
    private EventServices eventServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<EventResponseDTO>> findAllEvents() {
        List<EventResponseDTO> listEvents = eventServices.findAllEvents();
        return ResponseEntity.ok(listEvents);
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<EventResponseDTO> findEventById(@PathVariable int id) {
        EventResponseDTO event = eventServices.findByIdEvent(id);
        return ResponseEntity.ok(event);
    }

    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody EventDTO eventDTO) {
        responseDTO response = eventServices.save(eventDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody EventDTO eventDTO) {
        responseDTO response = eventServices.update(eventDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = eventServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}