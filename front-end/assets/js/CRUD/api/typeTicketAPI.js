const API_BASE_URL = "http://localhost:8080/api/v1/typeticket/";
const HEADER = {
    "Content-Type": "application/json"
}

export async function fetchAll() {
    try {
        const response = await fetch(`${API_BASE_URL}GetAll`, {
            method: "GET"
        });

        if (!response.ok) throw new Error("Error al obtener Datos API");

        return await response.json();

        // let respuesta = await response.json()
        // console.log(respuesta)
    } catch (error) {
        console.error("Error al consultar Datos API:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudieron obtener los Datos API",
        });
        return [];
    }
}

export async function save(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}Create`, {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            // API - error con mensaje personalizado
            throw new Error(data.message || "Error al registrar los datos.");
        }

        return data;
    } catch (error) {
        console.error("Error registrando Datos API:", error);
        throw error; // Relanzamiento de excepcion para que se capture en el DOM
    }
}

export async function getById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}GetById/${id}`, {
            method: "GET",
            headers: HEADER
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al obtener por id.");
        }

        return data;
    } catch (error) {
        console.error("Error al obtener por id API:", error);
        throw error;
    }
}

export async function update(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}Update`, {
            method: "PUT",
            headers: HEADER,
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al actualizar los datos API");
        }

        return data;
    } catch (error) {
        console.error("Error al actualizar Datos API:", error);
        throw error;
    }
}

export async function kill(id) {
    try {
        const response = await fetch(`${API_BASE_URL}Delete/${id}`, {
            method: "DELETE",
            headers: HEADER
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al eliminar el registro API");
        }

        return data;
    } catch (error) {
        console.error("Error al eliminar el registro API:", error);
        throw error;
    }
}