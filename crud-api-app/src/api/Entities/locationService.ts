import { LOCATION_ENDPOINT } from "../../constants/api";
import { Location } from "../../types/Entities/location";
import { GenericService } from "../genericService";

export class LocationServiceClass extends GenericService<Location, Location> {
    constructor() {
        super(LOCATION_ENDPOINT);
    }
}

export const LocationService = new LocationServiceClass();
