import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import InfoScreen from "./screens/InfoScreen/InfoScreen";
import AddScreen from "./screens/AddScreen/AddScreen";
import { black, primaryColor } from "./resources/colors";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Add" component={AddScreen} />
        <Tab.Screen name="Details" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
