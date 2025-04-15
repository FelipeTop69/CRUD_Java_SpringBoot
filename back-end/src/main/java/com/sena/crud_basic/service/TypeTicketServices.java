package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.TypeTicketDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.ITypeTicket;
import com.sena.crud_basic.mapper.TypeTicketMapper;
import com.sena.crud_basic.model.TypeTicket;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class TypeTicketServices {
    @Autowired
    private ITypeTicket typeTicketData;

    public List<TypeTicketDTO> findAllTypeTicket() {
        List<TypeTicket> tyoTypeTickets = typeTicketData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return TypeTicketMapper.toDTOList(tyoTypeTickets);
    }

    public TypeTicketDTO findByIdTypeTicket(int id) {
        return typeTicketData.findById(id)
                .map(TypeTicketMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("TypeTicket con ID " + id + " no encontrado"));
    }

    public responseDTO save(TypeTicketDTO typeTicketDTO) {
        String normalizeName  = StringNormalizer.normalize(typeTicketDTO.getName());

        List<TypeTicket> allTypeTickets = typeTicketData.findAll();

        boolean exists = allTypeTickets.stream()
            .map(t -> StringNormalizer.normalize(t.getName()))
            .anyMatch(name -> name.equals(normalizeName));

        if (exists) {
            throw new IllegalArgumentException("Ya existe un TypeTicket con el nombre " + typeTicketDTO.getName());
        }

        TypeTicket typeTicket = TypeTicketMapper.toEntity(typeTicketDTO);
        TypeTicket savedTypeTicket = typeTicketData.save(typeTicket);
        TypeTicketDTO savedTypeTicketDTO = TypeTicketMapper.toDTO(savedTypeTicket);
        return new responseDTO(
            HttpStatus.CREATED, 
            "TypeTicket creado con exito",
            savedTypeTicketDTO
        );
    }

    public responseDTO update(TypeTicketDTO typeTicketDTO) {
        TypeTicket typeTicket = typeTicketData.findById(typeTicketDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("TypeTicket con ID " + typeTicketDTO.getId() + " no encontrado"));

        typeTicket.setName(typeTicketDTO.getName());
        typeTicket.setDescription(typeTicketDTO.getDescription());

        TypeTicket updatedTypeTicket = typeTicketData.save(typeTicket);
        TypeTicketDTO updatedTypeTicketDTO = TypeTicketMapper.toDTO(updatedTypeTicket);

        return new responseDTO(HttpStatus.OK, "TypeTicket actualizado con exito", updatedTypeTicketDTO);
    }

    public responseDTO delete(int id) {
        TypeTicket typeTicket = typeTicketData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("TypeTicket con ID " + id + " no encontrado"));

        typeTicketData.delete(typeTicket);
        return new responseDTO(HttpStatus.OK, "TypeTicket con id " + id + " eliminado con exito");
    }
}