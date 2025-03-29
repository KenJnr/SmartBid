import { useLocalSearchParams } from "expo-router";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Image, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useTheme } from "@/src/context/ThemeContext";
import PubNub from "pubnub";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";


export default function BiddingPage() {
  const { bidId, title, image } = useLocalSearchParams();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [currentBid, setCurrentBid] = useState(100); // Placeholder value
  const [bidHistory, setBidHistory] = useState<{ amount: number; id: number; time: string }[]>([]);


  const isBase64 = typeof image === "string" && image.startsWith("data:image");
  const imageSource = isBase64 ? { uri: image } : { uri: decodeURIComponent(image as string) };

  useEffect(() => {
    // Fetch bid history from PubNub (or backend) when component mounts
  }, []);

  const handlePlaceBid = () => {
    const newBid = parseFloat(bidAmount);
    if (!isNaN(newBid) && newBid > currentBid) {
      setCurrentBid(newBid);
      setModalVisible(false);
      setBidAmount("");
      setBidHistory((prev) => [
        { amount: newBid, id: Date.now(), time: new Date().toString() },
        ...prev,
      ]);
    }
  };
  

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
    <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />
    
      <Image source={imageSource} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, {color: theme.colors.text}]}>{title}</Text>
      <Text style={[styles.subtitle, {color: theme.colors.cardSubTitle}]}>Auction ID: {bidId}</Text>
      <Text style={styles.currentBid}>Current Bid: ${currentBid}</Text>

      <FlatList
        data={bidHistory}
        keyExtractor={(item) => item.id.toString()}
        // inverted // Latest bid appears at the top
        renderItem={({ item, index }) => (
          <View 
            style={[
              styles.bidCard, 
              index === 0 && { 
                borderColor: theme.colors.primary, // Highlight current bid
                borderWidth: 2,
              }
            ]}
          >
            <Text style={styles.bidAmount}>${item.amount}</Text>
            <Text style={styles.bidTime}>{new Date(item.time).toLocaleString()}</Text>
          </View>
        )}
        showsVerticalScrollIndicator = {false}
      />

      {/* Input + Button in a row */}
      <View style={styles.bidInputContainer}>
        <TextInput
          style={[styles.input, {backgroundColor: theme.colors.inputField}]}
          keyboardType="number-pad"
          placeholder="Enter bid amount"
          value={bidAmount}
          onChangeText={setBidAmount}
        />
        <TouchableOpacity style={[styles.bidButton, { backgroundColor: theme.colors.primary }]} onPress={handlePlaceBid}>
          <Text style={styles.buttonText}>Place Bid</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: "center", justifyContent: "center" },
  image: { width: "100%", height: 250, borderRadius: 15, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 5 },
  subtitle: { fontSize: 16, color: "gray", marginBottom: 10 },
  currentBid: { fontSize: 18, fontWeight: "bold", color: "green", marginBottom: 10 },
  bidButton: { 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
   },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  bidCard: {
    width: "100%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bidAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  bidTime: {
    fontSize: 14,
    color: "#666",
  },
  bidInputContainer: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  input: { 
    flex: 1, 
    padding: 12, 
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5 
  },
});
