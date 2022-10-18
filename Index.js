import React from "react";

import { useAuth } from "./context/AuthContext";
import AuthScreen from "./screens/AuthScreen";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TopTracks from "./screens/TopTracks";
import TopArtists from "./screens/TopArtists";

import {Ionicons, Entypo, FontAwesome5  } from "@expo/vector-icons";

const Index = () => {
  const { accessToken } = useAuth();
  const Tab = createBottomTabNavigator();

  if (accessToken) {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="TopTracks"
          component={TopTracks}
          options={{
            title: 'Your top Tracks',
            tabBarLabel: "Top Tracks",
            tabBarIcon: ({ color, size }) => (
                <Entypo name="folder-music" color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name="TopArtists"
          component={TopArtists}
          options={{
            title: 'Your top Artists',
            tabBarLabel: "Top Artists",
            tabBarIcon: ({ color, size }) => (
                <FontAwesome5 name="guitar" color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    );
  } else {
    return <AuthScreen></AuthScreen>;
  }
};

export default Index;
