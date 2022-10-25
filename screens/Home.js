import { StyleSheet } from "react-native";
import React from "react";
import RecentlyPlayed from "../components/RecentlyPlayed";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const Home = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name="Profile" component={Profile}></Stack.Screen>
      <Stack.Screen
        name="RecentlyPlayed"
        component={RecentlyPlayed}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
