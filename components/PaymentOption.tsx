import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PaymentOptionProps {
  name: string;
  isSelected: boolean;
  onSelect: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  name,
  isSelected,
  onSelect,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <Text style={[styles.name, { color: isSelected ? "green" : "black" }]}>
        {name}
      </Text>
      {isSelected && <Ionicons name="checkmark" size={20} color="green" />}
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
  name: {
    fontSize: 16,
  },
});

export default PaymentOption;
