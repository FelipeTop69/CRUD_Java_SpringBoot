package com.sena.crud_basic.service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.OrganizerDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.IOrganizer;
import com.sena.crud_basic.mapper.OrganizerMapper;
import com.sena.crud_basic.model.Organizer;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class OrganizerServices {
    @Autowired
    private IOrganizer organizerData;

    public List<OrganizerDTO> findAllOrganizer() {
        List<Organizer> organizers = organizerData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return OrganizerMapper.toDTOList(organizers);
    }

    public OrganizerDTO findByIdOrganizer(int id) {
        return organizerData.findById(id)
                .map(OrganizerMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Organizer con ID " + id + " no encontrado"));
    }

    public responseDTO save(OrganizerDTO organizerDTO) {
        // Normalizar los campos del DTO 
        List<String> normalizedInputs = Arrays.asList(
            StringNormalizer.normalize(organizerDTO.getName()),
            StringNormalizer.normalize(organizerDTO.getPhone())
            
        );
        
        // Verificar si algun organizer existente coincide con alguno de los campos
        boolean exists = organizerData.findAll().stream()
            .anyMatch(organizer -> {
                // Normalizar los campos del organizer actual
                List<String> normalizedOrganizerFields = Arrays.asList(
                    StringNormalizer.normalize(organizer.getName()),
                    StringNormalizer.normalize(organizer.getPhone())
                );

                // Comparar si hay al menos un campo que coincida
                return normalizedOrganizerFields.stream()
                    .anyMatch(normalizedInputs::contains);
            });
        
        if (exists) {
            throw new IllegalArgumentException("Ya existe un organizer con los datos proporcionados");
        }

        Organizer organizer = OrganizerMapper.toEntity(organizerDTO);
        Organizer savedOrganizer = organizerData.save(organizer);
        OrganizerDTO savedOrganizerDTO = OrganizerMapper.toDTO(savedOrganizer);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Organizer creado con exito",
            savedOrganizerDTO
        );
    }

    public responseDTO update(OrganizerDTO organizerDTO) {
        Organizer organizer = organizerData.findById(organizerDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Organizer con ID " + organizerDTO.getId() + " no encontrado"));

        organizer.setName(organizerDTO.getName());
        organizer.setPhone(organizerDTO.getPhone());

        Organizer updatedOrganizer = organizerData.save(organizer);
        OrganizerDTO updatedOrganizerDTO = OrganizerMapper.toDTO(updatedOrganizer);

        return new responseDTO(HttpStatus.OK, "Organizer actualizado con exito", updatedOrganizerDTO);
    }

    public responseDTO delete(int id) {
        Organizer organizer = organizerData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Organizer con ID " + id + " no encontrado"));

        organizerData.delete(organizer);
        return new responseDTO(HttpStatus.OK, "Organizer con id " + id + " eliminado con exito");
    }
}
