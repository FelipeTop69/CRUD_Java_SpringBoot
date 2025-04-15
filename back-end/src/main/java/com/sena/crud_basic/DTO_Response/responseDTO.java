package com.sena.crud_basic.DTO_Response;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL) // Oculta los campos con valor null en el JSON
public class responseDTO {
    private HttpStatus status;
    private String message;
    private Object data;
    
    public responseDTO(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
    public responseDTO(HttpStatus status, String message, Object data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}