import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ItemProduct from "./ItemProduct";
import index from "@/app/(tabs)";

const { width, height } = Dimensions.get("window");
export default function PlantSection({
  products,
  onPressXemThem,
  onPressDetails,
}: {
  products: any;
  onPressXemThem: () => void;
  onPressDetails: () => void;
}) {
  const type = [...new Set(products.map((item: any) => item.type))];

  return (
    <View>
      {type.map((type, index) => {
        const filteredProducts = products.filter(
          (item: any) => item.type === type
        );

        return (
          <View key={type + ""} style={styles.containerItem}>
            <Text style={styles.textTitle}>{type}</Text>
            <FlatList
              data={filteredProducts}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
              keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
              numColumns={2} // Hiển thị 2 cột
              renderItem={({ item }) => (
                <ItemProduct
                  item={item}
                  nestedScrollEnabled={true}
                  onPressDetails={onPressDetails}
                />
              )}
            />
            <TouchableOpacity
              style={{
                width: "100%",
                alignItems: "flex-end",
                marginVertical: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, fontFamily: "Lato-Regular" }}
                onPress={() => onPressXemThem()}
              >
                Xem thêm {type}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  containerItem: {
    paddingHorizontal: width * 0.08,
  },
  row: {
    justifyContent: "space-between",
  },
  textTitle: {
    fontSize: 24,
    fontFamily: "Lato-Regular",
    marginVertical: 5,
  },
});
