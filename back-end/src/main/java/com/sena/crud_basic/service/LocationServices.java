package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.LocationDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.ILocation;
import com.sena.crud_basic.mapper.LocationMapper;
import com.sena.crud_basic.model.Location;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class LocationServices {
    @Autowired
    private ILocation locationData;

    public List<LocationDTO> findAllLocation() {
        List<Location> locations = locationData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return LocationMapper.toDTOList(locations);
    }

    public LocationDTO findByIdLocation(int id) {
        return locationData.findById(id)
                .map(LocationMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Location con ID " + id + " no econtrada"));
    }

    public responseDTO save(LocationDTO locationDTO) {
        String normalizeName  = StringNormalizer.normalize(locationDTO.getName());

        List<Location> allLocations = locationData.findAll();

        boolean exists = allLocations.stream()
            .map(t -> StringNormalizer.normalize(t.getName()))
            .anyMatch(name -> name.equals(normalizeName));

        if (exists) {
            throw new IllegalArgumentException("Ya existe una Location con el nombre " + locationDTO.getName());
        }

        Location location = LocationMapper.toEntity(locationDTO);
        Location savedLocation = locationData.save(location);
        LocationDTO savedLocationDTO = LocationMapper.toDTO(savedLocation);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Location creada con exito",
            savedLocationDTO
        );
    }

    public responseDTO update(LocationDTO locationDTO) {
        Location location = locationData.findById(locationDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Location con ID " + locationDTO.getId() + " no econtrada"));

        location.setName(locationDTO.getName());
        location.setAddress(locationDTO.getAddress());
        location.setCapacity(locationDTO.getCapacity());

        Location updatedLocation = locationData.save(location);
        LocationDTO updatedLocationDTO = LocationMapper.toDTO(updatedLocation);

        return new responseDTO(HttpStatus.OK, "Location actualizada con exito", updatedLocationDTO);
    }

    public responseDTO delete(int id) {
        Location location = locationData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Location con ID " + id + " no econtrada"));

        locationData.delete(location);
        return new responseDTO(HttpStatus.OK, "Location con id " + id + " eliminada con exito");
    }
}
