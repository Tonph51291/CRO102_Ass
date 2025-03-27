import React, { useCallback, useState } from "react";
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

const CartScreen = () => {
  const [cart, setCart] = useState([
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
  const [chooseCart, setChooseCart] = useState<number[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {};

  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const chooseProduct = (id: number) => {
    setChooseCart((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleThanhToan = () => {
    console.log("Thanh toán các sản phẩm:", chooseCart);
  };
  const handleDongY = () => {};
  const handleHuyBo = () => setModalVisible(!isModalVisible);
  const handleDeleteAll = useCallback(() => {
    setModalVisible(!isModalVisible);
    setCart(cart.filter((item) => !chooseCart.includes(item.id)));
    setChooseCart([]);
  }, [cart]);
  console.log(chooseCart);

  return (
    <View style={styles.container}>
      <UIHeader
        onPressRight={handleDeleteAll}
        title="GIỎ HÀNG"
        nameIconRight={require("../../assets/images/delete.png")}
      />
      <View style={{ flex: 8.5 }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              updateQuantity={updateQuantity}
              removeItem={removeItem}
              chooseCart={chooseProduct}
              isChecked={chooseCart.includes(item.id)}
            />
          )}
        />
      </View>
      <View style={{ flex: 1.5 }}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Tạm tính</Text>
          <Text style={styles.priceText}>
            {cart
              .filter((item) => chooseCart.includes(item.id))
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleThanhToan}>
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
              onPress={toggleModal}
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
    backgroundColor: "#fff",
    paddingHorizontal: 15,
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
