import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import UIHeader from "@/components/UIHeader";
import CartItem from "@/components/CartItem";
import { MaterialIcons } from "@expo/vector-icons";
import { Modal } from "react-native";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addProductToPayment } from "@/store/paymentSlice";

const CartScreen = ({ navigation }: any) => {
  const cart = useSelector((state: RootState) => state.cart.carts);
  const dispatch = useDispatch<AppDispatch>();
  const [chooseCart, setChooseCart] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>();

  const firstCart = cart[0];
  useEffect(() => {
    const total = firstCart?.cart?.reduce((total, item) => {
      if (chooseCart.includes(item.product.id)) {
        return total + item.product.price * item.quantity; // Tính giá của sản phẩm đã chọn
      }
      return total;
    }, 0);

    setTotalPrice(total || 0); // Cập nhật totalPrice
  }, [chooseCart, firstCart?.cart]);

  firstCart.cart.map((item, index) => {});

  const removeItem = (id: string) => {
    //setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, amount: number) => {};

  const chooseProduct = (id: string) => {
    setChooseCart((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };
  const handleGoBackHome = () => {
    navigation.goBack();
  };

  const handleThanhToan = () => {
    const selectedItems = firstCart.cart.filter((item) =>
      chooseCart.includes(item.product.id)
    );
    console.log(selectedItems);

    if (chooseCart.length === 0) return;
    setModalVisible(true);
  };
  // thieu quantity them  cai khac oke roi
  const handleDongY = () => {
    const selectedItems = firstCart.cart.filter((item) =>
      chooseCart.includes(item.product.id)
    );
    const productsToAdd = selectedItems.map((item) => item);
    dispatch(addProductToPayment(productsToAdd));
    navigation.navigate("PayMentScreen");
  };
  const handleHuyBo = () => setModalVisible(!isModalVisible);
  const handleDeleteAll = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, []);

  return (
    <View style={styles.container}>
      <UIHeader
        onPressLeft={handleGoBackHome}
        onPressRight={handleDeleteAll}
        title="GIỎ HÀNG"
        nameIconRight={require("../../assets/images/delete.png")}
      />
      <View style={{ flex: 8.5, backgroundColor: "white", padding: "5%" }}>
        {firstCart?.cart?.length > 0 ? (
          <FlatList
            data={firstCart.cart}
            keyExtractor={(item, index) => index + ""}
            renderItem={({ item }) => (
              <CartItem
                item={item?.product}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                chooseCart={chooseProduct}
                isChecked={chooseCart.includes(item.product.id)}
                quantity={item.quantity}
              />
            )}
          />
        ) : (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontFamily: "Lato-Regular", fontSize: 16 }}>
              Giỏ hàng trống
            </Text>
          </View>
        )}
      </View>
      <View style={{ flex: 1.5, padding: "5%", backgroundColor: "white" }}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Tạm tính</Text>
          <Text style={styles.priceText}>{totalPrice}</Text>
        </View>
        <TouchableOpacity
          style={chooseCart.length === 0 ? styles.buttonDefault : styles.button}
          onPress={handleThanhToan}
        >
          <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
          <MaterialIcons name="chevron-right" size={20} color="white" />
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
            <Text style={styles.title}>Xác nhận xóa tất cả đơn hàng?</Text>
            <Text style={styles.subtitle}>
              Thao tác này sẽ không thể khôi phục.
            </Text>

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
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#white",
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryText: {
    color: "#888",
    fontSize: 20,
    fontFamily: "Lato-Regular",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Lato-Regular",
  },
  button: {
    backgroundColor: "#007537",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  buttonDefault: {
    backgroundColor: "#ABABAB",
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    flex: 1,
    marginRight: 8,
    fontFamily: "Lato-Regular",
  },
  dialogContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
    textAlign: "center",
  },
  confirmButton: {
    width: "70%",
    marginVertical: 5,
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
});
