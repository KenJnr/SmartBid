import React from "react";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./Home";
import BiddingScreen from "./Bidding";
import OrdersScreen from "./Orders";
import ProfileScreen from "./Profile";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();


export default function BuyerDashboardLayout() {
    return (
      <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#eee",
            height: 60,
          }, 
        }}
        >
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text
                style={{
                  fontSize: focused ? 16 : 12,
                  fontWeight: "bold",
                  color: focused ? "#4579EE" : "#666",
                }}
              >
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="home"
                size={focused ? size + 4 : size} // Increase size when focused
                color={focused ? "#4579EE" : color} // Change color when focused
              />
            ),
          }}
        />
        <Tab.Screen
          name="orders"
          component={OrdersScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: focused ? 16 : 12, fontWeight: "bold", color: focused ? "#4579EE" : "#666" }}>
                Orders
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome5
                name="shopping-bag"
                size={focused ? size + 4 : size} // Increase size when focused
                color={focused ? "#4579EE" : color} // Change color when focused
              />
            ),
          }}
        />
        <Tab.Screen
          name="biddings"
          component={BiddingScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: focused ? 16 : 12, fontWeight: "bold", color: focused ? "#4579EE" : "#666" }}>
                Biddings
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome5
                name="gavel"
                size={focused ? size + 4 : size}
                color={focused ? "#4579EE" : color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ fontSize: focused ? 16 : 12, fontWeight: "bold", color: focused ? "#4579EE" : "#666" }}>
                Profile
              </Text>
            ),
            tabBarIcon: ({ color, size, focused }) => (
              <AntDesign
                name="user"
                size={focused ? size + 4 : size}
                color={focused ? "#4579EE" : color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  