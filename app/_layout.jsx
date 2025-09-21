import { Stack } from "expo-router";
import { ArchProvider } from "../contexts/ArchContext";
import { CartProvider } from "../contexts/CartContext";

export default function RootLayout() {
  return (
    <ArchProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown:false }}>
          <Stack.Screen name="index"/>
        </Stack>
      </CartProvider>
    </ArchProvider>
  )
}
