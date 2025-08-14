import type { DrawerParamList } from '../types/navigation';

export const routeMap: Record<string, keyof DrawerParamList> = {
    inicioNav: 'Home',
    categorynav: 'Category',
    tyticketnav: 'TyTicket',
};
