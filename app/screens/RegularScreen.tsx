import ItemProduct from "@/components/ItemProduct";
import UIHeader from "@/components/UIHeader";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const category = ["Tất cả", "Hàng Mới Về", "Ưa sáng", "Ưa bóng"];

export default function RegularScreen({ navigation, route }: any) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");

  const { products } = route.params; // Nhận products từ params
  const handleBackHome = () => {
    navigation.goBack();
  };
  const handleDetails = (item: any) => {
    navigation.navigate("ProductDetail", { item });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UIHeader
        nameIconRight={require("../../assets/images/shopping-cart.png")}
        title="Cây trồng"
        onPressLeft={handleBackHome}
      />
      <FlatList
        data={category}
        keyExtractor={(item) => item}
        horizontal={true}
        style={{ height: 50 }}
        renderItem={({ item }) => {
          const isSelected = item === selectedCategory;
          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[
                styles.button,
                { backgroundColor: isSelected ? "#009245" : "white" },
              ]}
            >
              <Text
                style={{
                  color: isSelected ? "white" : "#7D7B7B",
                  fontFamily: "Lato-Regular",
                  fontSize: 18,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <FlatList
        data={products}
        columnWrapperStyle={styles.row}
        keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
        numColumns={2} // Hiển thị 2 cột
        renderItem={({ item }) => (
          <ItemProduct
            onPressDetails={handleDetails}
            item={item}
            nestedScrollEnabled={true}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
