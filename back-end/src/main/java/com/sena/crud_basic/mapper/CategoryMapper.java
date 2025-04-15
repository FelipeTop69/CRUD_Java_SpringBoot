package com.sena.crud_basic.mapper;

import com.sena.crud_basic.DTO.CategoryDTO;
import com.sena.crud_basic.model.Category;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {
        return new CategoryDTO(category.getId(), category.getName(), category.getDescription());
    }

    public static Category toEntity(CategoryDTO dto) {
        return new Category(dto.getId(),dto.getName(), dto.getDescription());
    }

    public static List<CategoryDTO> toDTOList(List<Category> categories) {
        return categories.stream().map(CategoryMapper::toDTO).collect(Collectors.toList());
    }
}