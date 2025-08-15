import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';


type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

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
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Category/CategoryCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Category/CategoryUpdate')),
                title: ''
            }
        },
    },
    TyTicket: {
        label: 'Tipo de Entrada',
        icon: 'pricetag-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/TyTicket/TyTicketUpdate')),
                title: ''
            }
        },
    },
    Location: {
        label: 'Ubicación',
        icon: 'location-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Location/LocationUpdate')),
                title: ''
            }
        },
    },
    Sponsor: {
        label: 'Patrocinador',
        icon: 'people',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Sponsor/SponsorUpdate')),
                title: ''
            }
        },
    },
    Organizer: {
        label: 'Organizador',
        icon: 'person-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Organizer/OrganizerUpdate')),
                title: ''
            }
        },
    },
    Participant: {
        label: 'Participante',
        icon: 'person-add-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Participant/ParticipantUpdate')),
                title: ''
            },
        },
    },
    Event: {
        label: 'Evento',
        icon: 'calendar-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Event/EventScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Event/EventCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Event/EventUpdate')),
                title: ''
            }
        },
    },
    Ticket: {
        label: 'Entrada',
        icon: 'ticket-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/Ticket/TicketUpdate')),
                title: ''
            }
        },
    },
    EventSponsor: {
        label: 'EvPatrocinador',
        icon: 'apps-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/EventSponsor/EvSponsorUpdate')),
                title: ''
            },
        },
    },
    ParticipantEnvent: {
        label: 'ParEvento',
        icon: 'apps-outline',
        screens: {
            list: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventScreen')),
                title: ''
            },
            create: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventCreate')),
                title: ''
            },
            update: {
                component: React.lazy(() => import('../screens/Entities/ParticipantEvent/ParEventUpdate')),
                title: ''
            },
        },
    }
};

const DRAWER_SCREEN_OPTIONS = {
    drawerActiveTintColor: 'blue',
    drawerHideStatusBarOnOpen: true,
    drawerItemStyle: { marginVertical: 8 },
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => (
    <DrawerContentScrollView {...props}>
        <View className="p-4 items-center">
            <Image source={require('../../assets/img/img-ico-event.png')} className="w-44 h-44" />
            <Text className="mt-2 text-base font-semibold">Bienvenido(a)</Text>
            <View className="mt-4 h-1 w-full bg-gray-300 rounded-full" />
        </View>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
);

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

            {/* Mapeo dinamico de entidades */}
            {Object.entries(ENTITY_CONFIG).map(([entityName, config]) => (
                <React.Fragment key={entityName}>
                    {/* Pantalla de Listado */}
                    <Drawer.Screen
                        name={entityName as keyof DrawerParamList}
                        component={withSuspense(config.screens.list.component)}
                        options={{
                            drawerLabel: config.label,
                            title: config.screens.list.title || `${config.label}s`, // 👈 Título personalizado o por defecto (ej: "Participantes")
                            drawerIcon: ({ color, size }) => (
                                <Ionicons name={config.icon} size={size} color={color} />
                            ),
                        }}
                    />

                    {/* Pantallas Create/Update */}
                    <Drawer.Screen
                        name={`${entityName}Create` as keyof DrawerParamList}
                        component={withSuspense(config.screens.create.component)}
                        options={{
                            title: config.screens.create.title || `Crear ${config.label}`, // 👈 Título personalizado o por defecto
                            drawerItemStyle: { display: 'none' },
                        }}
                    />
                    <Drawer.Screen
                        name={`${entityName}Update` as keyof DrawerParamList}
                        component={withSuspense(config.screens.update.component)}
                        options={{
                            title: config.screens.update.title || `Editar ${config.label}`, // 👈 Título personalizado o por defecto
                            drawerItemStyle: { display: 'none' },
                        }}
                    />
                </React.Fragment>
            ))}
        </Drawer.Navigator>
    );
}