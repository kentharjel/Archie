import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useArch } from "../../contexts/ArchContext";
import { useCart } from "../../contexts/CartContext";

// 🔹 Custom Cart Icon using only Views
function CartIcon() {
  return (
    <View style={styles.cartBody}>
      <View style={styles.cartBasket} />
      <View style={styles.cartHandle} />
      <View style={styles.cartWheels}>
        <View style={styles.cartWheel} />
        <View style={styles.cartWheel} />
      </View>
    </View>
  );
}

export default function PendingOrdersScreen() {
  const { user } = useArch(); // Auth from ArchContext
  const { cart, subscribeToCart, removeFromCart } = useCart(); // Cart actions
  const [pendingOrders, setPendingOrders] = useState([]);

  // Subscribe to user's cart in real-time
  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToCart(user.id);
    return unsubscribe;
  }, [user]);

  // Update local state whenever cart changes
  useEffect(() => {
    setPendingOrders(cart);
  }, [cart]);

  const handleCancelOrder = (itemId) => {
    removeFromCart(itemId);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Please log in to see your cart.</Text>
      </View>
    );
  }

  if (pendingOrders.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>You have no items in your cart.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={pendingOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Image
                source={{ uri: item.product?.image }}
                style={styles.productImage}
              />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={styles.orderText}>{item.product?.name}</Text>
                <Text style={styles.orderPrice}>₱{item.product?.price}</Text>
                <Text style={styles.orderDate}>
                  {item.addedAt ? new Date(item.addedAt).toLocaleString() : ""}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.cancelButton}
              onPress={() => handleCancelOrder(item.id)}
            >
              <Text style={styles.cancelButtonText}>Remove</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f6f9" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3f51b5",
    textAlign: "center",
    marginBottom: 15,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#555",
  },
  orderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  productImage: { width: 70, height: 70, borderRadius: 10 },
  orderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3f51b5",
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007bff",
    marginVertical: 3,
  },
  orderDate: { fontSize: 12, color: "#777" },
  cancelButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // 🔹 Cart Icon Styles
  cartBody: {
    width: 28,
    height: 24,
    flexDirection: "column",
    alignItems: "center",
  },
  cartBasket: {
    width: 20,
    height: 14,
    backgroundColor: "#3f51b5",
    borderRadius: 3,
  },
  cartHandle: {
    width: 12,
    height: 2,
    backgroundColor: "#3f51b5",
    marginTop: 2,
    borderRadius: 1,
  },
  cartWheels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 24,
    marginTop: 2,
  },
  cartWheel: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3f51b5",
  },
});
