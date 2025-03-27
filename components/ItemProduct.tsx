import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
const { width, height } = Dimensions.get("window");
export default function ItemProduct(item: any) {
  return (
    <View style={styles.containerItem}>
      <Image
        source={require("../assets/images/image5.png")}
        style={styles.styleImg}
      />
      <Text style={styles.textItemName}>Spider Plant </Text>
      <Text style={styles.textItemTapTinh}>Ưa bóng </Text>
      <Text style={styles.textItemGia}>250.000 đ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  styleImg: {
    width: width * 0.41,
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
