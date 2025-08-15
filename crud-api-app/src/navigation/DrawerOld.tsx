import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CategoryCreate from '../screens/Entities/Category/CategoryCreate';
import CategoryScreen from '../screens/Entities/Category/CategoryScreen';
import CategoryUpdate from '../screens/Entities/Category/CategoryUpdate';
import LocationCreate from '../screens/Entities/Location/LocationCreate';
import LocationScreen from '../screens/Entities/Location/LocationScreen';
import LocationUpdate from '../screens/Entities/Location/LocationUpdate';
import SponsorCreate from '../screens/Entities/Sponsor/SponsorCreate';
import SponsorScreen from '../screens/Entities/Sponsor/SponsorScreen';
import SponsorUpdate from '../screens/Entities/Sponsor/SponsorUpdate';
import TyTicketCreate from '../screens/Entities/TyTicket/TyTicketCreate';
import TyTicketScreen from '../screens/Entities/TyTicket/TyTicketScreen';
import TyTicketUpdate from '../screens/Entities/TyTicket/TyTicketUpdate';
import HomeScreen from '../screens/HomeScreen';
import { DrawerParamList } from '../types/navigation';
import OrganizerScreen from '../screens/Entities/Organizer/OrganizerScreen';
import OrganizerCreate from '../screens/Entities/Organizer/OrganizerCreate';
import OrganizerUpdate from '../screens/Entities/Organizer/OrganizerUpdate';
import ParticipantCreate from '../screens/Entities/Participant/ParticipantCreate';
import ParticipantScreen from '../screens/Entities/Participant/ParticipantScreen';
import ParticipantUpdate from '../screens/Entities/Participant/ParticipantUpdate';
import EventCreate from '../screens/Entities/Event/EventCreate';
import EventScreen from '../screens/Entities/Event/EventScreen';
import EventUpdate from '../screens/Entities/Event/EventUpdate';
import TicketCreate from '../screens/Entities/Ticket/TicketCreate';
import TicketScreen from '../screens/Entities/Ticket/TicketScreen';
import TicketUpdate from '../screens/Entities/Ticket/TicketUpdate';
import EvSponsorCreate from '../screens/Entities/EventSponsor/EvSponsorCreate';
import EvSponsorScreen from '../screens/Entities/EventSponsor/EvSponsorScreen';
import EvSponsorUpdate from '../screens/Entities/EventSponsor/EvSponsorUpdate';
import ParEventCreate from '../screens/Entities/ParticipantEvent/ParEventCreate';
import ParEventScreen from '../screens/Entities/ParticipantEvent/ParEventScreen';
import ParEventUpdate from '../screens/Entities/ParticipantEvent/ParEventUpdate';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props}>
            <View className="p-4 items-center">
                <Image source={require('../../assets/img/img-ico-event.png')} className='w-44 h-44' />
                <Text className="mt-2 text-base font-semibold">
                    Bienvenido(a)
                </Text>
                <View className='mt-4 h-1 w-full bg-gray-300 rounded-full' />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={CustomDrawerContent}
            screenOptions={{
                drawerActiveTintColor: 'blue',
                drawerHideStatusBarOnOpen: true,
                drawerItemStyle: {
                    marginVertical: 8,
                },
            }}

        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerLabel: 'Inicio',
                    title: 'Gestión de Eventos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            {/* Entidad Category */}
            <Drawer.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    drawerLabel: 'Categoría',
                    title: 'Categorías',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="grid-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="CategoryCreate"
                component={CategoryCreate}
                options={{
                    title: 'Registrar Categorias',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="CategoryUpdate"
                component={CategoryUpdate}
                options={{
                    title: 'Registrar Categorias',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad TyTicket */}
            <Drawer.Screen
                name="TyTicket"
                component={TyTicketScreen}
                options={{
                    drawerLabel: 'Tipo de Entrada',
                    title: 'Tipos de Entrada',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="pricetag-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="TyTicketCreate"
                component={TyTicketCreate}
                options={{
                    title: 'Registrar Tipo de Entrada',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="TyTicketUpdate"
                component={TyTicketUpdate}
                options={{
                    title: 'Actualizar Tipo de Entrada',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Sponsor */}
            <Drawer.Screen
                name="Sponsor"
                component={SponsorScreen}
                options={{
                    drawerLabel: 'Patrocinador',
                    title: 'Patrocinadores',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="SponsorCreate"
                component={SponsorCreate}
                options={{
                    title: 'Registrar Patrocinador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="SponsorUpdate"
                component={SponsorUpdate}
                options={{
                    title: 'Actualizar Patrocinador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Location */}
            <Drawer.Screen
                name="Location"
                component={LocationScreen}
                options={{
                    drawerLabel: 'Ubicación',
                    title: 'Ubicaciones',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="location-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="LocationCreate"
                component={LocationCreate}
                options={{
                    title: 'Registrar Ubicación',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="LocationUpdate"
                component={LocationUpdate}
                options={{
                    title: 'Actualizar Ubicación',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Organizer */}
            <Drawer.Screen
                name="Organizer"
                component={OrganizerScreen}
                options={{
                    drawerLabel: 'Organizador',
                    title: 'Organizadores',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="OrganizerCreate"
                component={OrganizerCreate}
                options={{
                    title: 'Registrar Organizador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="OrganizerUpdate"
                component={OrganizerUpdate}
                options={{
                    title: 'Actualizar Organizador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Participant */}
            <Drawer.Screen
                name="Participant"
                component={ParticipantScreen}
                options={{
                    drawerLabel: 'Participante',
                    title: 'Participantes',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="person-add-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="ParticipantCreate"
                component={ParticipantCreate}
                options={{
                    title: 'Registrar Participante',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="ParticipantUpdate"
                component={ParticipantUpdate}
                options={{
                    title: 'Actualizar Participante',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Event */}
            <Drawer.Screen
                name="Event"
                component={EventScreen}
                options={{
                    drawerLabel: 'Evento',
                    title: 'Eventos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="EventCreate"
                component={EventCreate}
                options={{
                    title: 'Registrar Evento',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="EventUpdate"
                component={EventUpdate}
                options={{
                    title: 'Actualizar Evento',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad Ticket */}
            <Drawer.Screen
                name="Ticket"
                component={TicketScreen}
                options={{
                    drawerLabel: 'Entrada',
                    title: 'Entradas',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="ticket-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="TicketCreate"
                component={TicketCreate}
                options={{
                    title: 'Registrar Entrada',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="TicketUpdate"
                component={TicketUpdate}
                options={{
                    title: 'Actualizar Entrada',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad EvSponsor */}
            <Drawer.Screen
                name="EventSponsor"
                component={EvSponsorScreen}
                options={{
                    drawerLabel: 'EvPatrocinador',
                    title: 'EvPatrocinadores',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="apps-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="EventSponsorCreate"
                component={EvSponsorCreate}
                options={{
                    title: 'Registrar EvPatrocinador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="EventSponsorUpdate"
                component={EvSponsorUpdate}
                options={{
                    title: 'Actualizar EvPatrocinador',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            {/* Entidad ParEvent */}
            <Drawer.Screen
                name="ParticipantEvent"
                component={ParEventScreen}
                options={{
                    drawerLabel: 'ParEvento',
                    title: 'ParEventos',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="apps-outline" size={size} color={color} />
                    ),
                }}
            />

            <Drawer.Screen
                name="ParticipantEventCreate"
                component={ParEventCreate}
                options={{
                    title: 'Registrar ParEvento',
                    drawerItemStyle: { display: 'none' },
                }}
            />

            <Drawer.Screen
                name="ParticipantEventUpdate"
                component={ParEventUpdate}
                options={{
                    title: 'Actualizar ParEvento',
                    drawerItemStyle: { display: 'none' },
                }}
            />
        </Drawer.Navigator>
    );
}