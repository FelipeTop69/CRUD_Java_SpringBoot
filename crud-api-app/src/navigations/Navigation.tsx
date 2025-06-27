import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//import screens
import BookListScreen from "../screens/BookList";
import BookRegisterScreen from "../screens/BookRegisterScreen";
import BookUpdateScreen from "../screens/BookUpdateScreen";

//import icon
import AntDesign from "@expo/vector-icons/AntDesign";

//import stack
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BookStackNavigator = createNativeStackNavigator();

function MyStack() {
  return (
    <BookStackNavigator.Navigator initialRouteName="BookList">
      <BookStackNavigator.Screen name="BookList" component={BookListScreen} />
      <BookStackNavigator.Screen name="BookRegister" component={BookRegisterScreen} />
      <BookStackNavigator.Screen name="BookUpdate" component={BookUpdateScreen} />
    </BookStackNavigator.Navigator>
  );
}

//instance for createBottomTabNavigator
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="BookList"
      screenOptions={{ tabBarActiveTintColor: "purple" }}
    >
      <Tab.Screen
        name="BookList"
        component={MyStack}
        options={{
          tabBarLabel: "List",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
          tabBarBadge: 5,
        }}
      />
      <Tab.Screen
        name="BookRegister"
        component={BookListScreen}
        options={{
          tabBarLabel: "BookRegister",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
