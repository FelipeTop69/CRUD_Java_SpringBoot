package com.sena.crud_basic.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "category")
public class Category {
        // Para indicar que el atributo sera la clave primaria
        @Id
        // Para indicar que sera autoincrement
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        // Para indicar que sera una columna en la bd
        @Column(name = "cat_id")
        private int id;

        @Column(name = "cat_name", length = 30, nullable = false)
        private String name;

        @Column(name = "cat_description", columnDefinition = "TEXT")
        private String description;

        // PNI
        @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Event> events = new ArrayList<>(); 

        // Constructores
        public Category() {}

        public Category(int id, String name, String description) {
                this.id = id;
                this.name = name;
                this.description = description;
        }

        // Getters and Setters
        public int getId() {
                return id;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getDescription() {
                return description;
        }

        public void setDescription(String description) {
                this.description = description;
        }

        public List<Event> getEvents() {
                return events;
        }

        public void setEvents(List<Event> events) {
                this.events = events;
        }
}
