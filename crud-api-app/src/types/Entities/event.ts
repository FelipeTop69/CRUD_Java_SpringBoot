export interface Event {
    id: string | number;
    name: string;
    description: string
    date: string
    organizerId: number
    locationId: number
    categoryId: number

    // Propiedades opcionales para UI
    organizerName?: string;
    locationName?: string;
    categoryName?: string;
}

export interface EventResponse {
    id: string | number;
    name: string;
    description: string
    date: string

    organizerId: number
    organizerName: string

    locationId: number
    locationName: string

    categoryId: number
    categoryName: string
}