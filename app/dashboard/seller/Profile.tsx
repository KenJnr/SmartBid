import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import { Avatar, Card, Title, Text, List, Switch, Button, Divider } from "react-native-paper";
import { AntDesign, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { darkTheme } from "@/src/utils/theme";

export default function ProfileScreen( ) {
  const {theme, toggleTheme} = useTheme();
  const router = useRouter();
  const {signOut} = useAuth();
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <ExpoStatusBar style="auto" />
        {/* Top section */}
        <View style={{ backgroundColor: theme.colors.secondary, padding: 20}}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Avatar.Image size={80} source={require("@/assets/images/me.jpg")} />
            <Title style={[styles.username, {color: theme.colors.Title}]}>ijforkuo</Title>
            <Text style={{color: theme.colors.subTitle, fontSize: 14}}>ignatus373@email.com</Text>
          </View>
        </View>
      
        {/* Footer section */}
        <View style={[styles.footer, {backgroundColor: theme.colors.background}]}>
            {/* Profile Settings */}
            <Card style={[styles.card, {backgroundColor: theme.colors.card}]}>
              <List.Item 
              title="Edit Profile" 
              titleStyle={[styles.cardText, {color: theme.colors.text}]}
              left={() => <Ionicons name="person-circle-outline" size={24} color="#ff7d00"/>} 
              right={() => <AntDesign name="right" size={24} color="#999" />}
              />
              <Divider style={{ backgroundColor: theme.colors.divider }}/>

              <List.Item 
              title="Change Password" 
              titleStyle={[styles.cardText, {color: theme.colors.text}]}
              left={() => <Ionicons name="key-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />}
              />
              <Divider style={{ backgroundColor: theme.colors.divider }}/>

              <List.Item 
              title="My Listings" 
              titleStyle={[styles.cardText, {color: theme.colors.text}]}
              left={() => <Ionicons name="albums-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />
              <Divider style={{ backgroundColor: theme.colors.divider }}/>

              <List.Item 
              title="My Bids"
              titleStyle={[styles.cardText, {color: theme.colors.text}]}
              left={() => <MaterialCommunityIcons name="gavel" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />
              <Divider style={{ backgroundColor: theme.colors.divider }}/>

              <List.Item 
              title="Wishlist" 
              titleStyle={[styles.cardText, {color: theme.colors.text}]}
              left={() => <Ionicons name="heart-outline" size={24} color="#ff7d00"/>}
              right={() => <AntDesign name="right" size={24} color="#999" />} 
              />

            </Card>

            {/* Dark Mode Toggle */}
            <Card style={[styles.card, {backgroundColor: theme.colors.card}]}>
              <View style={styles.themeCard}>
                  <View style={styles.themeCardLeft}>
                  <Ionicons name="moon-outline" size={24} color="#ff7d00" />
                  <Title style={{fontSize: 16, color: theme.colors.text}}>Dark Mode</Title>
                  </View>

                  <Switch 
                  value={theme === darkTheme} 
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#ddd", true: "#444"}}
                  thumbColor={theme === darkTheme ? "#fff" : "#000"}
                  /> 
              </View>
              
            </Card>

            {/* Logout Button*/}
            <TouchableOpacity 
            style={[styles.logoutButton, {backgroundColor: theme.colors.primary,}]} 
            onPress={() => {signOut(); router.replace("/(auth)/login")}}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, backgroundColor: "#103957" },
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
  },
  footer: {
    flex: 1,
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
