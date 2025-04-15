package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.TypeTicketDTO;
import com.sena.crud_basic.model.TypeTicket;

public class TypeTicketMapper {
    public static TypeTicketDTO toDTO(TypeTicket typeTicket) {
        return new TypeTicketDTO(typeTicket.getId(), typeTicket.getName(), typeTicket.getDescription());
    }

    public static TypeTicket toEntity(TypeTicketDTO dto) {
        return new TypeTicket(dto.getId(),dto.getName(), dto.getDescription());
    }

    public static List<TypeTicketDTO> toDTOList(List<TypeTicket> typeTickets) {
        return typeTickets.stream().map(TypeTicketMapper::toDTO).collect(Collectors.toList());
    }
}
