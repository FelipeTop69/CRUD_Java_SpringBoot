import { CategoryService } from './Entities/categoryService';
import { EventService } from './Entities/eventService';
import { EventSponsorService } from './Entities/eventsponsorService';
import { LocationService } from './Entities/locationService';
import { OrganizerService } from './Entities/organizerService';
import { ParticipantEventService } from './Entities/participanteventService';
import { ParticipantService } from './Entities/participantService';
import { SponsorService } from './Entities/sponsorService';
import { TicketService } from './Entities/ticketService';
import { TyTicketService } from './Entities/tyTicketService';

export class CountRegistersService {
    static async getCounts() {
        try {
            const [categories, sponsors, locations, tyTickets, organizers, participants, events, tickets, eventSponsors, participantEvents,] = await Promise.all([
                CategoryService.getAll(),
                SponsorService.getAll(),
                LocationService.getAll(),
                TyTicketService.getAll(),
                OrganizerService.getAll(),
                ParticipantService.getAll(),
                EventService.getAll(),
                TicketService.getAll(),
                EventSponsorService.getAll(),
                ParticipantEventService.getAll()
            ]);

            return {
                categories: categories.length,
                sponsors: sponsors.length,
                locations: locations.length,
                tyTickets: tyTickets.length,
                organizers: organizers.length,
                participants: participants.length,
                events: events.length,
                tickets: tickets.length,
                eventSponsors: eventSponsors.length,
                participantEvents: participantEvents.length,
            };
        } catch (error) {
            console.error('Error fetching counts:', error);
            return {
                categories: 0,
                sponsors: 0,
                locations: 0,
                tyTickets: 0,
                organizers: 0,
                participants: 0,
                events: 0,
                tickets: 0,
                eventSponsors: 0,
                participantEvents: 0,
            };
        }
    }
}