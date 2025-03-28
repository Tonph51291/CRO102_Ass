import React, { useState } from "react";
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

const ProductDetailScreen = ({ navigation }: any) => {
  const [quantity, setQuantity] = useState(0);

  return (
    <View style={styles.container}>
      <UIHeader
        nameIconRight={require("../../assets/images/shopping-cart.png")}
        title="Screen"
        onPressLeft={() => navigation.goBack()}
      />

      {/* Ảnh sản phẩm */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/image7.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.containerThongTin}>
        {/* Giá & Loại cây */}
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Cây trồng</Text>
          <Text style={styles.tag}>Ưa bóng</Text>
        </View>
        <Text style={styles.price}>250.000đ</Text>

        {/* Chi tiết sản phẩm */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Chi tiết sản phẩm</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Kích cỡ</Text>
            <Text style={styles.value}>Nhỏ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Xuất xứ</Text>
            <Text style={styles.value}>Châu Phi</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tình trạng</Text>
            <Text style={[styles.value, styles.stock]}>Còn 156 sp</Text>
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
        <TouchableOpacity style={styles.buyButton}>
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
  },
  image: {},
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
  buyButton: {
    backgroundColor: "#ccc",
    padding: 15,
    alignItems: "center",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  buyButtonText: { fontSize: 16, fontWeight: "bold" },
});

export default ProductDetailScreen;
