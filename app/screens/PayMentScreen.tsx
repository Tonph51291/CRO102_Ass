import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import UIHeader from "@/components/UIHeader";
import ItemInputPayment from "@/components/ItemInputPayMent";
import ShippingOption from "@/components/ShippingOption";

export default function PayMentScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [sdt, setSDT] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDiaChi, setErrorDiaChi] = useState("");
  const [errorSDT, setErrorSDT] = useState("");
  const validateName = () => {
    if (!name.trim()) {
      setErrorName("Tên không được để trống");
      return false;
    }
    setErrorName("");
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setErrorEmail("Email không được để trống");
      return false;
    } else if (!emailRegex.test(email)) {
      setErrorEmail("Email không hợp lệ");
      return false;
    }
    setErrorEmail("");
    return true;
  };

  const validateDiaChi = () => {
    if (!diaChi.trim()) {
      setErrorDiaChi("Địa chỉ không được để trống");
      return false;
    }
    setErrorDiaChi("");
    return true;
  };

  const validateSDT = () => {
    const phoneRegex = /^(0[0-9]{9,10})$/;
    if (sdt.trim().length === 0) {
      setErrorSDT("Số điện thoại không được để trống");
      return false;
    } else if (!phoneRegex.test(sdt)) {
      setErrorSDT("Số điện thoại không hợp lệ");
      return false;
    }
    setErrorSDT("");
    return true;
  };

  console.log(email);
  console.log(name + "nam");
  return (
    <SafeAreaView style={{ flex: 1, padding: "5%" }}>
      <UIHeader title="Thanh toán" />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Thông tin khách hàng</Text>
        </View>
        <ItemInputPayment
          placeholder="Bùi Duy Tôn"
          value={name}
          error={errorName}
          onTextChange={(text) => {
            validateName();
            setName(text);
          }}
        />
        <ItemInputPayment
          placeholder="tonbdph51291@gmail.com"
          value={email}
          error={errorEmail}
          onTextChange={(text) => {
            validateEmail();
            setEmail(text);
          }}
        />
        <ItemInputPayment
          placeholder="Địa chỉ"
          value={diaChi}
          error={errorDiaChi}
          onTextChange={(text) => {
            validateDiaChi();
            setDiaChi(text);
          }}
        />
        <ItemInputPayment
          placeholder="Số điện thoại"
          value={sdt}
          error={errorSDT}
          onTextChange={(text) => {
            validateSDT();
            setSDT(text);
          }}
        />
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Phương thức vận chuyển</Text>
        </View>

        <ShippingOption />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerThongTin: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    marginBottom: 20,
  },
  textThongTin: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    marginBottom: 10,
  },
});
