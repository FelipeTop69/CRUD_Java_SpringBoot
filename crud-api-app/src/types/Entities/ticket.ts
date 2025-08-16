export interface Ticket {
    id: string | number;
    price: number;
    availableQuantity: number
    typeTicketId: number
    eventId: number

    // Propiedades opcionales para UI
    eventName?: string;
    typeTicketName?: string;
}

export interface TicketResponse {
    id: string | number;
    price: number;
    availableQuantity: number

    typeTicketId: number
    typeTicketName: string

    eventId: number
    eventName: string
}