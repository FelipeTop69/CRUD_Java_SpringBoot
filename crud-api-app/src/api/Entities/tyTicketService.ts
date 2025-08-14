import { TYTICKET_ENDPOINT } from "../../constants/api";
import { TyTicket } from "../../types/Entities/tyTicket";
import { GenericService } from "../genericService";

export class TyTicketServiceClass extends GenericService<TyTicket, TyTicket> {
    constructor() {
        super(TYTICKET_ENDPOINT);
    }
}

export const TyTicketService = new TyTicketServiceClass();
