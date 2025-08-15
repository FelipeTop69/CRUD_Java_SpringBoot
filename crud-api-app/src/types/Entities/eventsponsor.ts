export interface EventSponsor {
    id: string | number;
    eventId: number
    sponsorId: number
}

export interface EventSponsorResponse {
    id: string | number;

    eventId: number
    eventName: string
    
    sponsorId: number
    sponsorName: string
}