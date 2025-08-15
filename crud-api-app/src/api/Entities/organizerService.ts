import { ORGANIZER_ENDPOINT } from "../../constants/api";
import { Organizer } from "../../types/Entities/organizer";
import { GenericService } from "../genericService";

export class OrganizerServiceClass extends GenericService<Organizer, Organizer> {
    constructor() {
        super(ORGANIZER_ENDPOINT);
    }
}

export const OrganizerService = new OrganizerServiceClass();
