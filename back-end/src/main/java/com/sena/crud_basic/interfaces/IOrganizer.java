package com.sena.crud_basic.interfaces;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sena.crud_basic.model.Organizer;

public interface IOrganizer extends JpaRepository<Organizer, Integer> {
    Optional<Organizer> findByNameIgnoreCase(String name);
    Optional<Organizer> findByPhone(String phone);
}