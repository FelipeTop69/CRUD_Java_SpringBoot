import { PARTICIPANT_ENDPOINT } from "../../constants/api";
import { Participant } from "../../types/Entities/participant";
import { GenericService } from "../genericService";

export class ParticipantServiceClass extends GenericService<Participant, Participant> {
    constructor() {
        super(PARTICIPANT_ENDPOINT);
    }
}

export const ParticipantService = new ParticipantServiceClass();
