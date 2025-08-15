export interface Event {
    id: string | number;
    name: string;
    description: string
    date: number
    organizerId: number
    locationId: number
    categoryId: number
}

export interface EventResponse {
    id: string | number;
    name: string;
    description: string
    date: number

    organizerId: number
    organizerName: string

    locationId: number
    locationName: string

    categoryId: number
    categoryName: string
}