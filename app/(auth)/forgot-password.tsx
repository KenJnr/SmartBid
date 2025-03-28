import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTheme } from "@/src/context/ThemeContext";
import { useSignIn } from "@clerk/clerk-expo";

export default function ForgotPasswordScreen() {
    const { theme } = useTheme();
    const router = useRouter();
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendCode = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email.");
            return;
        }
    
        if (!signIn) {
            Alert.alert("Error", "Authentication is not initialized. Please try again.");
            return;
        }
    
        try {
            setLoading(true);
            // Create a new sign-in attempt
            const signInAttempt = await signIn.create({
                identifier: email,
            });
    
            // Ensure supportedFirstFactors exists and is not null
            const firstFactors = signInAttempt?.supportedFirstFactors ?? [];
            const emailFactor = firstFactors.find(
                (factor) => factor.strategy === "reset_password_email_code"
            );
    
            if (!emailFactor?.emailAddressId) {
                throw new Error("Email verification method not available for this account.");
            }
    
            // Prepare the first factor for password reset
            await signInAttempt.prepareFirstFactor({
                strategy: "reset_password_email_code",
                emailAddressId: emailFactor.emailAddressId,
            });
    
            Alert.alert("Success", "A verification code has been sent to your email.");
            router.push({ pathname: "/(auth)/verify-code", params: { email } });
        } catch (error: any) {
            console.error("Error in handleSendCode:", error);
            Alert.alert("Error", error.errors?.[0]?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}> 
            <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />

            <TouchableOpacity style={[styles.backIcon, { backgroundColor: theme.colors.backIcon }]} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={[styles.heading, { color: theme.colors.text }]}>Forgot Password</Text>

            <Text style={[styles.intro, { color: theme.colors.cardSubTitle }]}> 
                Enter your email address to receive a reset code. Use the code to securely reset your password.
            </Text>

            <Text style={[styles.label, { color: theme.colors.text }]}>Email</Text>
            <TextInput 
                style={[styles.textField, { backgroundColor: theme.colors.inputField }]} 
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity 
                style={[styles.button, { backgroundColor: theme.colors.primary }]} 
                onPress={handleSendCode} 
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>SEND CODE</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,
    },
    backIcon: {
        marginTop: 20,
        alignSelf: "flex-start",
        marginBottom: 24,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
    },
    heading: {
        alignSelf: "flex-start",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins",
        marginBottom: 50,
    },
    intro: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20,
        textAlign: "center",
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        paddingBottom: 5,
    },
    textField: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 60,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});
