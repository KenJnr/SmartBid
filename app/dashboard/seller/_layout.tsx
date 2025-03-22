import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./Home";
import BiddingScreen from "./Bidding";
import ListingsScreen from "./Listings";
import ProfileScreen from "./Profile";

const Tab = createBottomTabNavigator();

export default function BuyerDashboardLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#001524",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#FF7D00",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={[styles.labelContainer, focused && styles.focusedLabel]}>
              <Text style={[styles.labelText, focused && styles.focusedLabelText]}>Home</Text>
            </View>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="home" size={size} color={focused ? "#FF7D00" : color} />
          ),
        }}
      />
      <Tab.Screen
        name="biddings"
        component={BiddingScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={[styles.labelContainer, focused && styles.focusedLabel]}>
              <Text style={[styles.labelText, focused && styles.focusedLabelText]}>Biddings</Text>
            </View>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5 name="shopping-bag" size={size} color={focused ? "#FF7D00" : color} />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={[styles.labelContainer, focused && styles.focusedLabel]}>
              <Text style={[styles.labelText, focused && styles.focusedLabelText]}>Profile</Text>
            </View>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <AntDesign name="user" size={size} color={focused ? "#FF7D00" : color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: "#333",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },
  focusedLabel: {
    backgroundColor: "#FF7D00",
  },
  labelText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ccc",
  },
  focusedLabelText: {
    color: "#fff",
  }
});
