package com.sena.crud_basic.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.service.AdminDbService;


@RestController
@RequestMapping("api/v1/admin")
public class AdminDbController {

    @Autowired
    private AdminDbService adminService;

    @PostMapping("/kill-connections")
    public ResponseEntity<responseDTO> killAllConnections() {
        responseDTO response = adminService.killAllConnections();
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}