import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Card, Title, Text, List, Switch, Button, Divider } from "react-native-paper";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function ProfileScreen() {
  const [darkMode, setDarkMode] = React.useState(false);
  const router = useRouter();
  const {signOut} = useAuth();
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <ExpoStatusBar style="dark" />
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Avatar.Image size={80} source={require("@/assets/images/me.jpg")} />
        <Title style={styles.username}>ijforkuo</Title>
        <Text style={styles.email}>ignatus373@email.com</Text>
      </View>

      {/* Profile Settings */}
      <Card style={styles.card}>
        <List.Item 
        title="Edit Profile" 
        left={() => <Ionicons name="person-circle-outline" size={24} color="#2196f3"/>} 
        right={() => <AntDesign name="right" size={24} color="#999" />}
        />
        <Divider/>

        <List.Item 
        title="Change Password" 
        left={() => <Ionicons name="key-outline" size={24} color="#2196f3"/>}
        right={() => <AntDesign name="right" size={24} color="#999" />}
        />
        <Divider/>

        <List.Item 
        title="My Listings" 
        left={() => <Ionicons name="albums-outline" size={24} color="#2196f3"/>}
        right={() => <AntDesign name="right" size={24} color="#999" />} 
        />
        <Divider/>

        <List.Item 
        title="My Bids" 
        left={() => <MaterialCommunityIcons name="gavel" size={24} color="#2196f3"/>}
        right={() => <AntDesign name="right" size={24} color="#999" />} 
        />
        <Divider/>

        <List.Item 
        title="Wishlist" 
        left={() => <Ionicons name="heart-outline" size={24} color="#2196f3"/>}
        right={() => <AntDesign name="right" size={24} color="#999" />} 
        />

      </Card>

      {/* Dark Mode Toggle */}
      <Card style={styles.card}>
        <View style={styles.themeCard}>
            <View style={styles.themeCardLeft}>
            <Ionicons name="moon-outline" size={24} />
            <Title style={{fontSize: 16, color: "#333"}}>Dark Mode</Title>
            </View>

            <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} /> 
        </View>
        
      </Card>

      {/* Logout Button*/}
      <TouchableOpacity style={styles.logoutButton} onPress={() => {signOut(); router.replace("/(auth)/login")}}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding: 16,backgroundColor: "#fff" },
  profileHeader: { alignItems: "center", marginBottom: 30, marginTop: 40},
  username: { fontSize: 22, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  email: { fontSize: 14, color: "gray" },
  card: { marginBottom: 20, padding: 10, backgroundColor: "#fff" },
  themeCard: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  themeCardLeft:{
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  logoutButton: { 
    backgroundColor: "#4579EE",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        marginTop: 20
      },
      buttonText: {
        fontFamily: "Poppins",
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
});
