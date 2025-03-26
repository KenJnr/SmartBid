import { useEffect, useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { StatusBar } from "expo-status-bar";

export default function SplashScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000)); // Splash delay

      if (isLoaded) {
        setAppReady(true);

        // Only navigate when authentication is fully determined
        if (isSignedIn) {
          router.replace("/dashboard/dashboard");
        } else {
          router.replace("/(auth)/signup"); // Always go to sign-in first
        }
      }
    };

    if (isLoaded) {
      loadApp();
    }
  }, [isSignedIn, isLoaded]);

  if (!appReady || !isLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image
          source={require("../assets/images/splashIcon.png")}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="#ff7d00" style={styles.loader} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#103957",
  },
  logo: {
    width: "100%",
    // height: ,
    resizeMode: "contain",
  },
  loader: {
    marginTop: 20,
  },
});
