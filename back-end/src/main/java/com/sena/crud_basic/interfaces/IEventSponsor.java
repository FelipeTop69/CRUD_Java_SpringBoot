package com.sena.crud_basic.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Event_Sponsor;

@Repository
public interface IEventSponsor extends JpaRepository<Event_Sponsor, Integer>{
    @Query("SELECT es FROM event_sponsor es JOIN FETCH es.event JOIN FETCH es.sponsor ORDER BY es.id")
    List<Event_Sponsor> findAllEventSponsorsJoin();

    @Query("SELECT es FROM event_sponsor es JOIN FETCH es.event JOIN FETCH es.sponsor WHERE es.id = :id ORDER BY es.id")
    Optional<Event_Sponsor> findEventSponsorByIdJoin(@Param("id") int id);
}
