import type { DrawerParamList } from '../types/navigation';

export const routeMap = {
    categorynav: 'Category',
    tyticketnav: 'TyTicket', 
    sponsornav: 'Sponsor', 
    locationnav: 'Location', 
} as const satisfies Record<string, keyof DrawerParamList>;

// Tipo derivado para autocompletado y seguridad
export type RouteMapKey = keyof typeof routeMap;
