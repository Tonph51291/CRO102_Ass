import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { Product } from "@/store/productReduces";
const { width, height } = Dimensions.get("window");
export default function ItemProduct({ item, onPressDetails }: any) {
  return (
    <TouchableOpacity style={styles.containerItem} onPress={onPressDetails}>
      <Image source={{ uri: item.image[0] }} style={styles.styleImg} />
      <Text style={styles.textItemName}>{item.name} </Text>
      <Text style={styles.textItemTapTinh}>{item.category} </Text>
      <Text style={styles.textItemGia}>{item.price}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  styleImg: {
    width: width * 0.41,
    height: width * 0.41,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
  },
  textItemName: { fontFamily: "Lato-Regular", fontSize: 18, marginTop: 5 },
  textItemTapTinh: { fontFamily: "Lato-Regular", fontSize: 16, marginTop: 5 },
  textItemGia: {
    fontFamily: "Lato-Regular",
    fontSize: 18,
    color: Colors.darkGreen,
    marginTop: 5,
  },
  containerItem: {
    marginVertical: 10,
  },
});
