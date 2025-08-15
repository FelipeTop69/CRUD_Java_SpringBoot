import { SPONSOR_ENDPOINT } from "../../constants/api";
import { Sponsor } from "../../types/Entities/sponsor";
import { GenericService } from "../genericService";

export class SponsorServiceClass extends GenericService<Sponsor, Sponsor> {
    constructor() {
        super(SPONSOR_ENDPOINT);
    }
}

export const SponsorService = new SponsorServiceClass();
