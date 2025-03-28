import { MaterialIcons } from "@expo/vector-icons";
import React, { memo, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    image: any;
  };
  updateQuantity: (id: number, amount: number) => void;
  removeItem: (id: number) => void;
  chooseCart: (id: number) => void;
  isChecked: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeItem,
  chooseCart,
  isChecked,
}) => {
  console.log("render");
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={() => chooseCart(item.id)}>
        <MaterialIcons
          name={isChecked ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={isChecked ? "#009245" : "black"}
        />
      </TouchableOpacity>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.name} | <Text style={styles.category}>{item.category}</Text>
        </Text>
        <Text style={styles.price}>{item.price.toLocaleString()}đ</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
            <Text style={styles.button}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
            <Text style={styles.button}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Text style={styles.delete}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(CartItem);

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
