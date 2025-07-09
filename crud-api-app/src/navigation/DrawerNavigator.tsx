import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { Image, Text, View } from 'react-native';
import CategoryScreen from '../screens/Entities/Category/CategoryScreen';
import HomeScreen from '../screens/HomeScreen';
import { DrawerParamList } from '../types/navigation';
import CategoryCreate from '../screens/Entities/Category/CategoryCreate';

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

            {/* Entiadad Categoria */}
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
        </Drawer.Navigator>
    );
}