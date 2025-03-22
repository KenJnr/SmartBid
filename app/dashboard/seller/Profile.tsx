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
        <ExpoStatusBar style="auto" />
        {/* Top section */}
        <View style={styles.top}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Avatar.Image size={80} source={require("@/assets/images/me.jpg")} />
            <Title style={styles.username}>ijforkuo</Title>
            <Text style={styles.email}>ignatus373@email.com</Text>
          </View>
        </View>
      
        {/* Footer section */}
        <View style={styles.footer}>
            {/* Profile Settings */}
            <Card style={styles.card}>
              <List.Item 
              title="Edit Profile" 
              titleStyle={styles.cardText}
              left={() => <Ionicons name="person-circle-outline" size={24} color="#ff7d00"/>} 
              right={() => <AntDesign name="right" size={24} color="#999" />}
              />
              <Divider style={{ backgroundColor: "#3A5A73" }}/>

              <List.Item 
              title="Change Password" 
              titleStyle={styles.cardText}
              left={() => <Ionicons name="key-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />}
              />
              <Divider style={{ backgroundColor: "#3A5A73" }}/>

              <List.Item 
              title="My Listings" 
              titleStyle={styles.cardText}
              left={() => <Ionicons name="albums-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />
              <Divider style={{ backgroundColor: "#3A5A73" }}/>

              <List.Item 
              title="My Bids"
              titleStyle={styles.cardText}
              left={() => <MaterialCommunityIcons name="gavel" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />
              <Divider style={{ backgroundColor: "#3A5A73" }}/>

              <List.Item 
              title="Wishlist" 
              titleStyle={styles.cardText}
              left={() => <Ionicons name="heart-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />

            </Card>

            {/* Dark Mode Toggle */}
            <Card style={styles.card}>
              <View style={styles.themeCard}>
                  <View style={styles.themeCardLeft}>
                  <Ionicons name="moon-outline" size={24} color="#ff7d00" />
                  <Title style={{fontSize: 16, color: "#fff"}}>Dark Mode</Title>
                  </View>

                  <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} /> 
              </View>
              
            </Card>

            {/* Logout Button*/}
            <TouchableOpacity style={styles.logoutButton} onPress={() => {signOut(); router.replace("/(auth)/login")}}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor: "#103957" },
  top: {
    backgroundColor: "#001524",
    padding: 20
  },
  profileHeader: { 
    alignItems: "center", 
    marginBottom: 50, 
    marginTop: 40
  },
  username: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginTop: 16, 
    marginBottom: 4,
    color: "#fff"
  },
  email: { 
    fontSize: 14, 
    color: "#D1E8FF" 
  },
  footer: {
    flex: 1,
    backgroundColor: "#103957",
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    position: "absolute",
    top: 250,
    width: "100%",
  },
  card: { marginTop: 20,marginBottom: 20, padding: 10, backgroundColor: "#1B4B66", },
  cardText:{
    color: "#fff"
  },
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
    backgroundColor: "#ff7d00",
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
