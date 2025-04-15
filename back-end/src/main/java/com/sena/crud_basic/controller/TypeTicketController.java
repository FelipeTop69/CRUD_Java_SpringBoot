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

import com.sena.crud_basic.DTO.TypeTicketDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.TypeTicketServices;

@RestController
@RequestMapping("api/v1/typeticket")
public class TypeTicketController {
    @Autowired 
    private TypeTicketServices typeTicketServices;

    @GetMapping("/GetAll")
    public ResponseEntity<List<TypeTicketDTO>> findAllTypeTicket() {
        List<TypeTicketDTO> listTypeTickets = typeTicketServices.findAllTypeTicket();
        return ResponseEntity.ok(listTypeTickets);    
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<TypeTicketDTO> findTypeTicketById(@PathVariable int id) {
        TypeTicketDTO typeTicket = typeTicketServices.findByIdTypeTicket(id);
        return ResponseEntity.ok(typeTicket);
    }
    
    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody TypeTicketDTO typeTicketDTO) {
        responseDTO response = typeTicketServices.save(typeTicketDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody TypeTicketDTO typeTicketDTO) {
        responseDTO response = typeTicketServices.update(typeTicketDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = typeTicketServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}
