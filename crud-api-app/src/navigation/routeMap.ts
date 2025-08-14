import type { DrawerParamList } from '../types/navigation';

export const routeMap: Record<string, keyof DrawerParamList> = {
    inicio: 'Home',
    categorias: 'Category',
};
