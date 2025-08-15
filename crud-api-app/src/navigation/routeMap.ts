import type { DrawerParamList } from '../types/navigation';

export const routeMap = {
    categorynav: 'Category',
    tyticketnav: 'TyTicket', 
} as const satisfies Record<string, keyof DrawerParamList>;

// Tipo derivado para autocompletado y seguridad
export type RouteMapKey = keyof typeof routeMap;
