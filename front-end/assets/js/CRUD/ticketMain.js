import {listar, ejecutarFormularioRegistro, cargarTypeTicketEnSelect,cargarEventEnSelect} from "./dom/ticketDom.js";

document.addEventListener("DOMContentLoaded", () => {
    listar();
    ejecutarFormularioRegistro();
    cargarTypeTicketEnSelect("typeTicketId")
    cargarEventEnSelect("eventId")
});