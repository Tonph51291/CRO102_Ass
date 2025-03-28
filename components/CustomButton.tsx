import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type CustomButtonType = {
  onPress: () => void;
};
export default function CustomButton({ onPress }: CustomButtonType) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: "90%", marginVertical: 10 }}
      onPress={onPress}
    >
      <LinearGradient
        colors={["#007537", "#4CAF50"]}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.text}>Đăng nhập</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    // Đặt chiều rộng cụ thể
    height: 50, // Đặt chiều cao cụ thể
    borderRadius: 25, // Làm bo tròn góc
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white", // Đặt màu chữ để dễ nhìn
  },
});
