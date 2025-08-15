export type DrawerParamList = {
    Home: undefined;

    // Categoria
    Category: undefined;
    CategoryCreate: undefined;
    CategoryUpdate: {id: number};

    // Tipo de Ticket
    TyTicket: undefined;
    TyTicketCreate: undefined;
    TyTicketUpdate: {id: number};

    // Patrocinador
    Sponsor: undefined;
    SponsorCreate: undefined;
    SponsorUpdate: {id: number};

    // Ubiacion
    Location: undefined;
    LocationCreate: undefined;
    LocationUpdate: {id: number};

    // Organiador
    Organizer: undefined;
    OrganizerCreate: undefined;
    OrganizerUpdate: {id: number};

    // Participante
    Participant: undefined;
    ParticipantCreate: undefined;
    ParticipantUpdate: {id: number};

    // Evento
    Event: undefined;
    EventCreate: undefined;
    EventUpdate: {id: number};

    // Ticket
    Ticket: undefined;
    TicketCreate: undefined;
    TicketUpdate: {id: number};

    // Evento Sponsor
    EventSponsor: undefined;
    EventSponsorCreate: undefined;
    EventSponsorUpdate: {id: number};

    // Organizador
    ParticipantEvent: undefined;
    ParticipantEventCreate: undefined;
    ParticipantEventUpdate: {id: number};
};