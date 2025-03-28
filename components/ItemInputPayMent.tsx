import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { memo, useMemo, useState } from "react";
interface CustomInputProps {
  placeholder: string;
  value?: string;
  error?: string;
  onTextChange?: (text: string) => void;
}
const ItemInputPayment = ({
  placeholder,
  value,
  error,
  onTextChange,
}: CustomInputProps) => {
  const [isError, setIsError] = useState(false);
  return (
    <View style={{ alignItems: "center" }}>
      <TextInput
        style={styles.styleInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
      />
      <Text style={styles.styleError}>{error}</Text>
    </View>
  );
};

export default memo(ItemInputPayment);

const styles = StyleSheet.create({
  styleInput: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    fontSize: 20,
  },
  styleError: {
    fontFamily: "Lato-Regular",
    color: "#FF0000",
    fontWeight: "500",
    fontSize: 20,
    marginTop: 10,
    width: "100%",
  },
});
