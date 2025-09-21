import { useState } from "react";
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useArch } from "../../contexts/ArchContext";
import { useCart } from "../../contexts/CartContext";
import { SHOP_ITEMS } from "../../data/item";

export default function ShopScreen() {
  const [searchQuery,setSearchQuery] = useState("");
  const [modalVisible,setModalVisible] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState(null);

  const { addToCart } = useCart();
  const { user } = useArch();

  const filteredProducts = SHOP_ITEMS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleAddToCart = async () => {
    if (!user) return alert("Please log in first!");
    await addToCart(selectedProduct, user.id);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Arch Market</Text>
      <TextInput placeholder="Search..." value={searchQuery} onChangeText={setSearchQuery} style={styles.searchBar} />
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item=>item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Pressable onPress={()=>handleProductPress(item)}>
              <Image source={{uri:item.image}} style={styles.productImage}/>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₱{item.price}</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={()=>handleProductPress(item)}>
              <Text style={styles.addButtonText}>Add to Cart</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={styles.grid}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={()=>setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Image source={{uri:selectedProduct?.image}} style={styles.modalImage}/>
            <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
            <Text style={styles.modalPrice}>₱{selectedProduct?.price}</Text>
            <Text style={styles.modalText}>Add to cart?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalButton,{backgroundColor:"#007bff"}]} onPress={handleAddToCart}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
              <Pressable style={[styles.modalButton,{backgroundColor:"#6c757d"}]} onPress={()=>setModalVisible(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#e6f0ff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#007bff",
    marginBottom: 15,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  grid: { paddingBottom: 20 },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    alignItems: "center",
    paddingBottom: 10,
    paddingTop: 30
  },
  productImage: { width: 140, height: 140, borderRadius: 10, backgroundColor: "#f0f0f0" },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    color: "#007bff",
    marginVertical: 4,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 5,
  },
  addButtonText: { color: "#fff", fontWeight: "bold", fontSize: 14 },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  modalImage: { width: 150, height: 150, borderRadius: 10, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  modalPrice: { fontSize: 18, color: "#007bff", fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: "center", color: "#555" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  modalButton: { flex: 1, marginHorizontal: 5, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
