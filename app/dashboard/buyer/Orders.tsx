import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { View,Text, Button } from "react-native";

export default function OrdersScreen () {
    const {signOut} = useAuth();
        const router = useRouter()
    return(
        <View>
            <Text>Welcome to my Orders Screen</Text>
            <Button title="Logout" onPress={() => { signOut(); router.replace("/(auth)/login"); }} />
        </View>
    )
}