package com.sena.crud_basic.interfaces;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sena.crud_basic.model.Location;

@Repository
public interface ILocation extends JpaRepository<Location, Integer> {
    Optional<Location> findByNameIgnoreCase(String name);
    Optional<Location> findByAddressIgnoreCase(String address);
}