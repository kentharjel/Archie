import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useState } from "react";
import { db } from "../firebaseConfig";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = async (product, userId) => {
    if (!userId) {
      alert("You must be logged in!");
      return;
    }
    try {
      await addDoc(collection(db, "cart"), { userId, product, addedAt: new Date() });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error(error);
      alert("Failed to add item to cart.");
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await deleteDoc(doc(db, "cart", cartId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error(error);
      alert("Failed to remove item.");
    }
  };

  const subscribeToCart = (userId) => {
    if (!userId) return () => {};
    const q = query(collection(db, "cart"), where("userId", "==", userId));
    const unsubscribe = onSnapshot(q, snapshot => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), addedAt: doc.data().addedAt?.toDate?.() ?? doc.data().addedAt }));
      setCart(items);
    });
    return unsubscribe;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, subscribeToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
