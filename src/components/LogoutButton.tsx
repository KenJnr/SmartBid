import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "react-native";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  return <Button title="Logout" onPress={() => { signOut(); router.replace("/(auth)/signup"); }} />;
}
