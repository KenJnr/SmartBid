import { useUser } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const userType = user?.unsafeMetadata?.userType;
    console.log("User Metadata:", user?.unsafeMetadata); // Debugging

    if (userType === "buyer") {
      router.replace("/dashboard/buyer/Home");
    } else if (userType === "seller") {
      router.replace("/dashboard/seller/Home");
    } else {
      router.replace("/(auth)/signup");
    }
  }, [isLoaded]);

  if (!isLoaded) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Redirecting...</Text>
    </View>
  );
}
