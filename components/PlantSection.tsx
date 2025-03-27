import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import ItemProduct from "./ItemProduct";
import index from "@/app/(tabs)";

const { width, height } = Dimensions.get("window");
export default function PlantSection({ arr }: { arr: any }) {
  return (
    <View>
      {arr.map((item: any, index: any) => {
        console.log(item);
        return (
          <View key={index} style={styles.containerItem}>
            <Text style={styles.textTitle}>{index}</Text>
            <FlatList
              data={arr}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              columnWrapperStyle={styles.row}
              keyExtractor={(item, index) => index.toString()} // Sử dụng index làm key
              numColumns={2} // Hiển thị 2 cột
              renderItem={({ item }) => (
                <ItemProduct item={item} nestedScrollEnabled={true} />
              )}
            />
            <Text>Nhan vao day</Text>
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
