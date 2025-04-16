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

import com.sena.crud_basic.DTO.ParticipantDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.ParticipantServices;

@RestController
@RequestMapping("api/v1/participant")
public class ParticipantController {
    @Autowired
    private ParticipantServices participantServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<ParticipantDTO>> findAllParticipant() {
        List<ParticipantDTO> listParticipants = participantServices.findAllParticipant();
        return ResponseEntity.ok(listParticipants);    
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<ParticipantDTO> findParticipantById(@PathVariable int id) {
        ParticipantDTO participant = participantServices.findByIdParticipant(id);
        return ResponseEntity.ok(participant);
    }
    
    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody ParticipantDTO participantDTO) {
        responseDTO response = participantServices.save(participantDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody ParticipantDTO participantDTO) {
        responseDTO response = participantServices.update(participantDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = participantServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}