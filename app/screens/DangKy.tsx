import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { FONTFAMILY } from "@/theme/theme";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ItemInput from "@/components/ItemInput";
import CustomButton from "@/components/CustomButton";

export default function DangKy() {
  const [hoTen, setHoTen] = useState("");
  const [email, setEmail] = useState("");
  const [soDT, setSoDT] = useState("");

  const [password, setPassword] = useState("");
  const handleDangNhap = () => {
    alert("Chuyen sang dang nhap");
  };
  return (
    <View style={{ alignItems: "center" }}>
      <StatusBar hidden={true} />
      <Image
        style={{ width: "100%", marginTop: -50 }}
        source={require("../../assets/images/imageLogin.png")}
      />
      <Text style={styles.textHeader}>Đăng ký</Text>

      <Text style={styles.textLogin}>Tạo tài khoản </Text>
      <ItemInput
        isPass={false}
        value={hoTen}
        placeholder="Họ và tên"
        onTextChange={(text) => setHoTen(text)}
      />
      <ItemInput
        isPass={false}
        value={email}
        placeholder="Email"
        onTextChange={(text) => setEmail(text)}
      />
      <ItemInput
        isPass={false}
        value={soDT}
        placeholder="Số điện thoại"
        onTextChange={(text) => setSoDT(text)}
      />
      <ItemInput
        isPass={true}
        value={password}
        placeholder="Password"
        onTextChange={(text) => setPassword(text)}
      />
      <View style={styles.containerText}>
        <Text style={styles.text}>
          Để đăng ký tài khoản, bạn đồng ý{" "}
          <Text style={styles.linkText}>Terms & Conditions</Text>
          and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>

      <CustomButton />
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Hoặc</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require("../../assets/images/google.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="facebook" size={32} color="#1877F2" />
        </TouchableOpacity>
      </View>

      {/* Đăng ký tài khoản */}
      <View style={styles.registerContainer}>
        <Text style={styles.text}>Tôi đã có tài khoản</Text>

        <Text style={styles.registerText} onPress={() => handleDangNhap()}>
          {" "}
          Đăng nhập
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20, // Đẩy xuống một chút
  },
  textHeader: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    fontFamily: FONTFAMILY.poppins_regular,
  },
  textLogin: {
    fontSize: 18,
    color: "black",
    fontFamily: FONTFAMILY.poppins_regular,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#4CAF50",
  },
  orText: {
    marginHorizontal: 10,
    color: "#333",
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginVertical: 10,
  },

  registerContainer: {
    flexDirection: "row",
    marginTop: 15,
  },

  registerText: {
    fontSize: 16,
    color: Colors.deepGreen,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  linkText: {
    color: Colors.deepGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
  containerText: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
});
