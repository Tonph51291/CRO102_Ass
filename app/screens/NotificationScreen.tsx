import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import UIHeader from "@/components/UIHeader";
import ItemNotification from "@/components/ItemNotification";
const notifications = [
  {
    id: "1",
    date: "Thứ tư, 03/09/2021",
    image:
      "https://cdn.shopify.com/s/files/1/0251/8942/4401/products/spider-plant.jpg?v=1591707449",
    title: "Đặt hàng thành công",
    product: "Spider Plant",
    status: "Ủa bóng",
    quantity: "2 sản phẩm",
  },
];

export default function NotificationScreen() {
  return (
    <SafeAreaView>
      <UIHeader title={"Thông báo"} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={notifications}
        renderItem={({ item }) => <ItemNotification item={item } />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
