import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import pubnub from "@/src/utils/pubnubConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

// Define the navigation type
type RootStackParamList = {
  BiddingScreen: { bidId: string };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "BiddingScreen">;

interface BidType {
  bidId: string;
  productName: string;
  startingPrice: number;
  bidDuration: number;
  status: "ongoing" | "upcoming";
}

export default function BuyerBiddingScreen() {
  const [bids, setBids] = useState<BidType[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    pubnub.subscribe({ channels: ["bids_list"] });

    const listener = {
      message: (event: any) => {
        if (typeof event.message === "object" && event.message !== null) {
          const bidMessage = event.message as { type: string; bid: BidType };
          if (bidMessage.type === "NEW_BID") {
            setBids((prevBids) => [...prevBids, bidMessage.bid]);
          }
        }
      },
    };

    pubnub.addListener(listener);

    return () => {
      pubnub.unsubscribeAll();
      pubnub.removeListener(listener);
    };
  }, []);

  const renderBid = ({ item }: { item: BidType }) => (
    <TouchableOpacity
      style={styles.bidCard}
      onPress={() => navigation.navigate("BiddingScreen", { bidId: item.bidId })}
    >
      <Text style={styles.bidTitle}>{item.productName}</Text>
      <Text>Starting Price: ${item.startingPrice}</Text>
      <Text>Duration: {item.bidDuration} mins</Text>
      <Text>Status: {item.status}</Text>
      <Text style={styles.joinButton}>Join Event</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ongoing & Upcoming Bids</Text>
      <FlatList
        data={bids}
        keyExtractor={(item) => item.bidId}
        renderItem={renderBid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  bidCard: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  bidTitle: { fontSize: 18, fontWeight: "bold" },
  joinButton: {
    marginTop: 10,
    color: "blue",
    fontWeight: "bold",
  },
});
