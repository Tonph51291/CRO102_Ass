import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UIHeader from "@/components/UIHeader";
import ItemProductSearch from "@/components/ItemProductSearch";

const SearchScreen = () => {
  const [textSearch, setTextSearch] = useState("");
  const [searchHistory, setSearchHistory] = useState([
    "Spider Plant",
    "Song of India",
  ]);

  // Xoá mục tìm kiếm
  const removeItem = (item: string) => {
    setSearchHistory(searchHistory.filter((i) => i !== item));
  };

  const handleClickItemProduct = (id: number) => {
    console.log("da click", id);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <UIHeader
        nameIconRight={require("../../assets/images/shopping-cart.png")}
        title="Search"
      />
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Tìm kiếm"
            style={styles.input}
            value={textSearch}
            onChangeText={setTextSearch}
          />
          <Ionicons name="search" size={24} color="gray" />
        </View>
        {textSearch.trim().length == 0 ? (
          <View>
            <Text style={styles.historyTitle}>Tìm kiếm gần đây</Text>

            <FlatList
              data={searchHistory}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={styles.historyItem}>
                  <Ionicons name="time-outline" size={20} color="gray" />
                  <Text style={styles.historyText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeItem(item)}>
                    <Ionicons name="close" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <ItemProductSearch onClickItem={handleClickItemProduct} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    paddingHorizontal: 30,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  input: { flex: 1, fontSize: 16, marginHorizontal: 10 },
  historyTitle: { marginTop: 20, fontSize: 16, fontWeight: "bold" },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  historyText: { flex: 1, fontSize: 16, marginLeft: 10 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default SearchScreen;
