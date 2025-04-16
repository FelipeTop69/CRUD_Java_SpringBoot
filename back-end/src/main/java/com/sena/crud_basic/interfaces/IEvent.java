package com.sena.crud_basic.interfaces;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Event;

@Repository
public interface IEvent extends JpaRepository<Event, Integer>{
    @Query("SELECT e FROM event e JOIN FETCH e.organizer JOIN FETCH e.location JOIN FETCH e.category ORDER BY e.id")
    List<Event> findAllEventsJoin();

    @Query("SELECT e FROM event e JOIN FETCH e.organizer JOIN FETCH e.location JOIN FETCH e.category WHERE e.id = :id ORDER BY e.id")
    Optional<Event> findEventByIdJoin(@Param("id") int id);

    @Query("SELECT COUNT(e) > 0 FROM event e WHERE e.date = :date AND e.location.id = :locationId")
    boolean existsByDateAndLocation(@Param("date") LocalDateTime date, @Param("locationId") int locationId);

}