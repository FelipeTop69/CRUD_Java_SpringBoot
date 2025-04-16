package com.sena.crud_basic.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Participant_Event;

@Repository
public interface IParticipantEvent extends JpaRepository<Participant_Event, Integer> {
    @Query("SELECT pe FROM participant_event pe JOIN FETCH pe.participant JOIN FETCH pe.event ORDER BY pe.id")
    List<Participant_Event> findAllParticipantEventsJoin();

    @Query("SELECT pe FROM participant_event pe JOIN FETCH pe.participant JOIN FETCH pe.event WHERE pe.id = :id ORDER BY pe.id")
    Optional<Participant_Event> findParticipantEventByIdJoin(@Param("id") int id);
}
