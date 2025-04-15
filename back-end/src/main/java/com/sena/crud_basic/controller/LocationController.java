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

import com.sena.crud_basic.DTO.LocationDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.LocationServices;

@RestController
@RequestMapping("api/v1/location")
public class LocationController {
    @Autowired
    private LocationServices locationServices;

        @GetMapping("/GetAll")
    public ResponseEntity<List<LocationDTO>> findAllLocation() {
        List<LocationDTO> listLocations = locationServices.findAllLocation();
        return ResponseEntity.ok(listLocations);    
    }

    @GetMapping("/GetById/{id}")
    public ResponseEntity<LocationDTO> findLocationById(@PathVariable int id) {
        LocationDTO location = locationServices.findByIdLocation(id);
        return ResponseEntity.ok(location);
    }
    
    @PostMapping("/Create")
    public ResponseEntity<responseDTO> save(@RequestBody LocationDTO locationDTO) {
        responseDTO response = locationServices.save(locationDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
    
    @PutMapping("/Update")
    public ResponseEntity<responseDTO> update(@RequestBody LocationDTO locationDTO) {
        responseDTO response = locationServices.update(locationDTO);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<responseDTO> delete(@PathVariable int id) {
        responseDTO response = locationServices.delete(id);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}