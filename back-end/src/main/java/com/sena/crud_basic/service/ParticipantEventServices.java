package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.ParticipantEventDTO;
import com.sena.crud_basic.DTO_Response.ParticipantEventResponseDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.IParticipantEvent;
import com.sena.crud_basic.mapper.ParticipantEventMapper;
import com.sena.crud_basic.model.Participant_Event;

@Service
public class ParticipantEventServices {
    @Autowired
    private IParticipantEvent participantEventData;

    public List<ParticipantEventResponseDTO> findAllParticipantEvents() {
        List<Participant_Event> participantEvents = participantEventData.findAllParticipantEventsJoin();
        return ParticipantEventMapper.toResponseDTOList(participantEvents);
    }

    public ParticipantEventResponseDTO findByIdParticipantEvent(int id) {
        return participantEventData.findParticipantEventByIdJoin(id)
                .map(ParticipantEventMapper::toResponseDTO)
                .orElseThrow(() -> new NoSuchElementException("ParticipantEvent con ID " + id + " no encontrado"));
    }

    public responseDTO save(ParticipantEventDTO participantEventDTO) {
        Participant_Event participantEvent = ParticipantEventMapper.toEntity(participantEventDTO);
        Participant_Event savedParticipantEvent = participantEventData.save(participantEvent);
        ParticipantEventDTO savedParticipantEventDTO = ParticipantEventMapper.toDTO(savedParticipantEvent);
        return new responseDTO(
            HttpStatus.CREATED, 
            "ParticipantEvent creado con exito",
            savedParticipantEventDTO
        );
    }

    public responseDTO update(ParticipantEventDTO participantEventDTO) {
        Participant_Event participantEvent = participantEventData.findById(participantEventDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + participantEventDTO.getId() + " no encontrada"));

        Participant_Event updateParticipantEvent = ParticipantEventMapper.toEntity(participantEventDTO);
        participantEvent.setParticipant(updateParticipantEvent.getParticipant());
        participantEvent.setEvent(updateParticipantEvent.getEvent());

        Participant_Event updatedParticipantEvent = participantEventData.save(participantEvent);
        ParticipantEventDTO updatedParticipantEventDTO = ParticipantEventMapper.toDTO(updatedParticipantEvent);

        return new responseDTO(HttpStatus.OK, "ParticipantEvent actualizado con exito", updatedParticipantEventDTO);
    }

    public responseDTO delete(int id) {
        Participant_Event participantEvent = participantEventData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("ParticipantEvent con ID " + id + " no encontrado"));

        participantEventData.delete(participantEvent);
        return new responseDTO(HttpStatus.OK, "ParticipantEvent con id " + id + " eliminado con exito");
    }
}
