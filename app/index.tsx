import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function Home() {
  const { isSignedIn, isLoaded } = useAuth(); // Ensure Clerk is loaded
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return; // Prevent navigation until Clerk is ready

    if (isSignedIn) {
      router.replace("/dashboard/dashboard");
    } else {
      router.replace("/(auth)/signup");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <ExpoStatusBar style="auto" /> */}
      <Text>Redirecting...</Text>
    </View>
  );
}
