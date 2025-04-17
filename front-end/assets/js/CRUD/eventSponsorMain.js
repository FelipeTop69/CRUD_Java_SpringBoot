import {listar, ejecutarFormularioRegistro, cargarEventEnSelect, cargarSponsorEnSelect} from "./dom/eventSponsorDom.js";

document.addEventListener("DOMContentLoaded", () => {
    listar();
    ejecutarFormularioRegistro();
    cargarEventEnSelect("eventId");
    cargarSponsorEnSelect("sponsorId");
});