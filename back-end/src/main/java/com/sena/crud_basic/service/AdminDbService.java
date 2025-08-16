package com.sena.crud_basic.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sena.crud_basic.DTO_Response.responseDTO;

@Service
public class AdminDbService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Transactional
    public responseDTO killAllConnections() {
        try {
            jdbcTemplate.execute("CALL sp_Kill_All()");
            return new responseDTO(
                HttpStatus.OK,
                "Todo Limpio",
                null
            );
        } catch (Exception e) {
            return new responseDTO(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Error al terminar conexiones: " + e.getMessage(),
                null
            );
        }
    }
}