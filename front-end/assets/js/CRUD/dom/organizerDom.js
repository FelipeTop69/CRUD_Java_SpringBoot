import {fetchAll, save, getById, update, kill} from "../api/organizerAPI.js"

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
    data.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>#${item.id}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
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

    document.querySelectorAll(".btnActualizar").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            // alert(id);
            ejecutarFormularioActualizar(id)
        });
    });

    document.querySelectorAll(".btnEliminar").forEach((btn) => {
        btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id");
            const name = this.getAttribute("data-name");

            Swal.fire({
                title: "¿Estás seguro?",
                text: `Organizer: ${name} (ID: ${id})`,
                icon: "warning",
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
            name: formulario.name.value,
            phone: formulario.phone.value,
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
        // console.log(`Info: ${info.id} - ${info.name} - ${info.phone}`)

        modalBody.innerHTML = `
            <form id="formularioActualizar" class="row needs-validation">
                <input type="hidden" name="id" value="${info.id}" />
                <div class="col-md-12">
                    <label for="name" class="form-label">Name</label>
                        <input type="text" name="name" id="name" value="${info.name}" class="form-control mb-3" placeholder="Digite el Nombre" required>
            
                    <label for="phone" class="form-label">Phone</label>
                        <input type="text" name="phone" id="phone" value="${info.phone}" class="form-control mb-3" placeholder="Digite el Numero de Contacto" required 
                            pattern="[0-9]{1,15}" maxlength="10" title="Solo numeros, máximo 10 digitos">
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
            name: formActualizar.name.value,
            phone: formActualizar.phone.value
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