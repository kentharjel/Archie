import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useArch } from "../../contexts/ArchContext"; // ✅ useArch instead of useCart

export default function ProfileScreen() {
  const { user, logoutUser, updateUserProfile } = useArch(); // ✅ ArchContext
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logoutUser();
            router.replace("/");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSaveProfile = () => {
    if (!editedName || !editedEmail) {
      alert("All fields are required!");
      return;
    }
    updateUserProfile({ name: editedName, email: editedEmail });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with background + avatar */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
          }}
          style={styles.headerBg}
        />
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={styles.avatar}
          />
        </View>

        {/* Name & Email */}
        <View style={styles.nameEmailBg}>
          <Text style={styles.name}>{user ? user.name : "Guest User"}</Text>
          <Text style={styles.email}>
            {user ? user.email : "No email available"}
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={editedName}
              onChangeText={setEditedName}
              placeholder="Full Name"
            />
            <TextInput
              style={styles.input}
              value={editedEmail}
              onChangeText={setEditedEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#3f51b5" }]}
                onPress={handleSaveProfile}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, { backgroundColor: "#9e9e9e" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6f9" },

  header: {
    height: 220,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    marginBottom: 30,
  },
  headerBg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.35,
  },
  avatarContainer: {
    borderWidth: 3,
    borderColor: "#fff",
    borderRadius: 60,
    padding: 5,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },

  nameEmailBg: {
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: "center",
  },
  name: { fontSize: 26, fontWeight: "bold", color: "#3f51b5" },
  email: { fontSize: 16, color: "#555" },

  actionsContainer: { marginHorizontal: 20 },
  editButton: {
    backgroundColor: "#5c6bc0",
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#3f51b5",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  editButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  logoutButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#b71c1c",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoutButtonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },

  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#3f51b5",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cfd8dc",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 15,
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalBtn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

