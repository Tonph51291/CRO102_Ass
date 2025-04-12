import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import UIHeader from "@/components/UIHeader";
import ItemInputPayMent from "@/components/ItemInputPayMent";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/useSlice";

export default function SettingProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [diaChi, setDiaChi] = useState(user.diaChi || "");
  const [sdt, setSDT] = useState(user.soDienThoai);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDiaChi, setErrorDiaChi] = useState("");
  const [errorSDT, setErrorSDT] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const hasChanged =
      name !== user.name ||
      email !== user.email ||
      diaChi !== user.diaChi ||
      sdt !== user.soDienThoai;

    setIsChanged(hasChanged);
  }, [name, email, diaChi, sdt]);

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

  const submitThongTin = async () => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isDiaChiValid = validateDiaChi();
    const isSDTValid = validateSDT();

    if (isNameValid && isEmailValid && isDiaChiValid && isSDTValid) {
      try {
        const updatedUser = {
          ...user,
          name,
          email,
          diaChi,
          soDienThoai: sdt,
        };

        const resultAction = await dispatch(updateUser(updatedUser));

        if (updateUser.fulfilled.match(resultAction)) {
          Alert.alert("Thành công", "Thông tin người dùng đã được cập nhật");
        } else {
          Alert.alert("Lỗi", "Cập nhật thông tin thất bại");
        }
      } catch (error) {
        Alert.alert("Lỗi", "Đã xảy ra lỗi khi cập nhật thông tin");
        console.error("Cập nhật thất bại:", error);
      }
    }
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
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isChanged ? "#007537" : "#ccc" },
          ]}
          onPress={submitThongTin}
        >
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
