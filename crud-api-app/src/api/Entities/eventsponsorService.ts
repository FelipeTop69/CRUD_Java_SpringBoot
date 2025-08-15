import { EVENTSPONSOR_ENDPOINT } from "../../constants/api";
import { EventSponsor, EventSponsorResponse } from "../../types/Entities/eventsponsor";
import { GenericService } from "../genericService";

export class EventSponsorServiceClass extends GenericService<EventSponsor, EventSponsorResponse> {
    constructor() {
        super(EVENTSPONSOR_ENDPOINT);
    }
}

export const EventSponsorService = new EventSponsorServiceClass();