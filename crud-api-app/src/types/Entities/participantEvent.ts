export interface ParticipantEvent {
    id: string | number;
    participantId: number
    eventId: number
}

export interface ParticipantEventResponse {
    id: string | number;

    eventId: number
    eventName: string
    
    participantId: number
    participantName: string
}