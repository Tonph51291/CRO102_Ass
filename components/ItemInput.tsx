import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
interface CustomInputProps {
  placeholder: string;
  value: string;
  onTextChange: (text: string) => void;
  isPass?: boolean;
}
export default function ItemInput({
  placeholder,
  value,
  onTextChange,
  isPass,
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPass, setIsShowPass] = useState(false);
  console.log(isPass);

  return (
    <View style={[styles.containerInput, isFocused && styles.inputFocused]}>
      <TextInput
        placeholder={placeholder}
        style={styles.styleInput}
        secureTextEntry={isPass ? !isShowPass : isPass}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChangeText={(text) => onTextChange(text)}
      />
      {isPass && (
        <>
          <MaterialIcons
            name={isShowPass ? "visibility-off" : "visibility"}
            style={styles.iconInput}
            onPress={() => setIsShowPass(!isShowPass)}
            size={22}
            color="gray"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  styleInput: {
    flex: 1,
    fontSize: 17,
    paddingVertical: 10,
  },
  iconInput: {
    marginLeft: 10,
  },
  inputFocused: {
    borderColor: Colors.deepGreen,
  },
});
