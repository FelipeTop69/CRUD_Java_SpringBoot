import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import { DrawerParamList } from '../types/navigation';
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

export type Category = {
    label: string;
    icon: IoniconsName;
    entities: (keyof typeof ENTITY_CONFIG)[];
};

export const CATEGORIES: Category[] = [
    {
        label: "Configuración",
        icon: "construct-outline",
        entities: ["Category", "TyTicket", "Location"],
    },
    {
        label: "Personal",
        icon: "man-outline",
        entities: ["Sponsor", "Organizer", "Participant"],
    },
    {
        label: "Logística",
        icon: "dice-outline",
        entities: ["Event", "Ticket", "EventSponsor", "ParticipantEvent"],
    },
];

type ScreenConfig = {
    component: React.ComponentType<any>;
    title?: string;
};

type EntityConfig = {
    label: string;
    icon: IoniconsName;
    screens: {
        list: ScreenConfig;
        create: ScreenConfig;
        update: ScreenConfig;
    };
};

const ENTITY_CONFIG: Record<string, EntityConfig> = {
    Category: {
        label: 'Categoría',
        icon: 'grid-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Category/CategoryScreen')),
                title: 'Categorías'
            },
            create: {
                component: CategoryCreate,
                title: 'Registrar Categoría'
            },
            update: {
                component: CategoryUpdate,
                title: 'Actualizar Categoría'
            }
        },
    },
    TyTicket: {
        label: 'Tipo de Entrada',
        icon: 'pricetag-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketScreen')),
                title: 'Tipo de Entradas'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketCreate')),
                title: 'Registrar Entrada'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketUpdate')),
                title: 'Actualizar Entrada'
            }
        },
    },
    Sponsor: {
        label: 'Patrocinador',
        icon: 'people-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorScreen')),
                title: 'Patrocinadores'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorCreate')),
                title: 'Registrar Patrocinador'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorUpdate')),
                title: 'Actualizar Patrocinador'
            }
        },
    },
    Location: {
        label: 'Ubicación',
        icon: 'location-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationScreen')),
                title: 'Ubicaciones'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationCreate')),
                title: 'Registrar Ubicación'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationUpdate')),
                title: 'Actualizar Ubicación'
            }
        },
    },
    Organizer: {
        label: 'Organizador',
        icon: 'person-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerScreen')),
                title: 'Organizadores'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerCreate')),
                title: 'Registrar Organizador'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerUpdate')),
                title: 'Actualizar Organizador'
            }
        },
    },
    Participant: {
        label: 'Participante',
        icon: 'person-add-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantScreen')),
                title: 'Participantes'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantCreate')),
                title: 'Registrar Participante'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantUpdate')),
                title: 'Actualizar Participante'
            },
        },
    },
    Event: {
        label: 'Evento',
        icon: 'calendar-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Event/EventScreen')),
                title: 'Eventos'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Event/EventCreate')),
                title: 'Registrar Evento'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Event/EventUpdate')),
                title: 'Actualizar Evento'
            }
        },
    },
    Ticket: {
        label: 'Entrada',
        icon: 'ticket-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketScreen')),
                title: 'Entradas'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketCreate')),
                title: 'Registrar Entrada'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketUpdate')),
                title: 'Actualizar Entrada'
            }
        },
    },
    EventSponsor: {
        label: 'EventoPatrocinador',
        icon: 'apps-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorScreen')),
                title: 'EventoPatrocinadores'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorCreate')),
                title: 'Registrar EventoPratocinador'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorUpdate')),
                title: 'Actualizar EventoPratocinador'
            },
        },
    },
    ParticipantEvent: {
        label: 'ParticipanteEvento',
        icon: 'apps-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventScreen')),
                title: 'ParticipantesEventos'
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventCreate')),
                title: 'Registrar ParticipanteEvento'
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventUpdate')),
                title: 'Actualizar ParticipanteEvento'
            },
        },
    }
};

// Estilos globales
const DRAWER_SCREEN_OPTIONS = {
    drawerActiveTintColor: 'blue',
    drawerHideStatusBarOnOpen: true,
    drawerItemStyle: {
        marginVertical: 4,
        borderRadius: 8,
    },
    drawerLabelStyle: {
        marginLeft: -16,
    },
};

import { useNavigationState } from '@react-navigation/native';
import CategoryCreate from '../screens/Entities/Category/CategoryCreate';
import CategoryUpdate from '../screens/Entities/Category/CategoryUpdate';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const [expandedCategories, setExpandedCategories] = React.useState<Record<string, boolean>>({});
    const navigationState = useNavigationState(state => state);
    const currentRoute = navigationState.routes[navigationState.index].name;

    const toggleCategory = (categoryLabel: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryLabel]: !prev[categoryLabel]
        }));
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
            {/* Encabezado con imagen */}
            <View className="p-4 items-center bg-white border-b-4 border-blue-100">
                <Image 
                    source={require('../../assets/img/img-ico-event.png')} 
                    className="w-52 h-52 rounded-full"
                    resizeMode="contain"
                />
                <Text className="text-lg font-semibold text-gray-800">
                    Bienvenido(a)
                </Text>
            </View>

            {/* Botón Home */}
            <DrawerItem
                label="Inicio"
                icon={({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                )}
                onPress={() => props.navigation.navigate('Home')}
                focused={currentRoute === 'Home'}
                activeBackgroundColor="rgba(59, 130, 246, 0.1)"
                activeTintColor="#2563eb"
                style={{ marginTop: 16, marginBottom: 16 }}
            />

            {/* Línea divisora */}
            <View className="mx-4 my-2 h-px bg-gray-400" />

            {/* Categorías con acordeón */}
            {CATEGORIES.map((category) => {
                const isCategoryActive = category.entities.some(
                    entityName => entityName === currentRoute
                );

                return (
                    <View key={category.label}>
                        <DrawerItem
                            label={category.label}
                            icon={({ color, size }) => (
                                <View className="flex-row items-center">
                                    <Ionicons 
                                        name={category.icon} 
                                        size={size} 
                                        color={isCategoryActive ? '#2563eb' : color} 
                                    />
                                    <Ionicons
                                        name={expandedCategories[category.label] ? "chevron-down" : "chevron-forward"}
                                        size={20}
                                        color={isCategoryActive ? '#2563eb' : '#6b7280'}
                                        style={{ marginLeft: 'auto' }}
                                    />
                                </View>
                            )}
                            onPress={() => toggleCategory(category.label)}
                            focused={isCategoryActive}
                            activeBackgroundColor="rgba(59, 130, 246, 0.1)"
                            activeTintColor="#2563eb"
                            style={{marginBottom: 4}}
                        />

                        {expandedCategories[category.label] && category.entities.map((entityName) => {
                            const entity = ENTITY_CONFIG[entityName];
                            if (!entity) return null;

                            const isActive = currentRoute === entityName;
                            
                            return (
                                <DrawerItem
                                    key={entityName}
                                    label={entity.label}
                                    icon={({ color, size }) => (
                                        <Ionicons 
                                            name={entity.icon} 
                                            size={size} 
                                            color={isActive ? '#2563eb' : color} 
                                        />
                                    )}
                                    onPress={() => props.navigation.navigate(entityName)}
                                    style={{ marginLeft: 20 }}
                                    focused={isActive}
                                    activeBackgroundColor="rgba(59, 130, 246, 0.1)"
                                    activeTintColor="#2563eb"
                                />
                            );
                        })}
                        <View className="mx-4 my-2 h-px bg-gray-400" />
                    </View>
                );
            })}
        </DrawerContentScrollView>
    );
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const withSuspense = (Component: React.ComponentType) => (props: any) => (
    <React.Suspense fallback={<View className="flex-1 justify-center items-center"><ActivityIndicator /></View>}>
        <Component {...props} />
    </React.Suspense>
);

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={CustomDrawerContent}
            screenOptions={DRAWER_SCREEN_OPTIONS}
        >
            {/* Pantalla Home */}
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerLabel: 'Inicio',
                    title: 'Gestión de Eventos',
                    drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
                }}
            />

            {/* 🔥 AQUÍ ESTÁ LA SOLUCIÓN: Registrar todas las pantallas de las entidades */}
            {Object.entries(ENTITY_CONFIG).map(([entityName, config]) => {
                const ListComponent = withSuspense(config.screens.list.component);
                const CreateComponent = withSuspense(config.screens.create.component);
                const UpdateComponent = withSuspense(config.screens.update.component);

                return (
                    <React.Fragment key={entityName}>
                        {/* Pantalla de Lista */}
                        <Drawer.Screen
                            name={entityName as keyof DrawerParamList}
                            component={ListComponent}
                            options={{
                                title: config.screens.list.title || config.label,
                                drawerItemStyle: { height: 0 }, // Ocultar del drawer ya que se maneja en CustomDrawerContent
                            }}
                        />

                        {/* Pantalla de Crear */}
                        <Drawer.Screen
                            name={`${entityName}Create` as keyof DrawerParamList}
                            component={CreateComponent}
                            options={{
                                title: config.screens.create.title || `Crear ${config.label}`,
                                drawerItemStyle: { height: 0 }, // Ocultar del drawer
                            }}
                        />

                        {/* Pantalla de Actualizar */}
                        <Drawer.Screen
                            name={`${entityName}Update` as keyof DrawerParamList}
                            component={UpdateComponent}
                            options={{
                                title: config.screens.update.title || `Actualizar ${config.label}`,
                                drawerItemStyle: { height: 0 }, // Ocultar del drawer
                            }}
                        />
                    </React.Fragment>
                );
            })}
        </Drawer.Navigator>
    );
}