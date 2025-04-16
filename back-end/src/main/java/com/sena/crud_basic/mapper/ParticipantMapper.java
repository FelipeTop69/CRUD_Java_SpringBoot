package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.ParticipantDTO;
import com.sena.crud_basic.model.Participant;


public class ParticipantMapper {
    public static ParticipantDTO toDTO(Participant participant) {
        return new ParticipantDTO(participant.getId(), participant.getName(), participant.getPhone());
    }

    public static Participant toEntity(ParticipantDTO dto) {
        return new Participant(dto.getId(),dto.getName(), dto.getPhone());
    }

    public static List<ParticipantDTO> toDTOList(List<Participant> participants) {
        return participants.stream().map(ParticipantMapper::toDTO).collect(Collectors.toList());
    }
}