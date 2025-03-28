import React, { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextInput } from "react-native";
import { useTheme } from "@/src/context/ThemeContext";
import { router } from "expo-router";
import { useSignUp, useSignIn } from "@clerk/clerk-expo";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function VerifyCodeScreen () {
    const {theme} = useTheme()
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [pendingVerification, setPendingVerification] = useState(false);

    const otpRefs = useRef<(TextInput | null)[]>([]);

    const { signUp, isLoaded: signUpLoaded, setActive } = useSignUp();
      const { signIn, isLoaded: signInLoaded } = useSignIn();

    const handleOtpChange = (value: string, index: number) => {
        if (!/^[0-9]?$/.test(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        if (value && index < otp.length - 1) {
          otpRefs.current[index + 1]?.focus();
        }
      };
    
      const handleOtpKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
          otpRefs.current[index - 1]?.focus();
        }
      };

      const handleVerify = async () => {
        if (!signIn) return;
    
        try {
            setLoading(true);
            const result = await signIn.attemptFirstFactor({
                strategy: "reset_password_email_code",
                code: otp.join(""),
            });
    
            if (result.status === "needs_new_password") {
                // Move to the reset password screen
                router.replace("/(auth)/reset-password");
            } else {
                throw new Error("Verification failed. Try again.");
            }
        } catch (error: any) {
            console.error("Verification Error:", error);
            Alert.alert("Error", error.errors?.[0]?.message || "Invalid code. Try again.");
        } finally {
            setLoading(false);
        }
    };
    

    return(
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ExpoStatusBar style={theme.mode === "dark" ? "auto" : "dark"} />
            <Text style={[styles.heading, { color: theme.colors.text }]}>Enter Reset Password Code</Text>
            <Text style={[styles.intro, { color: theme.colors.cardSubTitle }]}>
                Enter the reset code sent to your email to verify your identity and proceed with resetting your password.
            </Text>
                      <View style={styles.otpContainer}>
                          {otp.map((digit, index) => (
                            <TextInput
                              key={index}
                              ref={(ref) => (otpRefs.current[index] = ref)}
                              style={[styles.otpBox, { backgroundColor: theme.colors.inputField }]}
                              value={digit}
                              onChangeText={(value) => handleOtpChange(value, index)}
                              onKeyPress={(event) => handleOtpKeyPress(event, index)}
                              keyboardType="number-pad"
                              maxLength={1}
                              textAlign="center"
                            />
                          ))}
                        </View>
                      {/* <Button title="Verify Email" onPress={handleVerify} /> */}
                      <TouchableOpacity style={[styles.button, { backgroundColor: theme.colors.primary }]} onPress={handleVerify} disabled={loading}>
                        {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Verify Email</Text>}
                      </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,
      },
    heading: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins",
        marginTop: 30,
        marginBottom: 20
      },
      intro: {
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 20,
        textAlign: "center",
    },
      otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 20,
        marginBottom: 40
      },
      otpBox: {
        width: 50,
        height: 50,
        borderRadius: 8,
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 5,
        borderWidth: 1,
        textAlign: "center",
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
        elevation: 5, // For Android shadow
      },
      buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
      },
    })
