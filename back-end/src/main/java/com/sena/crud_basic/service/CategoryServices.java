package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.CategoryDTO;
import com.sena.crud_basic.DTO.responseDTO;
import com.sena.crud_basic.interfaces.ICategory;
import com.sena.crud_basic.mapper.CategoryMapper;
import com.sena.crud_basic.model.Category;

@Service
public class CategoryServices {

    @Autowired
    private ICategory categoryData;

    public List<CategoryDTO> findAllCategory() {
        List<Category> categories = categoryData.findAll();
        return CategoryMapper.toDTOList(categories);
    }

    public CategoryDTO findByIdCategory(int id) {
        return categoryData.findById(id)
                .map(CategoryMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + id + " no encontrada"));
    }

    public responseDTO save(CategoryDTO categoryDTO) {
        // Convertir el nombre a minusculas y quitar los espacios 
        String convertName = categoryDTO.getName().replaceAll("\\s", "");

        // Verificar si ya existe la categoria
        // Version New
        if (categoryData.existsByNameIgnoreCase(convertName)) {
            throw new IllegalArgumentException("Ya existe una categoria con el nombre " + categoryDTO.getName());
        }

        Category category = CategoryMapper.toEntity(categoryDTO);
        Category savedCategory = categoryData.save(category);
        CategoryDTO savedCategoryDTO = CategoryMapper.toDTO(savedCategory);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Categoria creada con exito",
            savedCategoryDTO
        );
    }

    public responseDTO update(CategoryDTO categoryDTO) {
        Category category = categoryData.findById(categoryDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + categoryDTO.getId() + " no encontrada"));

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        Category updatedCategory = categoryData.save(category);
        CategoryDTO updatedCategoryDTO = CategoryMapper.toDTO(updatedCategory);

        return new responseDTO(HttpStatus.OK, "Categoria actualizada con exito", updatedCategoryDTO);
    }

    public responseDTO delete(int id) {
        Category category = categoryData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Categoria con ID " + id + " no encontrada"));

        categoryData.delete(category);
        return new responseDTO(HttpStatus.OK, "Categoria con id " + id + " eliminada con éxito");
    }
}

// VERSION Old
// public CategoryDTO save(CategoryDTO categoryDTO) {
//     Category category = CategoryMapper.toEntity(categoryDTO);
//     Category savedCategory = categoryData.save(category);
//     return CategoryMapper.toDTO(savedCategory);
// }

// public boolean update(CategoryDTO categoryDTO) {
//     return categoryData.findById(categoryDTO.getId()).map(existingCategory -> {
//         existingCategory.setName(categoryDTO.getName());
//         existingCategory.setDescription(categoryDTO.getDescription());
//         categoryData.save(existingCategory);
//         return true;
//     }).orElse(false);
// }

// public boolean delete(int id) {
//     return categoryData.findById(id).map(category -> {
//         categoryData.delete(category);
//         return true;
//     }).orElse(false);
// }

// Version Old
// if (categoryData.existsByName(categoryDTO.getName())) {
//     throw new IllegalArgumentException("Ya existe una categoria con el nombre " + categoryDTO.getName());
// }