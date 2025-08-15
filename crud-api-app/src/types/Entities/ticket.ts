export interface Ticket {
    id: string | number;
    price: number;
    availableQuantity: number
    date: number
    eventId: number
    typeTicketId: number
}

export interface TicketResponse {
    id: string | number;
    price: number;
    availableQuantity: number
    date: number

    eventId: number
    eventName: string

    typeTicketId: number
    typeTicketName: string
}