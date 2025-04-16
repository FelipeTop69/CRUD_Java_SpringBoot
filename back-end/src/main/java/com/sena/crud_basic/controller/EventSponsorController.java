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

import com.sena.crud_basic.DTO.EventSponsorDTO;
import com.sena.crud_basic.DTO_Response.EventSponsorResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.EventSponsorServices;

@RestController
@RequestMapping("api/v1/eventsponsor")
public class EventSponsorController {
    @Autowired
    private EventSponsorServices eventSponsorServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<EventSponsorResponseDTO>> findAllEventSponsors() {
        List<EventSponsorResponseDTO> listEventSponsors = eventSponsorServices.findAllEventSponsors();
        return ResponseEntity.ok(listEventSponsors);
    }
    
    @GetMapping("/GetById/{id}")
    public ResponseEntity<EventSponsorResponseDTO> findEventSponsorById(@PathVariable int id) {
        EventSponsorResponseDTO eventSponsor = eventSponsorServices.findByIdEventSponsor(id);
        return ResponseEntity.ok(eventSponsor);
    }

    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody EventSponsorDTO eventSponsorDTO) {
        responseDTO response = eventSponsorServices.save(eventSponsorDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody EventSponsorDTO eventSponsorDTO) {
        responseDTO response = eventSponsorServices.update(eventSponsorDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = eventSponsorServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}