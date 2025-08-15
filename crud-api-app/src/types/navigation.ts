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
};