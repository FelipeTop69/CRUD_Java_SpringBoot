package com.sena.crud_basic.service;

import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.SponsorDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.ISponsor;
import com.sena.crud_basic.mapper.SponsorMapper;
import com.sena.crud_basic.model.Sponsor;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class SponsorServices {
    @Autowired
    private ISponsor sponsorData;

    public List<SponsorDTO> findAllSponsor() {
        List<Sponsor> sponsors = sponsorData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return SponsorMapper.toDTOList(sponsors);
    }

    public SponsorDTO findByIdSponsor(int id) {
        return sponsorData.findById(id)
                .map(SponsorMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Sponsor con ID " + id + " no encontrado"));
    }

    public responseDTO save(SponsorDTO sponsorDTO) {
        List<String> normalizedInputs = Arrays.asList(
            StringNormalizer.normalize(sponsorDTO.getName()),
            StringNormalizer.normalize(sponsorDTO.getPhone())
            
        );
        
        boolean exists = sponsorData.findAll().stream()
            .anyMatch(sponsor -> {
                List<String> normalizedSponsorFields = Arrays.asList(
                    StringNormalizer.normalize(sponsor.getName()),
                    StringNormalizer.normalize(sponsor.getPhone())
                );

                return normalizedSponsorFields.stream()
                    .anyMatch(normalizedInputs::contains);
            });
        
        if (exists) {
            throw new IllegalArgumentException("Ya existe un sponsor con los datos proporcionados");
        }

        Sponsor sponsor = SponsorMapper.toEntity(sponsorDTO);
        Sponsor savedSponsor = sponsorData.save(sponsor);
        SponsorDTO savedSponsorDTO = SponsorMapper.toDTO(savedSponsor);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Sponsor creado con exito",
            savedSponsorDTO
        );
    }

    public responseDTO update(SponsorDTO sponsorDTO) {
        Sponsor sponsor = sponsorData.findById(sponsorDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Sponsor con ID " + sponsorDTO.getId() + " no encontrado"));

        sponsor.setName(sponsorDTO.getName());
        sponsor.setPhone(sponsorDTO.getPhone());

        Sponsor updatedSponsor = sponsorData.save(sponsor);
        SponsorDTO updatedSponsorDTO = SponsorMapper.toDTO(updatedSponsor);

        return new responseDTO(HttpStatus.OK, "Sponsor actualizado con exito", updatedSponsorDTO);
    }

    public responseDTO delete(int id) {
        Sponsor sponsor = sponsorData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Sponsor con ID " + id + " no encontrado"));

        sponsorData.delete(sponsor);
        return new responseDTO(HttpStatus.OK, "Sponsor con id " + id + " eliminado con exito");
    }
}
