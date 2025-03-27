import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import ItemProduct from "@/components/ItemProduct";
import PlantSection from "@/components/PlantSection";

const { width, height } = Dimensions.get("window");

const handleCart = () => {
  alert("cart ");
};
const handleHangMoi = () => {
  alert("Hàng mới");
};

export default function HomeScreen() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.imageBanner}
        source={require("../../assets/images/banner.png")}
        resizeMode="cover" // Thêm để ảnh hiển thị đúng
      >
        <Text style={styles.textBanner}>
          Planta - toả sáng không gian nhà bạn
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.textHangMoi}>Xem hàng mới về</Text>
          <MaterialIcons
            name="arrow-forward"
            size={20}
            color={Colors.deepGreen}
            style={{ marginLeft: 10, marginVertical: 20 }}
            onPress={() => handleHangMoi()}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonCart}
          onPress={() => handleCart()}
        >
          <Image source={require("../../assets/images/shopping-cart.png")} />
        </TouchableOpacity>
      </ImageBackground>

      <PlantSection arr={arr} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageBanner: {
    width: width, // Sử dụng width của màn hình
    height: height * 0.3, // Ví dụ: 30% chiều cao màn hình
    padding: 10,
  },
  textBanner: {
    fontSize: 24,
    width: "70%",
  },
  textHangMoi: {
    color: Colors.deepGreen,
    fontSize: 19,
  },
  buttonCart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 10,
    right: 20,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: width * 0.08,
  },
});
