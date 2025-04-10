import { StatusBar, StyleSheet, Text, View } from "react-native";
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
import PayMentScreen from "../screens/PayMentScreen";
import UITab from "@/navigation/UITab";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import App from "@/navigation/App";
import PaymentMethodScreen from "../screens/PaymentMethodScreen";
import NotificationPayMent from "../screens/NotificationPayMent";
import Profile from "../screens/Profile";
import SettingProfile from "../screens/SettingProfile";

export default function index() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Lato-Regular": require("../../assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const styles = StyleSheet.create({});
