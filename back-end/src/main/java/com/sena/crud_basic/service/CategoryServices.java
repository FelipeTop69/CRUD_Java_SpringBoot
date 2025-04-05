package com.sena.crud_basic.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sena.crud_basic.DTO.CategoryDTO;
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

    public Optional<CategoryDTO> findByIdCategory(int id) {
        return categoryData.findById(id).map(CategoryMapper::toDTO);
    }

    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category category = CategoryMapper.toEntity(categoryDTO);
        Category savedCategory = categoryData.save(category);
        return CategoryMapper.toDTO(savedCategory);
    }

    public boolean update(int id, CategoryDTO categoryDTO) {
        return categoryData.findById(id).map(existingCategory -> {
            existingCategory.setName(categoryDTO.getName());
            existingCategory.setDescription(categoryDTO.getDescription());
            categoryData.save(existingCategory);
            return true;
        }).orElse(false);
    }

    public boolean delete(int id) {
        return categoryData.findById(id).map(category -> {
            categoryData.delete(category);
            return true;
        }).orElse(false);
    }
}
