import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";

const ArchContext = createContext();

export function ArchProvider({ children }) {
  const [user, setUser] = useState(null);

  const createUser = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "users"), { name, email, password, createdAt: new Date() });
      const newUser = { id: docRef.id, name, email, password };
      setUser(newUser);
      alert(`Welcome, ${name}!`);
      return newUser;
    } catch (error) {
      console.error(error);
      alert("Failed to create account.");
    }
  };

  const signInUser = async ({ email, password }) => {
    if (!email || !password) {
      alert("All fields are required!");
      return null;
    }
    try {
      const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        alert("Invalid email or password");
        return null;
      }
      const userDoc = snapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() };
      setUser(userData);
      return userData;
    } catch (error) {
      console.error(error);
      alert("Failed to sign in.");
    }
  };

  const logoutUser = () => setUser(null);

  const updateUserProfile = async ({ name, email }) => {
    if (!user) return;
    try {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, { name, email });
      setUser({ ...user, name, email });
    } catch (error) {
      console.error(error);
      alert("Failed to update profile.");
    }
  };

  return (
    <ArchContext.Provider value={{ user, createUser, signInUser, logoutUser, updateUserProfile }}>
      {children}
    </ArchContext.Provider>
  );
}

// Hook
export function useArch() {
  const context = useContext(ArchContext);
  if (!context) throw new Error("useArch must be used within an ArchProvider");
  return context;
}
