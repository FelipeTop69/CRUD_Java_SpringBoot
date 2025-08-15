import { TICKET_ENDPOINT } from "../../constants/api";
import { Ticket, TicketResponse } from "../../types/Entities/ticket";
import { GenericService } from "../genericService";

export class TicketServiceClass extends GenericService<Ticket, TicketResponse> {
    constructor() {
        super(TICKET_ENDPOINT);
    }
}

export const TicketService = new TicketServiceClass();