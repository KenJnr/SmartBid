import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import * as React from "react";
import { Avatar, Card, Title } from "react-native-paper";
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ExpoStatusBar style="auto" />
        {/* Top Section */}
        <View style={styles.top}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={50} source={require("@/assets/images/me.jpg")} />
            <TouchableOpacity style={styles.logoutButton}>
              <FontAwesome6 name="door-open" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.text1}>Welcome Back,</Text>
          <Text style={styles.text2}>ijforkuo</Text>
        </View>

        {/* Floating Section */}
        <View style={styles.float}>
          <Text style={styles.floatText}>Quick Notifications</Text>
          <Text style={styles.floatText}>Upcoming Bids</Text>
          <Text style={styles.floatText}>New Messages</Text>
          <Text style={styles.floatText}>Updates</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>QUICK SETUP</Text>

          {/* Cards Layout */}
          <View style={styles.cardContainer}>
            <View style={styles.leftCards}>
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                  <Ionicons name="cloud-upload" size={24} color="black" />
                  <Title style={styles.cardText}>Upload Image</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="add-circle" size={24} color="black" />
                  <Title style={styles.cardText}>Create Listings</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="list-circle" size={24} color="black" />
                  <Title style={styles.cardText}>Edit Listings</Title>
                </View>
              </Card>
            </View>

            <View style={styles.rightCards}>
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <FontAwesome5 name="users" size={24} color="black" />
                  <Title style={styles.cardText}>Followwers</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Octicons name="feed-heart" size={24} color="black" />
                  <Title style={styles.cardText}>View Requests</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="wallet" size={24} color="black" />
                  <Title style={styles.cardText}>WIdthdrawal</Title>
                </View>
              </Card>
            </View>
          </View>

          <Text style={styles.footerTitle}>GET STARTED</Text>

            <Card style={styles.card}>
                <View style={styles.cardContent2}>
                    <View style={styles.left}>
                    <MaterialCommunityIcons name="hand-heart" size={24} color="black" />
                    <Title style={styles.cardText}>Invite a friend</Title>
                    </View>

                    <AntDesign name="right" size={24} color="black" />
                </View>
            </Card>

            <Card style={styles.card}>
                <View style={styles.cardContent2}>
                <View style={styles.left}>
                    <Ionicons name="chatbubble-ellipses" size={24} color="black" />
                    <Title style={styles.cardText}>DomiChat</Title>
                    </View>

                    <AntDesign name="right" size={24} color="black" />
                </View>
            </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    backgroundColor: "#1E3A8A",
    padding: 20,
    paddingVertical: 40,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    backgroundColor: "#FF4C4C",
    padding: 10,
    borderRadius: 50,
  },
  text1: {
    fontSize: 18,
    color: "#ccc",
    marginTop: 15,
  },
  text2: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 70
  },
  float: {
    backgroundColor: "#4579EE",
    padding: 15,
    position: "absolute",
    top: 220,
    left: 20,
    width: "90%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  floatText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#fff"
  },
  footer: {
    flex: 1,
    marginTop: 80,
    backgroundColor: "white",
    padding: 20,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4579EE"
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40
  },
  leftCards: {
    width: "48%",
  },
  rightCards: {
    width: "48%",
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContent2:{
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent:"space-between"
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  }
});
