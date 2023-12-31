import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "./screens/InfoScreen/InfoScreen";
import AddScreen from "./screens/AddScreen/AddScreen";
import EditScreen from "./screens/EditScreen/EditScreen";
import Database from "./database/Database";
import { navigationBarColor } from "./resources/colors";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

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
          headerStyle: { height: 70 },
          tabBarStyle: { backgroundColor: navigationBarColor },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
        }}
      >
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarLabel: "Add",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                name="add-circle-outline"
                size={size}
                color={color}
              />
            ),
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name="Details"
          component={InfoStackScreen}
          options={{
            tabBarLabel: "Details",
            tabBarIcon: ({ color, size }) => (
              <>
                <FontAwesome name="list-alt" size={size} color={color} />
              </>
            ),
            headerShown: false,
          }}
        />
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
          headerShown: true,
          headerTitle: "Details",
          headerTitleAlign: "center",
        }}
      />
      <InfoStack.Screen
        name="EditScreen"
        component={EditScreen}
        options={{
          headerShown: true,
          headerTitle: "Edit",
          headerTitleAlign: "center",
        }}
      />
    </InfoStack.Navigator>
  );
};
