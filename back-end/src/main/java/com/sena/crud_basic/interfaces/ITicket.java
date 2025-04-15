package com.sena.crud_basic.interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Ticket;

@Repository
public interface ITicket extends JpaRepository<Ticket, Integer> {
    @Query("SELECT t FROM ticket t JOIN FETCH t.event JOIN FETCH t.typeTicket ORDER BY t.id")
    List<Ticket> findAllTicketsJoin();

    @Query("SELECT t FROM ticket t JOIN FETCH t.typeTicket JOIN FETCH t.event WHERE t.id = :id ORDER BY t.id")
    Optional<Ticket> findTicketByIdJoin(@Param("id") int id);
}
