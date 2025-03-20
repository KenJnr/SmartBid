import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import pubnub from "@/src/utils/pubnubConfig";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid"; // Generates unique bid IDs

export default function CreateBidScreen() {
  const navigation = useNavigation();
  const [productName, setProductName] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [bidDuration, setBidDuration] = useState(""); // In minutes

  const createBid = () => {
    if (!productName || !startingPrice || !bidDuration) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    const bidId = uuidv4(); // Generate a unique ID for the bid
    const newBid = {
      bidId,
      productName,
      startingPrice: parseFloat(startingPrice),
      bidDuration: parseInt(bidDuration),
      status: "ongoing", // "ongoing" or "upcoming"
      createdAt: new Date().toISOString(),
    };

    // Publish the new bid to PubNub
    pubnub.publish({
      channel: "bids_list",
      message: { type: "NEW_BID", bid: newBid },
    });

    Alert.alert("Success", "Bid Created!");
    navigation.goBack(); // Go back to the seller's dashboard
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name:</Text>
      <TextInput
        style={styles.input}
        value={productName}
        onChangeText={setProductName}
      />

      <Text style={styles.label}>Starting Price:</Text>
      <TextInput
        style={styles.input}
        value={startingPrice}
        onChangeText={setStartingPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Bid Duration (minutes):</Text>
      <TextInput
        style={styles.input}
        value={bidDuration}
        onChangeText={setBidDuration}
        keyboardType="numeric"
      />

      <Button title="Create Bid" onPress={createBid} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
