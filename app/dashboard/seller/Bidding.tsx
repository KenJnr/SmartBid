import { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from "react-native";
import {  FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTheme } from "@/src/context/ThemeContext";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";

interface BidEvent {
  id: string;
  title: string;
  image: string;
  startTime: string;
  startingPrice: number;
}

export default function BiddingScreen() {
  const { theme } = useTheme();
  const [bids, setBids] = useState<BidEvent[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBid, setEditingBid] = useState<BidEvent | null>(null);
  const [newBid, setNewBid] = useState({
    title: "",
    image: "",
    startTime: "",
    startingPrice: "",
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:["images"],
      allowsEditing: false,
      quality: 1,
    });
  
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop(); // Extract filename
      const localUri = `${FileSystem.documentDirectory}${fileName}`;
  
      try {
        await FileSystem.copyAsync({ from: uri, to: localUri }); // Save locally
        setNewBid({ ...newBid, image: localUri }); // Store local path
      } catch (error) {
        console.error("Error saving image locally:", error);
      }
    }
  };
  

  const handleCreateBid = () => {
    if (!newBid.title || !newBid.startTime || !newBid.image || !newBid.startingPrice) {
      alert("Please fill all fields!");
      return;
    }

    if (editingBid) {
      // Update existing bid
      setBids(
        bids.map((bid) =>
          bid.id === editingBid.id ? { ...bid, ...newBid, startingPrice: parseFloat(newBid.startingPrice) } : bid
        )
      );
      setEditingBid(null);
    } else {
      // Create new bid
      const newBidEvent: BidEvent = {
        id: Math.random().toString(),
        title: newBid.title,
        image: newBid.image,
        startTime: newBid.startTime,
        startingPrice: parseFloat(newBid.startingPrice),
      };

      setBids([...bids, newBidEvent]);
    }

    setNewBid({ title: "", image: "", startTime: "", startingPrice: "" });
    setModalVisible(false);
  };

  const handleEditBid = (bid: BidEvent) => {
    setEditingBid(bid);
    setNewBid({
      title: bid.title,
      image: bid.image,
      startTime: bid.startTime,
      startingPrice: bid.startingPrice.toString(),
    });
    setModalVisible(true);
  };

  const handleDeleteBid = (id: string) => {
    Alert.alert("Delete Bid", "Are you sure you want to delete this bid?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setBids(bids.filter((bid) => bid.id !== id)), style: "destructive" },
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />
      <FlatList
        data={bids}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BidEventCard bid={item} onEdit={handleEditBid} onDelete={handleDeleteBid} />
        )}
      />
      <TouchableOpacity
        style={[styles.createBidButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>

      {/* Modal for Creating/Editing Bid */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              {editingBid ? "Edit Bid" : "Create a New Bid"}
            </Text>
            <TextInput
              placeholder="Title"
              style={[styles.input, { backgroundColor: theme.colors.inputField }]}
              value={newBid.title}
              onChangeText={(text) => setNewBid({ ...newBid, title: text })}
            />
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.uploadText}>Pick an Image</Text>
            </TouchableOpacity>
            {newBid.image ? <Image source={{ uri: newBid.image }} style={styles.previewImage} /> : null}
            <TextInput
              placeholder="Start Time (YYYY-MM-DD HH:MM)"
              style={[styles.input, { backgroundColor: theme.colors.inputField }]}
              value={newBid.startTime}
              onChangeText={(text) => setNewBid({ ...newBid, startTime: text })}
            />
            <TextInput
              placeholder="Starting Price"
              style={[styles.input, { backgroundColor: theme.colors.inputField }]}
              keyboardType="number-pad"
              value={newBid.startingPrice}
              onChangeText={(text) => setNewBid({ ...newBid, startingPrice: text })}
            />
            <View style={styles.buttonRow}>
            <FontAwesome6 name="circle-xmark" size={32} color="red" onPress={() => setModalVisible(false)}/>
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" onPress={handleCreateBid} size={32} color="green" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function BidEventCard({ bid, onEdit, onDelete }: { bid: BidEvent; onEdit: (bid: BidEvent) => void; onDelete: (id: string) => void }) {
  const [countdown, setCountdown] = useState("");
  const router = useRouter()

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const startTime = new Date(bid.startTime).getTime();
      const difference = startTime - now;

      if (difference <= 0) {
        setCountdown("Bid started");
        clearInterval(interval);
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setCountdown(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [bid.startTime]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: bid.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{bid.title}</Text>
        <Text style={styles.countdown}>{countdown}</Text>
        <Text style={styles.price}>Starting at: ${bid.startingPrice}</Text>
      </View>
      <View style={styles.editDeleteContainer}>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => onEdit(bid)}>
            <Ionicons name="create-outline" size={24} style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(bid.id)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
  style={styles.joinButton}
  onPress={() => {
    router.push({
      pathname: "/bidding/[bidId]",
      params: { 
        bidId: bid.id, 
        title: bid.title,
        image: encodeURIComponent(bid.image) // Local URI instead of base64
      }
    });
  }}
  
>
  <Text style={styles.joinButtonText}>Join Event</Text>
</TouchableOpacity>


      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin: 16
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  countdown: {
    fontSize: 14,
    color: "#ff7d00",
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    color: "#000",
    fontWeight: "600",
  },
  iconButton: {
    marginLeft: 10,
    padding: 8,
  },
  createBidButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333", // Adjust color to fit theme
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#ff7d00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imagePreview: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: "cover",
  },
  editDeleteContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  }, 
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end", // Keep icons aligned
    marginBottom: 5, // Space between icons and button
  },
  editIcon: {
    marginRight: 24,
    color: "#007AFF",
  },
  joinButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ff7d00",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
  },
  joinButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
