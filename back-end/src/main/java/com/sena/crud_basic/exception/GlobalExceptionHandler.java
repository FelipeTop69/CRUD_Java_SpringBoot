package com.sena.crud_basic.exception;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.sena.crud_basic.DTO_Response.responseDTO;

@ControllerAdvice
public class GlobalExceptionHandler {
    // Manejo de elementos no encontrados
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<responseDTO> handleNoSuchElementException(NoSuchElementException ex) {
        responseDTO response = new responseDTO(
            HttpStatus.NOT_FOUND,
            "Recurso no encontrado: " + ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Manejo de Argumentos Invalidos
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<responseDTO> handleIllegalArgumentException(IllegalArgumentException ex) {
        responseDTO response = new responseDTO(
            HttpStatus.BAD_REQUEST,
            "Error: " + ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Manejo de excepciones generales
    @ExceptionHandler(Exception.class)
    public ResponseEntity<responseDTO> handleGeneralException(Exception ex) {
        responseDTO response = new responseDTO(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Error interno del servidor: " + ex.getMessage()
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
