import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import * as React from "react";
import { Avatar, Card, Title, } from "react-native-paper";
import { AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeScreen() {
  const router = useRouter()
  const {signOut} = useAuth()
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <ExpoStatusBar style="auto" />
        {/* Top Section */}
        <View style={styles.top}>
          <View style={styles.avatarContainer}>
            <Avatar.Image size={50} source={require("@/assets/images/me.jpg")} />
            <Text style={styles.avatarText}>Seller</Text>
          </View>

          <Text style={styles.text1}>Welcome Back,</Text>
          <Text style={styles.text2}>ijforkuo</Text>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>QUICK SETUP</Text>

          {/* Cards Layout */}
          <View style={styles.cardContainer}>
            <View style={styles.leftCards}>
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                  <Ionicons name="cloud-upload" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>Upload Image</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="add-circle" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>Create Listings</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="list-circle" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>Edit Listings</Title>
                </View>
              </Card>
            </View>

            <View style={styles.rightCards}>
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <FontAwesome5 name="users" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>Followers</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Octicons name="feed-heart" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>View Requests</Title>
                </View>
              </Card>

              <Card style={styles.card}>
                <View style={styles.cardContent}>
                <Ionicons name="wallet" size={24} color="#ff7d00" />
                  <Title style={styles.cardText}>Withdrawal</Title>
                </View>
              </Card>
            </View>
          </View>

          <Text style={styles.footerTitle}>GET STARTED</Text>

            <Card style={styles.card}>
                <View style={styles.cardContent2}>
                    <View style={styles.left}>
                    <MaterialCommunityIcons style={styles.Icon1} name="hand-heart" size={24} color="#fbb02d" />
                      <View style={{flexDirection: "column"}}>
                        <Title style={styles.cardText}>Invite friends</Title>
                        <Text style={styles.cardText2}>Sign up a friend</Text>
                      </View>
                    </View>

                    <AntDesign name="right" size={24} color="#999" />
                </View>
            </Card>

            <Card style={styles.card}>
                <View style={styles.cardContent2}>
                  <View style={styles.left}>
                    <Ionicons style={styles.Icon2} name="chatbubble-ellipses" size={24} color="#0077b6" />
                    <View style={{flexDirection: "column"}}>
                      <Title style={styles.cardText}>DomiChat</Title>
                      <Text style={styles.cardText2}>Chat with our AI Assistant</Text>
                    </View>
                  </View>

                    <AntDesign name="right" size={24} color="#999" />
                </View>
            </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll:{
    flexGrow: 1,
    backgroundColor: "#103957"
  },
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: "#001524",
    padding: 20,
    paddingVertical: 40,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatarText: {
    color: "#fff",
    padding: 10,
    fontSize: 24,
    fontWeight: "bold"
  },
  text1: {
    fontSize: 18,
    color: "#D1E8FF",
    marginTop: 15,
  },
  text2: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 70
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
  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF"
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
  },
  leftCards: {
    width: "48%",
  },
  rightCards: {
    width: "48%",
  },
  card: {
    backgroundColor: "#1B4B66",
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
    color: "#FFFFFF"
  },
  cardContent2:{
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    justifyContent:"space-between"
  },
  left: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    gap: 12
  },
  Icon1:{
    backgroundColor: "#faf0ca",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  Icon2: {
    
    backgroundColor: "#caf0f8",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 20
  },
  cardText2: {
    fontSize: 12,
    color: "#D1E8FF",
    alignItems: "center"
  }
});
