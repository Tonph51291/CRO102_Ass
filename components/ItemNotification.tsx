import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ItemNotification({ item }: any) {
  return (
    <View style={styles.notificationContainer}>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.notificationItem}>
        <Image
          source={require("../assets/images/image5.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.successText}>{item.title}</Text>
          <Text style={styles.productText}>
            {item.product} |{" "}
            <Text style={styles.statusText}>{item.status}</Text>
          </Text>
          <Text style={styles.quantityText}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  date: {
    fontSize: 18,
    color: "black",
    marginBottom: 8,
    fontFamily: "Lato-Regular",
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  successText: {
    color: "green",
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    fontSize: 18,
  },
  productText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  statusText: {
    color: "#888",
    fontSize: 15,
    fontFamily: "Lato-Regular",
  },
  quantityText: {
    fontSize: 15,
    color: "#444",
    fontFamily: "Lato-Regular",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
