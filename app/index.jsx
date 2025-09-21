import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useArch } from "../contexts/ArchContext";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signInUser } = useArch();

  const handleSignIn = async () => {
    const loggedInUser = await signInUser({ email, password });
    if (loggedInUser) {
      router.push("/tabs/shop");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoWrapper}>
        {/* Shopping bag logo */}
        <View style={styles.bag}>
          {/* Bag handle */}
          <View style={styles.handle} />
          {/* Letter A */}
          <Text style={styles.logoText}>A</Text>
        </View>
        <Text style={styles.appName}>Arch</Text>
        <Text style={styles.tagline}>Shop Smart. Live Better.</Text>
      </View>

      {/* Card form */}
      <View style={styles.formCard}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <Text style={styles.footer} onPress={() => router.push("/signup")}>
          Don’t have an account?{" "}
          <Text style={{ fontWeight: "bold", color: "#2980b9" }}>Create one</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 40,
  },
  bag: {
    width: 120,
    height: 120,
    backgroundColor: "#2980b9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2980b9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
    position: "relative",
  },
  handle: {
    position: "absolute",
    top: -20,
    width: 60,
    height: 30,
    borderRadius: 15,
    borderWidth: 6,
    borderColor: "#2980b9",
    backgroundColor: "#eef2f5", // cutout effect
  },
  logoText: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#fff",
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 15,
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: "#7f8c8d",
    marginTop: 5,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#dfe6e9",
  },
  button: {
    backgroundColor: "#2980b9",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#2980b9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    color: "#34495e",
    fontSize: 16,
    textAlign: "center",
  },
});
