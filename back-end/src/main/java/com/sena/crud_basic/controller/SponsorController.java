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

import com.sena.crud_basic.DTO.SponsorDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.SponsorServices;

@RestController
@RequestMapping("api/v1/sponsor")
public class SponsorController {
    @Autowired 
    private SponsorServices sponsorServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<SponsorDTO>> findAllSponsor() {
        List<SponsorDTO> listSponsors = sponsorServices.findAllSponsor();
        return ResponseEntity.ok(listSponsors);    
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<SponsorDTO> findSponsorById(@PathVariable int id) {
        SponsorDTO sponsor = sponsorServices.findByIdSponsor(id);
        return ResponseEntity.ok(sponsor);
    }
    
    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody SponsorDTO sponsorDTO) {
        responseDTO response = sponsorServices.save(sponsorDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody SponsorDTO sponsorDTO) {
        responseDTO response = sponsorServices.update(sponsorDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = sponsorServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}