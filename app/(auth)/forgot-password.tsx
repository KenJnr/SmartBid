import { Text,View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Forgetpassword(){

    const router = useRouter()
    const [email, setEmail] = useState("")
    return(
        <View style={styles.container}>
            <ExpoStatusBar style="dark" />

            <TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.heading}>Forget password</Text>

            <Text style={styles.intro}>Please, enter your email address. You will receive a link 
            to create a new password via email.
            </Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.textField}
                placeholder="m@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.push("/(auth)/login")}
            >
                <Text style={styles.buttonText}>SEND</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,  
        backgroundColor: "#fff"
    },
    backIcon:{
        marginTop: 20,
        alignSelf: "flex-start",
        marginBottom: 24,
        backgroundColor: "#ddd",
        paddingHorizontal: 10,
        paddingVertical:10,
        borderRadius: 12
    },
    heading:{
        alignSelf: "flex-start",
        fontSize: 30,
        fontWeight: "bold",
        fontFamily: "Poppins",
        marginBottom: 100,
    },
    intro:{
        fontSize: 16,
        lineHeight: 20,
        color: "#333",
        marginBottom: 20
    },
    label: {
        alignSelf: "flex-start",
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        paddingBottom: 5
    },
    textField: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 60,
        backgroundColor: "#fafaff"
    },
    button: {
        backgroundColor: "#4579EE",
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