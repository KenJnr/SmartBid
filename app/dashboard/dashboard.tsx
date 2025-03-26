import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track navigation loading
  const [showSuccess, setShowSuccess] = useState(false); // Track success state

  useEffect(() => {
    if (!isLoaded) return;

    const userType = user?.unsafeMetadata?.userType;
    console.log("User Metadata:", user?.unsafeMetadata); // Debugging

    setTimeout(() => {
      setShowSuccess(true); // Show success message after short delay

      setTimeout(() => {
        if (userType === "buyer") {
          router.replace("/dashboard/buyer/Home");
        } else if (userType === "seller") {
          router.replace("/dashboard/seller/Home");
        } else {
          router.replace("/(auth)/signup");
        }

        setLoading(false); // Stop loading when navigation happens
      }, 2000); // Wait for 2 seconds before navigating
    }, 1000); // Show success message after 1 second
  }, [isLoaded]);

  // Show loading indicator before success message
  if (!isLoaded || loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#103957" }}>
          <ExpoStatusBar style="auto" />
        {!showSuccess ? (
          <>
            <ActivityIndicator size="large" color="#ff7d00" />
            <Text style={{ color: "#fff", marginTop: 10, fontSize: 18 }}>Loading...</Text>
          </>
        ) : (
          <>
            <Ionicons name="checkmark-circle" size={50} color="#ff7d00" />
            <Text style={{ color: "#fff", marginTop: 10, fontSize: 18 }}>Success! Redirecting...</Text>
          </>
        )}
      </View>
    );
  }

  return null;
}
