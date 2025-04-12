import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import UIHeader from "@/components/UIHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Profile({ navigation }: any) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <View style={{ flex: 1 }}>
      <UIHeader title="Profile" />
      <View style={styles.container}>
        {/* Phần Avatar và Thông Tin */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://i.pinimg.com/originals/cd/cb/0c/cdcb0cb30bc700c53f12eff840156b29.jpg",
            }} // Thay bằng ảnh avatar thực tế
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        </View>

        {/* Phần Menu Chính */}
        <Text style={styles.sectionTitle}>Chung</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("SettingProfile")}
        >
          <Text style={styles.menuText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Lịch sử giao dịch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Q & A</Text>
        </TouchableOpacity>

        {/* Phần Chính Sách */}
        <Text style={styles.sectionTitle}>Bảo mật và Điều khoản</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Chính sách quyền riêng tư</Text>
        </TouchableOpacity>

        {/* Đăng Xuất */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lato-Regular",
  },
  email: {
    fontSize: 14,
    color: "gray",
    fontFamily: "Lato-Regular",
  },
  sectionTitle: {
    fontSize: 20,

    color: "gray",
    marginTop: 20,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    fontFamily: "Lato-Regular",
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 20,
    color: "black",
    fontFamily: "Lato-Regular",
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    fontSize: 20,
    color: "red",
    fontFamily: "Lato-Regular",
  },
});
