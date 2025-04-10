import { MaterialIcons } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  stock: number;
  type: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

const ItemInputPayMent: React.FC<CartItem> = ({ product, quantity }) => {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {product.name} |{" "}
          <Text style={styles.category}>{product.category}</Text>
        </Text>
        <Text style={styles.price}>{product.price.toLocaleString()}đ</Text>
        <View style={styles.actions}>
          <Text style={styles.quantity}>{quantity} sản phẩm</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(ItemInputPayMent);

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  category: {
    color: "#7D7B7B",
    fontFamily: "Lato-Regular",
    fontSize: 15,
  },
  price: {
    color: "#009245",
    fontWeight: "bold",
    marginVertical: 5,
    fontFamily: "Lato-Regular",
    fontSize: 18,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    fontSize: 18,
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
    fontFamily: "Lato-Regular",
  },
  delete: {
    color: "red",
    marginLeft: 15,
    fontFamily: "Lato-Regular",
    fontSize: 15,
  },
});
