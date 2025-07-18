import {fetchAll, save, getById, update, kill} from "../api/locationAPI.js"

let dataTable; // Referencia global al DataTable

export async function listar() {
    const data = await fetchAll();
    // console.log(data);

    const tablaId = "#tablaRespuesta";

    // Verifica si ya está inicializado y destrúyelo
    if ($.fn.DataTable.isDataTable(tablaId)) {
        dataTable.destroy();
        document.querySelector(`${tablaId} tbody`).innerHTML = ""; // Limpia el tbody
    }

    const tbody = document.querySelector(`${tablaId} tbody`);
    let numero = 1;
    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>#${numero++}</td>
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.capacity}</td>
            <td>
                <div class="form-button-action">
                    <button type="button" class="btnActualizar btn btn-link btn-primary btn-lg" title="Actualizar Registro"
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

    // Inicializa el DataTable
    dataTable = $(tablaId).DataTable({
        pageLength: 5,
        responsive: true,
        autoWidth: false,
        destroy: true, // Garantiza destrucción si lo anterior falla
        language: {
            // url: "//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json",
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
        /**
         * url: Consultar
         * emptyTable: mensaje cuando no hay datos cargados (como si el API devolviera una lista vacía).
         * zeroRecords: cuando buscas y no hay coincidencias.
         * loadingRecords: mientras carga.
         * info, infoEmpty, infoFiltered: para mostrar estadísticas abajo de la tabla.
         * paginate: nombres en los botones de paginación.
         */
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
                text: `Location: ${name}`,
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
}

export function ejecutarFormularioRegistro() {
    const formulario = document.getElementById("formularioRegistro");
    const modalRegistro = new bootstrap.Modal(document.getElementById("modalRegistro"));

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = {
            name: formulario.name.value,
            address: formulario.address.value,
            capacity: formulario.capacity.value,
        };

        try {
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
        // console.log(`Info: ${info.id} - ${info.name} - ${info.address}`)

        modalBody.innerHTML = `
            <form id="formularioActualizar" class="row needs-validation">
                <input type="hidden" name="id" value="${info.id}" />
                <div class="col-md-12">
                    <label for="nameUpdate" class="form-label">Name</label>
                        <input type="text" name="nameUpdate" id="nameUpdate" value="${info.name}" class="form-control mb-3" placeholder="Digite el Nombre" required>
            
                    <label for="addressUpdate" class="form-label">Address</label>
                        <input type="text" name="addressUpdate" id="addressUpdate" value="${info.address}" class="form-control mb-3" placeholder="Digite la Descripcion" required>

                    <label for="capacityUpdate" class="form-label mb-3">Capacity</label>
                        <input type="number" name="capacityUpdate" id="capacityUpdate" class="form-control mb-3" value="${info.capacity}" placeholder="Digite la Capacidad" required
                        min="1" max="100000" step="1" title="Solo números enteros entre 1 y 100.000">
                </div>
                <br>
                <div class="col-md-12 text-center mb-2">
                    <button type="submit" class="btn btn-success">Actualizar Datos</button>
                </div>
            </form>
        `;
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
            name: formActualizar.nameUpdate.value,
            address: formActualizar.addressUpdate.value,
            capacity: formActualizar.capacityUpdate.value,
        };

        try {
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