package com.sena.crud_basic.interfaces;

import com.sena.crud_basic.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategory extends JpaRepository<Category, Integer>{
        /*
     * JpaRepository incluye
     * SELECT
     * UPDATE
     * INSERT
     * DELETE
     * por defecto
     */

        // Version New
        boolean existsByNameIgnoreCase(String name);
}

        // Version Old
        // @Query("SELECT COUNT(c) > 0 FROM category c WHERE LOWER(REPLACE(c.name, ' ', '')) = LOWER(REPLACE(?1, ' ', ''))")
        // boolean existsByName(String name);