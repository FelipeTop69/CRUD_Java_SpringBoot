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

import com.sena.crud_basic.DTO.OrganizerDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.OrganizerServices;

@RestController
@RequestMapping("api/v1/organizer")
public class OrganizerController {
    @Autowired
    private OrganizerServices organizerServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<OrganizerDTO>> findAllOrganizer() {
        List<OrganizerDTO> listOrganizers = organizerServices.findAllOrganizer();
        return ResponseEntity.ok(listOrganizers);    
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<OrganizerDTO> findOrganizerById(@PathVariable int id) {
        OrganizerDTO organizer = organizerServices.findByIdOrganizer(id);
        return ResponseEntity.ok(organizer);
    }
    
    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody OrganizerDTO organizerDTO) {
        responseDTO response = organizerServices.save(organizerDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody OrganizerDTO organizerDTO) {
        responseDTO response = organizerServices.update(organizerDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = organizerServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}