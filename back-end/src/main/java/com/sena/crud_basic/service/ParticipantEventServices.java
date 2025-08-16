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
import com.sena.crud_basic.model.Event;
import com.sena.crud_basic.model.Participant;
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
                                .orElseThrow(() -> new NoSuchElementException(
                                                "ParticipantEvent con ID " + id + " no encontrado"));
        }

        public responseDTO save(ParticipantEventDTO participantEventDTO) {
                // Validar si ya existe la relación
                if (participantEventData.existsByParticipantIdAndEventId(
                                participantEventDTO.getParticipantId(),
                                participantEventDTO.getEventId())) {
                        throw new IllegalArgumentException(
                                        "Ya existe esta participación");
                }

                Participant_Event participantEvent = ParticipantEventMapper.toEntity(participantEventDTO);
                Participant_Event savedParticipantEvent = participantEventData.save(participantEvent);
                ParticipantEventDTO savedParticipantEventDTO = ParticipantEventMapper.toDTO(savedParticipantEvent);

                return new responseDTO(
                                HttpStatus.CREATED,
                                "ParticipantEvent creado con exito",
                                savedParticipantEventDTO);
        }

        public responseDTO update(ParticipantEventDTO participantEventDTO) {
                Participant_Event existing = participantEventData.findById(participantEventDTO.getId())
                                .orElseThrow(() -> new NoSuchElementException(
                                                "Categoria con ID " + participantEventDTO.getId() + " no encontrada"));

                // Validar duplicados al actualizar
                if ((existing.getEvent().getId() != participantEventDTO.getEventId() ||
                                existing.getParticipant().getId() != participantEventDTO.getParticipantId()) &&
                                participantEventData.existsByParticipantIdAndEventId(
                                                participantEventDTO.getEventId(),
                                                participantEventDTO.getParticipantId())) {
                        throw new IllegalArgumentException(
                                        "Ya existe una relación entre este evento y sponsor");
                }

                existing.setParticipant(new Participant(participantEventDTO.getParticipantId(), null, null));
                existing.setEvent(new Event(participantEventDTO.getEventId(), null, null, null, null, null, null));

                Participant_Event updatedParticipantEvent = participantEventData.save(existing);
                return new responseDTO(
                                HttpStatus.OK,
                                "ParticipantEvent actualizado con éxito",
                                ParticipantEventMapper.toDTO(updatedParticipantEvent));
        }

        public responseDTO delete(int id) {
                Participant_Event participantEvent = participantEventData.findById(id)
                                .orElseThrow(() -> new NoSuchElementException(
                                                "ParticipantEvent con ID " + id + " no encontrado"));

                participantEventData.delete(participantEvent);
                return new responseDTO(HttpStatus.OK, "ParticipantEvent con id " + id + " eliminado con exito");
        }
}
