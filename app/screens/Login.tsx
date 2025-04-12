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
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseconfig";
import { useDispatch, useSelector } from "react-redux";
import { getUser, setUser } from "@/store/useSlice";
import { RootState } from "@/store/store";

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState("tonbuiduy@gmail.com");
  const [password, setPassword] = useState("123456");
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Vui lòng nhập email và mật khẩu!");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      const user = userCredential.user;

      const users = await getUser(user.uid);

      const userData = {
        id: users.id,
        uid: user.uid,
        name: user.displayName || "", // Firebase có thể không có tên nếu chưa cập nhật
        email: user.email || "",
        soDienThoai: users.soDienThoai || "", // Firebase không lưu số điện thoại, bạn có thể lấy từ nơi khác
        diaChi: users.diaChi || "",
      };

      dispatch(setUser(userData));

      navigation.navigate("UITab");
    } catch (error: any) {
      console.log("Firebase login error:", error.code, error.message);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <StatusBar hidden={true} />
      <Image
        style={{ width: "100%", marginTop: -50 }}
        source={require("../../assets/images/dangnhap.png")}
      />
      <Text style={styles.textHeader}>Chào mừng bạn</Text>

      <Text style={styles.textLogin}>Đăng nhập tài khoản</Text>
      <ItemInput
        isPass={false}
        value={email}
        placeholder="Email"
        onTextChange={(text) => setEmail(text)}
      />
      <ItemInput
        isPass={true}
        value={password}
        placeholder="Password"
        onTextChange={(text) => setPassword(text)}
      />
      <View style={{ width: "90%" }}>
        <Text
          style={{ color: "#CE0000", fontFamily: "bold", marginVertical: 5 }}
        >
          Invalid email or Password . Try Again !
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "90%",
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="check-circle-outline"
            size={23}
            color={Colors.deepGreen}
          />
          <Text
            style={{ color: Colors.mediumGray, marginLeft: 10, fontSize: 18 }}
          >
            Nhớ tài khoản
          </Text>
        </View>
        <Text style={{ color: Colors.deepGreen, fontSize: 18 }}>
          Quên mật khẩu ?{" "}
        </Text>
      </View>

      <CustomButton onPress={handleLogin} />
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
        <Text style={styles.text}>Bạn không có tài khoản</Text>
        <TouchableOpacity onPress={() => navigation.navigate("DangKy")}>
          <Text style={styles.registerText}> Tạo tài khoản</Text>
        </TouchableOpacity>
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
  text: {
    fontSize: 14,
    color: "#333",
  },
  registerText: {
    fontSize: 14,
    color: "#007537",
    fontWeight: "bold",
  },
});
