import {fetchAll, save, getById, update, kill, fetchAllOrganizer, fetchAllLocation, fetchAllCategory} from "../api/eventAPI.js"

let dataTable; 

export async function listar() {
    // document.getElementById("spinnerTabla").classList.remove("d-none");

    try {
        // await new Promise(resolve => setTimeout(resolve, 2000));

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

            const fechaFormateada = new Date(item.date).toLocaleString('es-CO', {
                dateStyle: 'short',
                timeStyle: 'short'
            });

            tr.innerHTML = `
                <td>#${numero++}</td>
                <td>${item.name}</td>
                <td class="big-text-columna" title="${item.description}">${item.description}</td>
                <td title="${fechaFormateada}">${fechaFormateada}</td>
                <td>${item.organizerName}</td>
                <td class="big-text-columna" title="${item.locationName}">${item.locationName}</td>
                <td>${item.categoryName}</td>
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
                    text: `Event: ${name}`,
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
    } finally {
        // document.getElementById("spinnerTabla").classList.add("d-none");
    }
}


export function ejecutarFormularioRegistro() {
    const formulario = document.getElementById("formularioRegistro");
    const modalRegistro = new bootstrap.Modal(document.getElementById("modalRegistro"));

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = {
            name: formulario.name.value,
            description: formulario.description.value,
            date: formulario.date.value + ":00",
            organizerId: parseInt(formulario.organizerId.value),
            locationId: parseInt(formulario.locationId.value),
            categoryId: parseInt(formulario.categoryId.value)
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
        // console.log(`Info: ${info.id} - ${info.name} - ${info.availableQuantity} - ${info.eventId} - ${info.eventName} - ${info.organizerId} - ${info.organizerName}`)

        let fechaFormateada = formatearFechaActualizar(info.date);

        modalBody.innerHTML = `
            <form id="formularioActualizar" class="row needs-validation">
                <input type="hidden" name="id" value="${info.id}" />
                <div class="col-md-12">
                    <label for="nameUpdate" class="form-label">Name</label>
                        <input type="text" name="nameUpdate" id="nameUpdate" value="${info.name}" class="form-control mb-3" required>

                    <label for="descriptionUpdate" class="form-label">Description</label>
                        <input type="text" name="descriptionUpdate" id="descriptionUpdate" value="${info.description}" class="form-control mb-3" required>

                    <label for="dateUpdate" class="form-label">Fecha y Hora del Evento</label>
                        <input type="datetime-local" name="dateUpdate" id="dateUpdate" value="${fechaFormateada}" class="form-control mb-3" required>

                    <label for="organizerUpdateId" class="form-label">Organizer</label>
                        <select class="form-select mb-3" id="organizerUpdateId" name="organizerUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona Organizer
                        </div>

                    <label for="locationUpdateId" class="form-label">Location</label>
                        <select class="form-select mb-3" id="locationUpdateId" name="locationUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona Location
                        </div>
                            
                    <label for="categoryUpdateId" class="form-label">Category</label>
                        <select class="form-select mb-3" id="categoryUpdateId" name="categoryUpdateId" required>

                        </select>
                        <div class="invalid-feedback">
                            Selecciona Category
                        </div>
                </div>
                <br>
                <div class="col-md-12 text-center mb-2">
                    <button type="submit" class="btn btn-success">Actualizar Datos</button>
                </div>
            </form>
        `;

        await cargarOrganizerEnSelect("organizerUpdateId");
        await cargarLocationEnSelect("locationUpdateId");
        await cargarCategoryEnSelect("categoryUpdateId");
        document.getElementById("organizerUpdateId").value = info.organizerId;
        document.getElementById("locationUpdateId").value = info.locationId;
        document.getElementById("categoryUpdateId").value = info.categoryId;

        actualizar();


    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se pudieron actualizar los datos DOM."
        });
    }
}

function formatearFechaActualizar(fechaString) {
    const fecha = new Date(fechaString);

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');

    return `${anio}-${mes}-${dia}T${horas}:${minutos}`;
}

function actualizar() {
    const formActualizar = document.getElementById("formularioActualizar");
    const modalActualizar = bootstrap.Modal.getInstance(document.getElementById("modalActualizar"));

    formActualizar.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            id: parseInt(formActualizar.id.value),
            name: formActualizar.nameUpdate.value,
            description: formActualizar.descriptionUpdate.value,
            date: formActualizar.dateUpdate.value + ":00",
            organizerId: parseInt(formActualizar.organizerUpdateId.value),
            locationId: parseInt(formActualizar.locationUpdateId.value),
            categoryId: parseInt(formActualizar.categoryUpdateId.value)
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

export async function cargarOrganizerEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const organizer = await fetchAllOrganizer();

        organizer.forEach(organizer => {
            select.innerHTML += `<option value="${organizer.id}">${organizer.name}</option>`;
        });

    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se cargaron los datos type DOM."
        });
    }
}

export async function cargarLocationEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const location = await fetchAllLocation();

        location.forEach(location => {
            select.innerHTML += `<option value="${location.id}">${location.name}</option>`;
        });

    } catch (error) {
        Swal.fire({
            icon: "warning",
            title: "Atención",
            text: error.message || "No se cargaron los Event datos DOM."
        });
    }
}

export async function cargarCategoryEnSelect(selectId) {
    const select = document.getElementById(selectId);
    select.innerHTML = `<option selected disabled value="">Elije...</option>`;

    try {
        const category = await fetchAllCategory();

        category.forEach(category => {
            select.innerHTML += `<option value="${category.id}">${category.name}</option>`;
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