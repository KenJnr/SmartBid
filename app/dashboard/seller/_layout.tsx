import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./Home";
import BiddingScreen from "./Bidding";
import ListingsScreen from "./Listings";
import ProfileScreen from "./Profile";

const Tab = createBottomTabNavigator();


export default function BuyerDashboardLayout() {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="biddings"
          component={BiddingScreen}
          options={{
            tabBarLabel: "Biddings",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="shopping-bag" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }