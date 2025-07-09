import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import "./global.css"
import CategoryUpdate from './src/screens/Entities/Category/CategoryUpdate';

// Configuracion para adiccion de ruta actual en web
const linking = {
  prefixes: ['http://localhost:8081',], 
  config: {
    screens: {
      Home: '',
      Category: 'categoria',
      CategoryUpdate: 'categoria/update',
    },
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}