package com.sena.crud_basic.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sena.crud_basic.service.CategoryServices;
import com.sena.crud_basic.DTO.CategoryDTO;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/v1/category")
public class CategoryController {

    @Autowired 
    private CategoryServices categoryServices;   


    @GetMapping("/GetAll")
    public ResponseEntity<List<CategoryDTO>> findAllCategory() {
        List<CategoryDTO> listCategory = categoryServices.findAllCategory();
        return ResponseEntity.ok(listCategory);    
    } 
    
    @GetMapping("/GetById/{id}")
    public ResponseEntity<Object> findCategoryById(@PathVariable int id) {
        var category = categoryServices.findByIdCategory(id);
        if (category.isPresent()) {
            return ResponseEntity.ok(category.get()); 
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("La categoria con ID " + id + " no fue encontrada.");
        }
    }
    
    @PostMapping("/Create")
    public ResponseEntity<CategoryDTO> save(@RequestBody CategoryDTO categoryDTO) {
        CategoryDTO newCategory = categoryServices.save(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCategory);
    }
    
    @PutMapping("/Update/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody CategoryDTO categoryDTO) {
    boolean updated = categoryServices.update(id, categoryDTO);
    if (updated) {
            return ResponseEntity.ok("Actualización exitosa");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada");
        }

    }

    @DeleteMapping("/Delete/{id}")
    public ResponseEntity<Object> delete(@PathVariable int id) {
        boolean deleted = categoryServices.delete(id);
        if (deleted) {
            return ResponseEntity.ok("Eliminacion exitosa");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria no encontrada");
        }
    }

}
