package com.sena.crud_basic.service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.ParticipantDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.IParticipant;
import com.sena.crud_basic.mapper.ParticipantMapper;
import com.sena.crud_basic.model.Participant;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class ParticipantServices {
    @Autowired
    private IParticipant participantData;

    public List<ParticipantDTO> findAllParticipant() {
        List<Participant> participants = participantData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return ParticipantMapper.toDTOList(participants);
    }

    public ParticipantDTO findByIdParticipant(int id) {
        return participantData.findById(id)
                .map(ParticipantMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Participant con ID " + id + " no encontrado"));
    }

    public responseDTO save(ParticipantDTO participantDTO) {
        List<String> normalizedInputs = Arrays.asList(
            StringNormalizer.normalize(participantDTO.getName()),
            StringNormalizer.normalize(participantDTO.getPhone())
            
        );
        
        boolean exists = participantData.findAll().stream()
            .anyMatch(participant -> {
                List<String> normalizedParticipantFields = Arrays.asList(
                    StringNormalizer.normalize(participant.getName()),
                    StringNormalizer.normalize(participant.getPhone())
                );

                return normalizedParticipantFields.stream()
                    .anyMatch(normalizedInputs::contains);
            });
        
        if (exists) {
            throw new IllegalArgumentException("Ya existe un participant con los datos proporcionados");
        }

        Participant participant = ParticipantMapper.toEntity(participantDTO);
        Participant savedParticipant = participantData.save(participant);
        ParticipantDTO savedParticipantDTO = ParticipantMapper.toDTO(savedParticipant);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Participant creado con exito",
            savedParticipantDTO
        );
    }

    public responseDTO update(ParticipantDTO participantDTO) {
        Participant participant = participantData.findById(participantDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Participant con ID " + participantDTO.getId() + " no encontrado"));

        participant.setName(participantDTO.getName());
        participant.setPhone(participantDTO.getPhone());

        Participant updatedParticipant = participantData.save(participant);
        ParticipantDTO updatedParticipantDTO = ParticipantMapper.toDTO(updatedParticipant);

        return new responseDTO(HttpStatus.OK, "Participant actualizado con exito", updatedParticipantDTO);
    }

    public responseDTO delete(int id) {
        Participant participant = participantData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Participant con ID " + id + " no encontrado"));

        participantData.delete(participant);
        return new responseDTO(HttpStatus.OK, "Participant con id " + id + " eliminado con exito");
    }
}
