import { EVENT_ENDPOINT } from "../../constants/api";
import { Event, EventResponse } from "../../types/Entities/event";
import { GenericService } from "../genericService";

export class EventServiceClass extends GenericService<Event, EventResponse> {
    constructor() {
        super(EVENT_ENDPOINT);
    }
}

export const EventService = new EventServiceClass();