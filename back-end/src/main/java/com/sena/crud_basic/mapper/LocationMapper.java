package com.sena.crud_basic.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.sena.crud_basic.DTO.LocationDTO;
import com.sena.crud_basic.model.Location;


public class LocationMapper {
    public static LocationDTO toDTO(Location location) {
        return new LocationDTO(location.getId(), location.getName(), location.getAddress(), location.getCapacity());
    }

    public static Location toEntity(LocationDTO dto) {
        return new Location(dto.getId(),dto.getName(), dto.getAddress(), dto.getCapacity());
    }

    public static List<LocationDTO> toDTOList(List<Location> locations) {
        return locations.stream().map(LocationMapper::toDTO).collect(Collectors.toList());
    }
}