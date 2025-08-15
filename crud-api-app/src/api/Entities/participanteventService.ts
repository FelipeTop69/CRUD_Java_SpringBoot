import { PARTICIPANTEVENT_ENDPOINT } from "../../constants/api";
import { ParticipantEvent, ParticipantEventResponse } from "../../types/Entities/participantEvent";
import { GenericService } from "../genericService";

export class ParticipantEventServiceClass extends GenericService<ParticipantEvent, ParticipantEventResponse> {
    constructor() {
        super(PARTICIPANTEVENT_ENDPOINT);
    }
}

export const ParticipantEventService = new ParticipantEventServiceClass();