package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.OrganizerDTO;
import com.sena.crud_basic.model.Organizer;

public class OrganizerMapper {
    public static OrganizerDTO toDTO(Organizer organizer) {
        return new OrganizerDTO(organizer.getId(), organizer.getName(), organizer.getPhone());
    }

    public static Organizer toEntity(OrganizerDTO dto) {
        return new Organizer(dto.getId(),dto.getName(), dto.getPhone());
    }

    public static List<OrganizerDTO> toDTOList(List<Organizer> categories) {
        return categories.stream().map(OrganizerMapper::toDTO).collect(Collectors.toList());
    }
}
