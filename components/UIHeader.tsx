import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
interface SearchType {
  nameIconRight?: number | undefined;
  title?: string;
  onPressRight?: () => void;
  onPressLeft?: () => void;
}

const UIHeader = ({
  nameIconRight,
  title,
  onPressRight,
  onPressLeft,
}: SearchType) => {
  console.log("da load lai ui header");
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerLeft} onPress={onPressLeft}>
        <MaterialIcons name="chevron-left" size={30} />
      </TouchableOpacity>
      <View style={styles.containerCenter}>
        <Text style={styles.textTitle}>{title}</Text>
      </View>
      <View style={styles.containerRight}>
        {nameIconRight != 0 ? (
          <TouchableOpacity onPress={onPressRight}>
            <Image source={nameIconRight} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    marginBottom: 10,
    backgroundColor: "white",
  },
  containerLeft: {
    flex: 1,

    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  containerCenter: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  containerRight: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
  },
});
export default memo(UIHeader);
