import {listar, ejecutarFormularioRegistro, cargarOrganizerEnSelect, cargarLocationEnSelect, cargarCategoryEnSelect} from "./dom/eventDom.js";

document.addEventListener("DOMContentLoaded", () => {
    listar();
    ejecutarFormularioRegistro();
    cargarOrganizerEnSelect("organizerId");
    cargarLocationEnSelect("locationId");
    cargarCategoryEnSelect("categoryId");
});