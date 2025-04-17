import {fetchAll, save, getById, update, kill, fetchAllEvent, fetchAllSponsor} from "../api/eventSponsorAPI.js"

let dataTable; 

export async function listar() {

    try {
        const data = await fetchAll();
        // console.log(data);

        const tablaId = "#tablaRespuesta";

        if ($.fn.DataTable.isDataTable(tablaId)) {
            dataTable.destroy();
            document.querySelector(`${tablaId} tbody`).innerHTML = ""; 
        }

        const tbody = document.querySelector(`${tablaId} tbody`);
        let numero = 1;

        data.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>#${numero++}</td>
                <td>${item.eventName}</td>
                <td>${item.sponsorName}</td>
                <td>
                    <div class="form-button-action">
                        <button type="button" class="btnActualizar btn btn-link btn-primary border border-2 border-danger" title="Actualizar Registro"
                            data-id="${item.id}" 
                            data-bs-toggle="modal" data-bs-target="#modalActualizar">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button type="button" class="btnEliminar btn btn-link btn-danger" title="Eliminar Registro"
                            data-id="${item.id}" data-name="${item.name}">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        dataTable = $(tablaId).DataTable({
            pageLength: 5,
            responsive: true,
            autoWidth: false,
            destroy: true,
            language: {
                emptyTable: "No Nay Nada Que Qer Aqui.",
                zeroRecords: "No se encontraron resultados para tu búsqueda.",
                search: "Buscar:",
                lengthMenu: "Mostrar _MENU_ registros por página",
                info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
                infoEmpty: "Mostrando 0 a 0 de 0 registros",
                infoFiltered: "(filtrado de _MAX_ registros totales)",
                loadingRecords: "Cargando...",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: "Siguiente",
                    previous: "Anterior"
                }
            }
        });

        document.querySelector("#tablaRespuesta tbody").addEventListener("click", async (e) => {
            const btnActualizar = e.target.closest(".btnActualizar");
            const btnEliminar = e.target.closest(".btnEliminar");
        
            if (btnActualizar) {
                const id = btnActualizar.getAttribute("data-id");
                ejecutarFormularioActualizar(id);
            }
        
            if (btnEliminar) {
                const id = btnEliminar.getAttribute("data-id");
                const name = btnEliminar.getAttribute("data-name");
                Swal.fire({
                    icon: "warning",
                    title: "¿Estás Segur@ de la Eliminación?",
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: "#d33"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        await eliminar(id);
                        await listar();
                    }
                });
            }
        });

    } catch (error) {
        console.error("Error al listar datos:", error);
        Swal.fire({
            icon: "error",
            title: "Error al cargar los eventos",
            text: error.message || "Hubo un problema al obtener los datos"
        });
    }
}

export function ejecutarFormularioRegistro() {
    const formulario = document.getElementById("formularioRegistro");
    const modalRegistro = new bootstrap.Modal(document.getElementById("modalRegistro"));

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = {
            name: formulario.name.value,
            eventId: parseInt(formulario.eventId.value),
            sponsorId: parseInt(formulario.sponsorId.value),
        };

        try {
            // console.log(form)
            await save(form);
            Swal.fire("¡Registro Exitoso!", "", "success");

            formulario.reset();
            modalRegistro.hide();
            await listar();
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "Atención",
                text: error.message || "No se pudieron registrar los datos DOM."
            });
        }
    });
}

async function  ejecutarFormularioActualizar(id) {

    const modalBody = document.getElementById("cuerpoModalActualizar");

    try {
        const info = await getById(id);
        // console.log(`Info: ${info.id} - ${info.name} - ${info.availableQuantity} - ${info.eventId} - ${info.eventName} - ${info.sponsorId} - ${info.sponsorName}`)

        modalBody.innerHTML = `
            <form id="formularioActualizar" class="row needs-validation">
                <input type="hidden" name="id" value="${info.id}" />
                <div class="col-md-12">
                    <label for="eventUpdateId" class="form-label">Event</label>
                        <select class="form-select mb-3" id="eventUpdateId" name="eventUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona Event
                        </div>

                    <label for="sponsorUpdateId" class="form-label">Sponsor</label>
                        <select class="form-select mb-3" id="sponsorUpdateId" name="sponsorUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona Sponsor
                        </div>
                </div>
                <br>
                <div class="col-md-12 text-center mb-2">
                    <button type="submit" class="btn btn-success">Actualizar Datos</button>
                </div>
            </form>
        `;
        
        await cargarEventEnSelect("eventUpdateId");
        await cargarSponsorEnSelect("sponsorUpdateId");
        document.getElementById("eventUpdateId").value = info.eventId;
        document.getElementById("sponsorUpdateId").value = info.sponsorId;

        actualizar();
    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se pudieron actualizar los datos DOM."
        });
    }
}

function actualizar() {
    const formActualizar = document.getElementById("formularioActualizar");
    const modalActualizar = bootstrap.Modal.getInstance(document.getElementById("modalActualizar"));

    formActualizar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            id: parseInt(formActualizar.id.value),
            eventId: parseInt(formActualizar.eventUpdateId.value),
            sponsorId: parseInt(formActualizar.sponsorUpdateId.value),
        };

        try {
            // console.log(data)
            await update(data);
            Swal.fire("Actualizacion Exitosa!", "", "success");

            modalActualizar.hide();
            await listar();
        } catch (error) {
            Swal.fire({
                icon: "warning",
                title: "Atención",
                text: error.message || "No se pudieron actualizar los datos DOM."
            });
        }
    });
}

export async function cargarEventEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const event = await fetchAllEvent();

        event.forEach(event => {
            select.innerHTML += `<option value="${event.id}">${event.name}</option>`;
        });

    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se cargaron los Event datos DOM."
        });
    }
}

export async function cargarSponsorEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const sponsor = await fetchAllSponsor();

        sponsor.forEach(sponsor => {
            select.innerHTML += `<option value="${sponsor.id}">${sponsor.name}</option>`;
        });

    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se cargaron los datos type DOM."
        });
    }
}

async function eliminar(id) {
    try {
        await kill(id);
        Swal.fire("Registro Eliminado!", "", "success");
        await listar();
    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se pudo eliminar el registro DOM."
        });
    }
}