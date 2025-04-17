import {fetchAll, save, getById, update, kill, fetchAllTypeTicket, fetchAllEvent} from "../api/ticketAPI.js"

let dataTable; 

export async function listar() {
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
            <td>$${item.price} COP</td>
            <td>${item.availableQuantity}</td>
            <td>${item.typeTicketName}</td>
            <td>${item.eventName}</td>
            <td>
                <div class="form-button-action">
                    <button type="button" class="btnActualizar btn btn-link btn-primary btn-lg" title="Actualizar Registro"
                        data-id="${item.id}" 
                        data-bs-toggle="modal" data-bs-target="#modalActualizar">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button type="button" class="btnEliminar btn btn-link btn-danger" title="Eliminar Registro"
                        data-id="${item.id}" data-price="${item.price}">
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

    document.querySelectorAll(".btnActualizar").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            ejecutarFormularioActualizar(id)
        });
    });

    document.querySelectorAll(".btnEliminar").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const price = this.getAttribute("data-price");
            Swal.fire({
                icon: "warning",
                title: "¿Estás Segur@ de la Eliminación?",
                text: `Precio: ${price}`,
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
        });
    });
}

export function ejecutarFormularioRegistro() {
    const formulario = document.getElementById("formularioRegistro");
    const modalRegistro = new bootstrap.Modal(document.getElementById("modalRegistro"));

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = {
            price: parseFloat(formulario.price.value.replace(',', '.')),
            availableQuantity: parseInt(formulario.availableQuantity.value),
            eventId: parseInt(formulario.eventId.value),
            typeTicketId: parseInt(formulario.typeTicketId.value),
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
        // console.log(`Info: ${info.id} - ${info.price} - ${info.availableQuantity} - ${info.eventId} - ${info.eventName} - ${info.typeTicketId} - ${info.typeTicketName}`)

        modalBody.innerHTML = `
            <form id="formularioActualizar" class="row needs-validation">
                <input type="hidden" name="id" value="${info.id}" />
                <div class="col-md-12">
                    <label for="price" class="form-label">Price</label>
                        <input type="number" name="price" id="price" class="form-control mb-3" value="${info.price}" required
                            step="0.01" min="0" max="2000000" pattern="^\d+(\.\d{1,2})?$" title="Solo números. Hasta 2 decimales. Ej: 2500.50">
                        
                    <label for="availableQuantity" class="form-label mb-3">Quantity</label>
                        <input type="number" name="availableQuantity" id="availableQuantity" class="form-control mb-3" value="${info.availableQuantity}" required
                            min="1" max="10000" step="1" title="Solo números enteros entre 1 y 10.000">
                        
                    <label for="typeTicketUpdateId" class="form-label">Type Ticket</label>
                        <select class="form-select mb-3" id="typeTicketUpdateId" name="typeTicketUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona el Tipo de Ticket
                        </div>

                    <label for="eventUpdateId" class="form-label">Event</label>
                        <select class="form-select mb-3" id="eventUpdateId" name="eventUpdateId" required>
                            
                        </select>
                        <div class="invalid-feedback">
                            Selecciona el Evento
                        </div>
                </div>
                <br>
                <div class="col-md-12 text-center mb-2">
                    <button type="submit" class="btn btn-success">Actualizar Datos</button>
                </div>
            </form>
        `;
        await cargarTypeTicketEnSelect("typeTicketUpdateId");
        await cargarEventEnSelect("eventUpdateId");
        document.getElementById("typeTicketUpdateId").value = info.typeTicketId;
        document.getElementById("eventUpdateId").value = info.eventId;

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
            price: parseFloat(formActualizar.price.value.replace(',', '.')),
            availableQuantity: parseInt(formActualizar.availableQuantity.value),
            eventId: parseInt(formActualizar.eventUpdateId.value),
            typeTicketId: parseInt(formActualizar.typeTicketUpdateId.value),
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

export async function cargarTypeTicketEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const typeticket = await fetchAllTypeTicket();

        typeticket.forEach(type => {
            select.innerHTML += `<option value="${type.id}">${type.name}</option>`;
        });

    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se cargaron los datos type DOM."
        });
    }
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