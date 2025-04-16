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

import com.sena.crud_basic.DTO.ParticipantEventDTO;
import com.sena.crud_basic.DTO_Response.ParticipantEventResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.ParticipantEventServices;

@RestController
@RequestMapping("api/v1/participantevent")
public class ParticipantEventController {
    @Autowired
    private ParticipantEventServices participantEventServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<ParticipantEventResponseDTO>> findAllParticipantEvents() {
        List<ParticipantEventResponseDTO> listParticipantEvents = participantEventServices.findAllParticipantEvents();
        return ResponseEntity.ok(listParticipantEvents);
    }
    
    @GetMapping("/GetById/{id}")
    public ResponseEntity<ParticipantEventResponseDTO> findParticipantEventById(@PathVariable int id) {
        ParticipantEventResponseDTO participantEvent = participantEventServices.findByIdParticipantEvent(id);
        return ResponseEntity.ok(participantEvent);
    }

    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody ParticipantEventDTO participantEventDTO) {
        responseDTO response = participantEventServices.save(participantEventDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody ParticipantEventDTO participantEventDTO) {
        responseDTO response = participantEventServices.update(participantEventDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = participantEventServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
