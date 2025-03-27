import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import Login from "../screens/Login";
import DangKy from "../screens/DangKy";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProductDetailScreen from "../screens/ProductDetailsScreen";
import NotificationScreen from "../screens/NotificationScreen";
import RegularScreen from "../screens/RegularScreen";
import CartScreen from "../screens/CartScreen";

export default function index() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return <CartScreen />;
}

const styles = StyleSheet.create({});
