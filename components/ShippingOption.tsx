import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ShippingOptionProps {
  name: string;
  price: number;
  estimatedDate: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ShippingOption = ({
  name,
  price,
  estimatedDate,
  isSelected,
  onSelect,
}: ShippingOptionProps) => {
  console.log(isSelected);
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>
          {name} - {price}
        </Text>
        <Text style={styles.estimatedDate}>
          Dự kiến giao hàng {estimatedDate}
        </Text>
      </View>
      {isSelected == true ? (
        <Ionicons name="checkmark" size={24} color="green" />
      ) : (
        <></>
      )}
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
