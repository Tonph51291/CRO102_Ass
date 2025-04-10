import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import UIHeader from "@/components/UIHeader";
import ItemProductPayment from "@/components/ItemProductPayment";

export default function NotificationPayMent() {
  const [item, setCart] = useState([
    {
      id: 1,
      name: "Spider Plant",
      category: "Ưa bóng",
      price: 250000,
      quantity: 2,
      image: require("../../assets/images/image5.png"),
    },
    {
      id: 2,
      name: "Spider Plant",
      category: "Ưa bóng",
      price: 250000,
      quantity: 2,
      image: require("../../assets/images/image5.png"),
    },
  ]);
  return (
    <View style={styles.container}>
      <UIHeader title={"Thông báo"} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Thông tin khách hàng</Text>
        </View>
        <Text style={styles.text}>Bùi Duy Tôn</Text>
        <Text style={styles.text}>tonbdph51291@gmail.com</Text>
        <Text style={styles.text}>Tân Xã , Thạch Thất</Text>
        <Text style={styles.text}>000000000000000</Text>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Phương thức vận chuyển</Text>
        </View>
        <Text style={styles.text}>Giao hàng nhanh - 15.000</Text>
        <Text style={styles.text}>Ngày giao dự kiến</Text>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Hình thức thanh toán</Text>
        </View>
        <Text style={styles.text}>Thẻ VISA/MASTERCARD</Text>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Hình thức thanh toán</Text>
        </View>
        {/* <ItemProductPayment item={item[0]} />
        <ItemProductPayment item={item[0]} /> */}
      </ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.dialogContainer}>
          <View style={styles.paymentInfo}>
            <Text style={styles.title}>Đã thanh toán</Text>
            <Text style={styles.subtitle}>500000</Text>
          </View>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.buttonText}>Xem Cẩm nang trồng cây</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Quay về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: "5%",
    paddingBottom: 200, // Đảm bảo không bị che bởi footer
  },
  containerThongTin: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    marginVertical: 10,
  },
  content: {
    paddingHorizontal: "5%",
    paddingBottom: 20, // Giúp có khoảng cách khi cuộn
  },
  textThongTin: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    marginBottom: 10,
  },
  text: {
    color: "#7D7B7B",
    fontSize: 17,
    marginTop: 5,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    alignItems: "center",
    paddingVertical: 10,
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  paymentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#221F1F",
    marginVertical: 10,
    textAlign: "center",
  },
  confirmButton: {
    width: "95%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007537",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
    fontFamily: "Lato-Regular",
  },
  cancelButton: {
    width: "70%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontSize: 18,
    padding: 10,
    fontFamily: "Lato-Regular",
  },
});
