import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useArch } from "../contexts/ArchContext"; // ✅ renamed context

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { createUser } = useArch(); // ✅ using Arch context now

  const handleSignUp = async () => {
    const newUser = await createUser({ name, email, password });
    if (newUser) {
      router.push("/"); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        {/* Shopping bag logo */}
        <View style={styles.bag}>
          <View style={styles.handle} />
          <Text style={styles.logoText}>A</Text>
        </View>
        <Text style={styles.appName}>Arch</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text
          style={styles.footerLink}
          onPress={() => router.push("/")}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa", // same modern background
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  bag: {
    width: 100,
    height: 100,
    backgroundColor: "#2980b9", // shopping blue
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2980b9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
    position: "relative",
  },
  handle: {
    position: "absolute",
    top: -18,
    width: 50,
    height: 25,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: "#2980b9",
    backgroundColor: "#f5f7fa",
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  appName: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 10,
    letterSpacing: 1,
  },
  form: {
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
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
  },
  footerLink: {
    fontWeight: "bold",
    color: "#2980b9",
  },
});
