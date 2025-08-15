// services/CountService.ts
import { CategoryService } from './Entities/categoryService';
import { SponsorService } from './Entities/sponsorService';
import { LocationService } from './Entities/locationService';
import { TyTicketService } from './Entities/tyTicketService';

export class CountRegistersService {
    static async getCounts() {
        try {
            const [categories, sponsors, locations, tyTickets] = await Promise.all([
                CategoryService.getAll(),
                SponsorService.getAll(),
                LocationService.getAll(),
                TyTicketService.getAll()
            ]);

            return {
                categories: categories.length,
                sponsors: sponsors.length,
                locations: locations.length,
                tyTickets: tyTickets.length
            };
        } catch (error) {
            console.error('Error fetching counts:', error);
            return {
                categories: 0,
                sponsors: 0,
                locations: 0,
                tyTickets: 0
            };
        }
    }
}