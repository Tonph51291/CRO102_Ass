import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import UIHeader from "@/components/UIHeader";
import ItemInputPayMent from "@/components/ItemInputPayMent";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createBankCard, fetchCardBankByUserId } from "@/store/cardBank";
import { createPayment } from "@/store/paymentSlice";
import { deleteProductToCart } from "@/store/cartSlice";

export default function PaymentMethodScreen({ navigation }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const userId = useSelector((state: RootState) => state.user.id);
  const cardBank = useSelector((state: RootState) => state.cardBank.cards);
  const product = useSelector((state: RootState) => state.payment.products);
  const totalPrice = useSelector(
    (state: RootState) => state.payment.totalPrice
  );
  console.log("cardBank", JSON.stringify(cardBank));
  const [isModalVisible, setModalVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState(cardBank?.cardNumber || "");
  const [cardHolder, setCardHolder] = useState(cardBank?.cardHolder || "");
  const [expiryDate, setExpiryDate] = useState(cardBank?.expiryDate || "");

  const [cardNumberError, setCardNumberError] = useState("");
  const [cardHolderError, setCardHolderError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");

  useEffect(() => {
    dispatch(fetchCardBankByUserId(userId));
  }, []);

  const handleSubmit = () => {};

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCardNumberChange = (text: string) => {
    setCardNumber(text);
    if (text.length !== 16) {
      setCardNumberError("Số thẻ phải có 16 chữ số.");
    } else {
      setCardNumberError("");
    }
  };

  const handleCardHolderChange = (text: string) => {
    setCardHolder(text);
    if (text.trim() === "") {
      setCardHolderError("Tên chủ thẻ không được để trống.");
    } else {
      setCardHolderError("");
    }
  };

  const handleExpiryDateChange = (text: string) => {
    setExpiryDate(text);
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(text)) {
      setExpiryDateError("Ngày hết hạn phải có định dạng MM/YY.");
    } else {
      setExpiryDateError("");
    }
  };

  const handleDongY = async () => {
    if (!cardNumber || !cardHolder || !expiryDate) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin thẻ!");
      return;
    }

    if (!cardBank) {
      const newCardBank = {
        idUser: userId,
        cardNumber,
        cardHolder,
        expiryDate,
      };

      try {
        await dispatch(createBankCard(newCardBank));
        navigation.navigate("NotificationPayMent");
      } catch (error) {
        Alert.alert("Lỗi", "Không thể tạo thẻ. Vui lòng thử lại sau.");
      }
    }
    setModalVisible(false);
    const newPayMent = {
      uid: userId,
      totalPrice: totalPrice,
      createdAt: new Date().toISOString(),
      products: product,
    };
    dispatch(createPayment(newPayMent));
    dispatch(deleteProductToCart(product));
    navigation.navigate("NotificationPayMent");
  };
  const handleHuyBo = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <UIHeader title="Thanh toán" onPressLeft={handleGoBack} />
      <ScrollView style={{ padding: "5%" }}>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Thông tin khách hàng</Text>
        </View>
        <ItemInputPayMent
          placeholder="Nhập số thẻ"
          value={cardNumber}
          error={cardNumberError}
          onTextChange={handleCardNumberChange}
        />
        <ItemInputPayMent
          placeholder="Tên chủ thẻ"
          value={cardHolder}
          error={cardHolderError}
          onTextChange={handleCardHolderChange}
        />
        <ItemInputPayMent
          placeholder="Ngày hết hạn (MM/YY)"
          value={expiryDate}
          error={expiryDateError}
          onTextChange={handleExpiryDateChange}
        />
        <View style={{ width: "30%", marginBottom: 10 }}>
          <TextInput style={styles.styleInput} />
          <MaterialIcons
            name="error-outline"
            color={"#7D7B7B"}
            size={20}
            style={{ position: "absolute", top: 20, end: 0 }}
          />
        </View>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Thông tain khách hàng</Text>
        </View>
        <Text style={styles.text}>{user.name}</Text>
        <Text style={styles.text}>{user.email}</Text>
        <Text style={styles.text}>{user.diaChi}</Text>
        <Text style={styles.text}>{user.soDienThoai}</Text>
        <View style={styles.containerThongTin}>
          <Text style={styles.textThongTin}>Phương thức vận chuyển</Text>
        </View>
        <Text style={styles.text}>Giao hàng nhanh - 15.000</Text>
        <Text style={styles.text}>Ngày giao dữ kiến</Text>
      </ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.text2}>Tạm tính</Text>
          <Text style={styles.price}>900đ</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text2}>Phí vận chuyển</Text>
          <Text style={styles.price}>9000đ</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.textBold}>Tổng cộng</Text>
          <Text style={styles.priceBold}>{totalPrice}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>TIẾP TỤC</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            padding: 10,
          }}
        >
          <View style={styles.dialogContainer}>
            <Text style={styles.title}>Xác nhận thanh toán ? </Text>

            <TouchableOpacity
              onPress={handleDongY}
              style={styles.confirmButton}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  padding: 10,
                  fontFamily: "Lato-Regular",
                }}
              >
                Đồng ý
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleHuyBo} style={styles.cancelButton}>
              <Text
                style={{
                  fontSize: 18,
                  padding: 10,
                  fontFamily: "Lato-Regular",
                }}
              >
                Hủy bỏ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerThongTin: {
    borderBottomWidth: 1,
    borderColor: "black",
    width: "100%",
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
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
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
  text2: {
    fontSize: 16,
    color: "#666",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: { fontSize: 18, textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,

    textAlign: "center",
  },
  confirmButton: {
    width: "70%",
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007537",
    borderRadius: 5,
  },
  cancelButton: {
    width: "70%",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  styleInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    fontSize: 15,
  },
});
