import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ShippingOptionProps {
  name: string;
  price: string;
  estimatedDate: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ShippingOption = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>00000</Text>
        <Text style={styles.estimatedDate}>Dự kiến giao hàng</Text>
      </View>
      <Ionicons name="checkmark" size={24} color="green" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  estimatedDate: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
  },
});

export default ShippingOption;
