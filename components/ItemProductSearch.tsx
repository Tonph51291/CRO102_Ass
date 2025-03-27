import React, { memo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
interface ProductType {
  onClickItem: (id: number) => void;
}

const ItemProductSearch = ({ onClickItem }: ProductType) => {
  return (
    <Pressable style={styles.container} onPress={() => onClickItem(1)}>
      <Image
        source={require("../assets/images/image5.png")} // Thay bằng đường dẫn ảnh thực tế
        style={styles.image}
      />

      <View style={styles.infoContainer}>
        <Text style={styles.productName}>Panse Đen | Hybrid</Text>
        <Text style={styles.price}>250.000đ</Text>
        <Text style={styles.stock}>Còn 156 sp</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 15,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  price: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "600",
    fontFamily: "Lato-Regular",
  },
  stock: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "Lato-Regular",
  },
});

export default memo(ItemProductSearch);
