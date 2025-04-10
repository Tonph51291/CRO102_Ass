import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import UIHeader from "@/components/UIHeader";
import ItemInputPayMent from "@/components/ItemInputPayMent";

export default function SettingProfile() {
  const [name, setName] = useState("Bùi Duy Tôn");
  const [email, setEmail] = useState("tonbdph51291@gmial.com");
  const [diaChi, setDiaChi] = useState("Tân Xã , Thạch Thất , Hà Nội");
  const [sdt, setSDT] = useState("0972179185");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDiaChi, setErrorDiaChi] = useState("");
  const [errorSDT, setErrorSDT] = useState("");
  const [item, setCart] = useState([
    {
      id: 1,
      name: "Spider Plant",
      category: "Ưa bóng",
      price: 250000,
      quantity: 2,
      image: require("../../assets/images/image5.png"),
    },
  ]);
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
  return (
    <View style={{ flex: 1 }}>
      <UIHeader title="Chỉnh sửa thông tin" />
      <View style={{ alignItems: "center" }}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg",
          }} // Thay bằng ảnh avatar thực tế
          style={styles.avatar}
        />
        <Text style={styles.styleText}>
          Thông tin sẽ được lưu cho lần mua kế tiếp. Bấm vào thông tin chi tiết
          để chỉnh sửa.
        </Text>
        <View style={{ width: "90%" }}>
          <ItemInputPayMent
            placeholder="Bùi Duy Tôn"
            value={name}
            error={errorName}
            onTextChange={(text) => {
              validateName();
              setName(text);
            }}
          />
          <ItemInputPayMent
            placeholder="tonbdph51291@gmail.com"
            value={email}
            error={errorEmail}
            onTextChange={(text) => {
              validateEmail();
              setEmail(text);
            }}
          />
          <ItemInputPayMent
            placeholder="Địa chỉ"
            value={diaChi}
            error={errorDiaChi}
            onTextChange={(text) => {
              validateDiaChi();
              setDiaChi(text);
            }}
          />
          <ItemInputPayMent
            placeholder="Số điện thoại"
            value={sdt}
            error={errorSDT}
            onTextChange={(text) => {
              validateSDT();
              setSDT(text);
            }}
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 15,
    marginBottom: 30,
  },
  styleText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Lato-Regular",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007537",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "90%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
