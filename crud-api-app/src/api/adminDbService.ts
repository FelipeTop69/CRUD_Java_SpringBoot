import { ADMINDB_ENDPOINT } from "../constants/api";
import { ResponseDTO } from "../types/response";


export class AdminService {
    static async killAllConnections(): Promise<ResponseDTO> {
        const response = await fetch(`${ADMINDB_ENDPOINT}kill-connections`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Error al terminar conexiones");
        }

        return response.json();
    }
}