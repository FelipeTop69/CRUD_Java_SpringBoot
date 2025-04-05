package com.sena.crud_basic.interfaces;


import com.sena.crud_basic.model.Category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategory extends JpaRepository<Category, Integer>{

}
