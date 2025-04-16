package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.SponsorDTO;
import com.sena.crud_basic.model.Sponsor;


public class SponsorMapper {
    public static SponsorDTO toDTO(Sponsor sponsor) {
        return new SponsorDTO(sponsor.getId(), sponsor.getName(), sponsor.getPhone());
    }

    public static Sponsor toEntity(SponsorDTO dto) {
        return new Sponsor(dto.getId(),dto.getName(), dto.getPhone());
    }

    public static List<SponsorDTO> toDTOList(List<Sponsor> sponsors) {
        return sponsors.stream().map(SponsorMapper::toDTO).collect(Collectors.toList());
    }
}
