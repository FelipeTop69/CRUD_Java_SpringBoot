package com.sena.crud_basic.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.CategoryDTO;
import com.sena.crud_basic.DTO_Response.responseDTO;
import com.sena.crud_basic.interfaces.ICategory;
import com.sena.crud_basic.mapper.CategoryMapper;
import com.sena.crud_basic.model.Category;
import com.sena.crud_basic.utils.StringNormalizer;

@Service
public class CategoryServices {

    @Autowired
    private ICategory categoryData;

    public List<CategoryDTO> findAllCategory() {
        List<Category> categories = categoryData.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return CategoryMapper.toDTOList(categories);
    }

    public CategoryDTO findByIdCategory(int id) {
        return categoryData.findById(id)
                .map(CategoryMapper::toDTO)
                .orElseThrow(() -> new NoSuchElementException("Category con ID " + id + " no encontrada"));
    }

    public responseDTO save(CategoryDTO categoryDTO) {
        String normalizeName  = StringNormalizer.normalize(categoryDTO.getName());

        List<Category> allCategories = categoryData.findAll();

        boolean exists = allCategories.stream()
            .map(t -> StringNormalizer.normalize(t.getName()))
            .anyMatch(name -> name.equals(normalizeName));

        if (exists) {
            throw new IllegalArgumentException("Ya existe una Category con el nombre " + categoryDTO.getName());
        }

        Category category = CategoryMapper.toEntity(categoryDTO);
        Category savedCategory = categoryData.save(category);
        CategoryDTO savedCategoryDTO = CategoryMapper.toDTO(savedCategory);
        return new responseDTO(
            HttpStatus.CREATED, 
            "Category creada con exito",
            savedCategoryDTO
        );
    }

    public responseDTO update(CategoryDTO categoryDTO) {
        Category category = categoryData.findById(categoryDTO.getId())
            .orElseThrow(() -> new NoSuchElementException("Category con ID " + categoryDTO.getId() + " no encontrada"));

        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());

        Category updatedCategory = categoryData.save(category);
        CategoryDTO updatedCategoryDTO = CategoryMapper.toDTO(updatedCategory);

        return new responseDTO(HttpStatus.OK, "Category actualizada con exito", updatedCategoryDTO);
    }

    public responseDTO delete(int id) {
        Category category = categoryData.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Category con ID " + id + " no encontrada"));

        categoryData.delete(category);
        return new responseDTO(HttpStatus.OK, "Category con id " + id + " eliminada con éxito");
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
// 01
// if (categoryData.existsByName(categoryDTO.getName())) {
//     throw new IllegalArgumentException("Ya existe una category con el nombre " + categoryDTO.getName());
// }
// 02
// String convertName = categoryDTO.getName().replaceAll("\\s", "");

// if (categoryData.existsByNameIgnoreCase(convertName)) {
//     throw new IllegalArgumentException("Ya existe una category con el nombre " + categoryDTO.getName());
// }