import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function BiddingPage() {
  const { bidId } = useLocalSearchParams();

  return (
    <View style={{padding: 60}}>
      <Text>Bidding Page for Event: {bidId}</Text>
    </View>
  );
}
