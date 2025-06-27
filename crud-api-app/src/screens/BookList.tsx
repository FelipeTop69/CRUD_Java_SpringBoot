import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { BooktackParamsList } from "../navigations/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type BookScreenNavigationProp = NativeStackNavigationProp<
  BooktackParamsList,
  "BookList"
>;

const HomeScreen = () => {
  const navigation = useNavigation<BookScreenNavigationProp>();
  return (
    <View>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate("BookRegister")}
      >
        <Text>Add book</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate("BookUpdate", { id: "1" })}
      >
        <Text>Update Book</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  touch: {
    margin: 5,
    backgroundColor: "#1e90ff", // azul tipo botón
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // sombra en Android
    width: 150,
  },
});

export default HomeScreen;
