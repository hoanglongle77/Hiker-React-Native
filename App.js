import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InfoScreen from "./screens/InfoScreen/InfoScreen";
import AddScreen from "./screens/AddScreen/AddScreen";
import Database from "./database/Database";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    Database.initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Details" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
