package com.sena.crud_basic.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sena.crud_basic.model.Organizer;

public interface IOrganizer extends JpaRepository<Organizer, Integer> {}