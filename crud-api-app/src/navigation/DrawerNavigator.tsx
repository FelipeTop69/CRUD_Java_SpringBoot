import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import { DrawerParamList } from '../types/navigation';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, Image, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator<DrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.containerImgDrawer}>
                <Image source={require('../../assets/favicon.png')} style={styles.ImgDrawer} />
                <Text style={styles.TextImgDrawer}>
                    Bienvenido(a)
                </Text>
                <View style={styles.barSeparatorDrawer} />
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
            <Drawer.Screen
                name="Category"
                component={CategoryScreen}
                options={{
                    drawerLabel: 'Categoría',
                    title: 'Registros Categorías',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="grid" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    containerImgDrawer: {
        padding: 16, 
        alignItems: 'center'
    },
    ImgDrawer: {
        width: 100, 
        height: 100
    },
    TextImgDrawer: {
        marginTop: 8, 
        fontSize: 16, 
        fontWeight: '600'
    },
    barSeparatorDrawer: {
        marginTop: 16,
        height: 3,
        width: '100%',
        backgroundColor: '#ccc',
        borderRadius: 8
    },
});
