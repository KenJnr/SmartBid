import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Stack, Slot, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import Constants from "expo-constants";

const tokenCache = {
  getToken: (key: string) => SecureStore.getItemAsync(key),
  saveToken: (key: string, value: string) => SecureStore.setItemAsync(key, value),
};

export default function Layout() {
  const CLERK_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY;

  if (!CLERK_PUBLISHABLE_KEY) {
    console.error("Clerk publishable key is missing!");
    return null;
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <AuthRedirect />
      <Stack screenOptions={{ headerShown: false }}>
        <Slot /> {/* Ensure the layout properly renders nested routes */}
      </Stack>
    </ClerkProvider>
  );
}

function AuthRedirect() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!isLoaded || !navigationState?.key) return; // Ensure auth and navigation are ready

    const inAuthFlow = segments[0] === "(auth)"; // Check if user is in auth pages
    if (!isSignedIn && !inAuthFlow) {
      router.replace("/(auth)/signup"); // Redirect only when safe to navigate
    }
  }, [isSignedIn, isLoaded, segments, navigationState]);

  return null;
}
