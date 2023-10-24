import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "./screens/InfoScreen/InfoScreen";
import AddScreen from "./screens/AddScreen/AddScreen";
import EditScreen from "./screens/EditScreen/EditScreen";
import Database from "./database/Database";
import { navigationBarColor } from "./resources/colors";

const Tab = createBottomTabNavigator();
const InfoStack = createStackNavigator();

export default function App() {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { height: 80 },
          tabBarStyle: { backgroundColor: navigationBarColor },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
        }}
      >
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Details" component={InfoStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const InfoStackScreen = () => {
  return (
    <InfoStack.Navigator>
      <InfoStack.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          headerShown: false,
        }}
      />
      <InfoStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: false,
        }}
      />
    </InfoStack.Navigator>
  );
};
