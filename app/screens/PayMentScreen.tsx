import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import UIHeader from "@/components/UIHeader";
import ItemInputPayment from "@/components/ItemInputPayMent";
import ShippingOption from "@/components/ShippingOption";
import PaymentOption from "@/components/PaymentOption";
import ItemProductPayment from "@/components/ItemProductPayment";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const shippingMethods = [
  { id: 1, name: "Giao hàng Nhanh", price: 15000, estimatedTime: "5-7/9" },
  { id: 2, name: "Giao hàng COD", price: 20000, estimatedTime: "4-8/9" },
];
const paymentMethods = [
  { id: 1, name: "Thẻ VISA/MASTERCARD" },
  { id: 2, name: "Thẻ ATM" },
];

export default function PayMentScreen({ navigation }: any) {
  const product = useSelector((state: RootState) => state.payment.products);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [selectedIdPayment, setSelectedIdPayment] = useState<number>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [sdt, setSDT] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDiaChi, setErrorDiaChi] = useState("");
  const [errorSDT, setErrorSDT] = useState("");
  console.log("product" + product);

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
  const handleGoBack = () => {
    navigation.goBack();
  };
  const subtotal = 500000;
  const shippingFee = 15000;
  const total = subtotal + shippingFee;

  console.log(email);
  console.log(name + "nam");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <UIHeader title="Thanh toán" onPressLeft={handleGoBack} />
      <ScrollView style={{ flex: 1, paddingHorizontal: "5%" }}>
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

        {shippingMethods.map((item) => (
          <ShippingOption
            key={item.id}
            estimatedDate={item.estimatedTime}
            name={item.name}
            isSelected={item.id == selectedId}
            onSelect={() => setSelectedId(item.id)}
            price={item.price}
          />
        ))}
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Hình thức thanh toán </Text>
        </View>
        {paymentMethods.map((item) => (
          <PaymentOption
            key={item.id}
            name={item.name}
            isSelected={selectedIdPayment === item.id}
            onSelect={() => setSelectedIdPayment(item.id)}
          />
        ))}
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Đơn hàng đã chọn</Text>
        </View>
        {product.map((item, index) => {
          return (
            <ItemProductPayment
              key={index}
              product={item.product}
              quantity={item.quantity}
            />
          );
        })}
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text}>Tạm tính</Text>
          <Text style={styles.price}>{subtotal.toLocaleString("vi-VN")}đ</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Phí vận chuyển</Text>
          <Text style={styles.price}>
            {shippingFee.toLocaleString("vi-VN")}đ
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.textBold}>Tổng cộng</Text>
          <Text style={styles.priceBold}>{total.toLocaleString("vi-VN")}đ</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>TIẾP TỤC</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerThongTin: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
    marginVertical: 20,
  },
  textThongTin: {
    fontSize: 20,
    fontFamily: "Lato-Regular",
    marginBottom: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  textBold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#333",
  },
  priceBold: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#009900",
  },
  button: {
    backgroundColor: "#007537",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
