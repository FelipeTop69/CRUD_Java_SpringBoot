import { ResponseDTO } from "../types/response";

export abstract class GenericService<TWrite, TRead, ID = number> {
    constructor(protected readonly baseUrl: string) { }

    private async handleResponse<T>(response: Response): Promise<T> {
        const data = await response.json();
        if (!response.ok) {
            // Lanza el mensaje de error específico de la API
            throw new Error(data.message || "Error en la operación");
        }
        return data;
    }

    async getAll(): Promise<TRead[]> {
        const response = await fetch(`${this.baseUrl}GetAll`);
        return this.handleResponse<TRead[]>(response);
    }

    async getById(id: ID): Promise<TRead> {
        const response = await fetch(`${this.baseUrl}GetById/${id}`);
        return this.handleResponse<TRead>(response);
    }

    async create(item: TWrite): Promise<ResponseDTO<TRead>> {
        const response = await fetch(`${this.baseUrl}Create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        return this.handleResponse<ResponseDTO<TRead>>(response);
    }

    async update(item: TWrite): Promise<ResponseDTO<TRead>> {
        const response = await fetch(`${this.baseUrl}Update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
        });
        return this.handleResponse<ResponseDTO<TRead>>(response);
    }

    async delete(id: ID): Promise<ResponseDTO> {
        const response = await fetch(`${this.baseUrl}Delete/${id}`, {
            method: "DELETE",
        });
        return this.handleResponse<ResponseDTO>(response);
    }
}
