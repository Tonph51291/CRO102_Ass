import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "@/app/screens/Login";
import UITab from "./UITab";
import ProductDetailScreen from "@/app/screens/ProductDetailsScreen";
import RegularScreen from "@/app/screens/RegularScreen";
import DangKy from "@/app/screens/DangKy";
import PayMentScreen from "@/app/screens/PayMentScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="DangKy" component={DangKy} />

      <Stack.Screen name="UITab" component={UITab} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="RegularScreen" component={RegularScreen} />
      <Stack.Screen name="PayMentScreen" component={PayMentScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
