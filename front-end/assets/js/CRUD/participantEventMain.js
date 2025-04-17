import {listar, ejecutarFormularioRegistro, cargarParticipantEnSelect, cargarEventEnSelect} from "./dom/participantEventDom.js";

document.addEventListener("DOMContentLoaded", () => {
    listar();
    ejecutarFormularioRegistro();
    cargarParticipantEnSelect("participantId");
    cargarEventEnSelect("eventId");
});