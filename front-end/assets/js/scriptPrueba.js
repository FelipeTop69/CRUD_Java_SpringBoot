// document.addEventListener("DOMContentLoaded", function () {
//     fetch("http://localhost:8080/api/v1/organizer/GetAll") // Cambia esto a tu endpoint real
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data)

//             const tbody = document.querySelector("#tablaRespuesta tbody");

//             // Llenamos el tbody con los datos
//             data.forEach(item => {
//                 const tr = document.createElement("tr");
//                 tr.innerHTML = `
//                     <td>${item.id}</td>
//                     <td>${item.name}</td>
//                     <td>${item.phone}</td>
//                 `;
//                 tbody.appendChild(tr);
//             });

//             // Inicializamos DataTables una vez que la tabla tenga datos
//             $('#tablaRespuesta').DataTable({
//                 // pageLength: 5,
//             });
//         })
//         .catch(error => console.error("Error al cargar los datos:", error));
// });

const API_BASE_URL = "http://localhost:8080/api/v1/organizer/";
const HEADER = {
    "Content-Type": "application/json"
}

async function update(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}Update`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al actualizar los datos.");
        }

        console.log(data)
        // return data;
    } catch (error) {
        console.error("Error al actualizar Datos API:", error);
        throw error;
    }
}

let json = {
    "id" : 8,
    "name" : "actualizado",
    "phone": "78945212"
}

update(json)