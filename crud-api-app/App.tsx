// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import { DrawerParamList } from './src/types/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons'
import { View, Image } from 'react-native';


// Ejemplo en un componente
const Drawer = createDrawerNavigator<DrawerParamList>();

// Configuracion para adiccion de ruta actual en web
const linking = {
  prefixes: ['http://localhost:8081',], 
  config: {
    screens: {
      Home: '',
      Category: 'categoria',
    },
  },
};

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Image source={require('./assets/favicon.png')} style={{ width: 100, height: 100 }} />

        {/* Barra separadora con bordes redondos */}
        <View style={{
          marginTop: 16,
          height: 4, 
          width: '100%',
          backgroundColor: '#ccc',
          borderRadius: 8
        }} />
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Drawer.Navigator 
          initialRouteName="Home"
          drawerContent={CustomDrawerContent}
          screenOptions={{
            drawerActiveTintColor: 'red',
            drawerHideStatusBarOnOpen: true,
            drawerItemStyle:{
              marginVertical: 4
            }
          }}
          
        >
          
          <Drawer.Screen name="Home" component={HomeScreen} options={{
            drawerLabel: 'Inicio',
            title: 'Gestíon de Eventos',
            drawerIcon: ({color, size}) => (
              <Ionicons name='home' size={size} color={color}/>
            ),
            
          }}/>
          <Drawer.Screen name="Category" component={CategoryScreen} options={{
            drawerLabel: 'Categoría',
            title: 'Registros Categorías',
            drawerIcon: ({color, size}) => (
              <Ionicons name='grid' size={size} color={color}/>
            ),
          }}/>
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
