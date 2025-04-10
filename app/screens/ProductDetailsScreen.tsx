import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import UIHeader from "@/components/UIHeader";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addToCart, Cart, getCartById, updateCart } from "@/store/cartSlice";
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  size: string;
  origin: string;
  stock: number;
  image: string[];
  type: string;
}
const ProductDetailScreen = ({ navigation }: { navigation: any }) => {
  const [quantity, setQuantity] = useState(0);
  const route = useRoute();
  const { item } = route.params as { item: Product };
  const uid = useSelector((state: RootState) => state.user.uid);
  const carts = useSelector((state: RootState) => state.cart.carts);

  const dispatch = useDispatch<AppDispatch>();

  console.log("carts", carts);
  const handleAddToCart = async () => {
    if (quantity === 0) return;

    let cart = carts?.[0];

    if (!cart) {
      const newCart: Cart = {
        id: `${Date.now()}`,
        uid,
        cart: [
          {
            product: {
              id: item.id,
              name: item.name,
              price: item.price,
              image: item.image[0],
              category: item.category,
              stock: item.stock,
              type: item.type,
            },
            quantity,
          },
        ],
        quantity,
      };

      dispatch(addToCart(newCart));
    } else {
      const updatedCarts = {
        ...cart,
        cart: [...cart.cart],
      };

      const index = updatedCarts.cart.findIndex(
        (cartItem) => cartItem.product.id === item.id
      );

      if (index !== -1) {
        // Sản phẩm đã có trong cart, cập nhật số lượng
        console.log("o day", quantity);
        updatedCarts.cart[index].quantity += quantity;
        return;
      }

      updatedCarts.cart.push({
        product: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image[0],
          category: item.category,
          stock: item.stock,
          type: item.type,
        },
        quantity,
      });

      updatedCarts.quantity += quantity;

      await dispatch(updateCart({ id: cart.id, cartData: updatedCarts }));
    }
  };

  return (
    <View style={styles.container}>
      <UIHeader
        nameIconRight={require("../../assets/images/shopping-cart.png")}
        title={item.name}
        onPressLeft={() => navigation.goBack()}
      />

      {/* Ảnh sản phẩm */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image[0] }} style={styles.image} />
      </View>
      <View style={styles.containerThongTin}>
        {/* Giá & Loại cây */}
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>{item.type}</Text>
          {item.category && <Text style={styles.tag}>{item.category}</Text>}
        </View>
        <Text style={styles.price}>{item.price}</Text>

        {/* Chi tiết sản phẩm */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Kích cỡ</Text>
            <Text style={styles.value}>{item.size}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Xuất xứ</Text>
            <Text style={styles.value}>{item.origin}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tình trạng</Text>
            <Text style={[styles.value, styles.stock]}>
              Còn {item.stock} sp
            </Text>
          </View>
        </View>

        {/* Số lượng */}
        <View style={styles.quantityContainer}>
          <Text>Đã chọn {quantity} sản phẩm</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={styles.quantityBox}>
              <TouchableOpacity
                onPress={() => setQuantity(Math.max(0, quantity - 1))}
                style={styles.typeButton}
              >
                <MaterialIcons name="remove" size={20} />
              </TouchableOpacity>
              <TextInput
                style={styles.quantityInput}
                keyboardType="numeric"
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text) || 0)}
              />
              <TouchableOpacity
                onPress={() => setQuantity(quantity + 1)}
                style={styles.typeButton}
              >
                <MaterialIcons name="add" size={20} />
              </TouchableOpacity>
            </View>
            <View>
              <Text>Tạm tính</Text>
              <Text style={styles.totalPrice}>{quantity * 250000}đ</Text>
            </View>
          </View>
        </View>

        {/* Button chọn mua */}
        <TouchableOpacity
          style={quantity === 0 ? styles.buyButtonDefault : styles.buyButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.buyButtonText}>CHỌN MUA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // containerBody: { flex: 1 },
  containerThongTin: { flex: 6, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold" },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10,
    flex: 4,
    backgroundColor: "#F6F6F6",
    justifyContent: "flex-end",
  },
  image: {
    width: 300,
    height: 300,

    resizeMode: "stretch",
  },
  tagContainer: {
    flexDirection: "row",

    marginBottom: 10,
  },
  tag: {
    backgroundColor: "#009245",
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  price: { fontSize: 20, fontWeight: "bold" },
  detailsContainer: { marginVertical: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#ABABAB",
  },
  label: { fontSize: 16, color: "gray" },
  value: { fontSize: 16 },
  stock: { color: "green", fontWeight: "bold" },
  quantityContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  typeButton: {
    borderWidth: 1,
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityBox: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 10,
  },
  quantityInput: { textAlign: "center", width: 40 },
  totalPrice: { fontSize: 18, fontWeight: "bold" },
  buyButtonText: { fontSize: 16, fontWeight: "bold", color: "white" },
  buyButton: {
    backgroundColor: "#007537",
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonDefault: {
    backgroundColor: "#ccc",
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 5,
  },
});

export default ProductDetailScreen;
