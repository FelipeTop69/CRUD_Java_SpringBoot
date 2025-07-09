import { ResponseDTO } from "../types/response";

export abstract class GenericService<TWrite, TRead, ID = number> {
    constructor(protected readonly baseUrl: string) { }

    async getAll(): Promise<TRead[]> {
        const response = await fetch(`${this.baseUrl}/GetAll`);
        if (!response.ok) throw new Error("Error al listar registros");
        return response.json();
    }

    async getById(id: ID): Promise<TRead> {
        const response = await fetch(`${this.baseUrl}/GetById/${id}`);
        if (!response.ok) throw new Error("Error al obtener registro");
        return response.json();
    }

    async create(item: TWrite): Promise<ResponseDTO<TRead>> {
        const response = await fetch(`${this.baseUrl}/Create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error("Error al crear");
        return response.json();
    }

    async update(item: TWrite): Promise<ResponseDTO<TRead>> {
        const response = await fetch(`${this.baseUrl}/Update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        if (!response.ok) throw new Error("Error al actualizar");
        return response.json();
    }

    async delete(id: ID): Promise<ResponseDTO> {
        const response = await fetch(`${this.baseUrl}/Delete/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar");
        return response.json();
    }
}
