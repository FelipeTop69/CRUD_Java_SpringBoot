import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CategoryCreate from '../screens/Entities/Category/CategoryCreate';
import CategoryScreen from '../screens/Entities/Category/CategoryScreen';
import CategoryUpdate from '../screens/Entities/Category/CategoryUpdate';
import TyTicketCreate from '../screens/Entities/TyTicket/TyTicketCreate';
import TyTicketScreen from '../screens/Entities/TyTicket/TyTicketScreen';
import TyTicketUpdate from '../screens/Entities/TyTicket/TyTicketUpdate';
import HomeScreen from '../screens/HomeScreen';
import { DrawerParamList } from '../types/navigation';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props}>
            <View className="p-4 items-center">
                <Image source={require('../../assets/favicon.png')} className='w-24 h-24' />
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
                drawerActiveTintColor: 'red',
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
                        <Ionicons name="home" size={size} color={color} />
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
                        <Ionicons name="grid" size={size} color={color} />
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
                        <Ionicons name="grid" size={size} color={color} />
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
        </Drawer.Navigator>
    );
}