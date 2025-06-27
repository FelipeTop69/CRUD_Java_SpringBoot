import React, { useState } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import BookForm from "../components/BookForm";
import { createBook } from "../api/apiBook";
import { IBook } from "../api/types/IBook";

const BookRegisterScreen = () => {
 const [form, setForm] = useState<IBook>({
    id_book: "",
    title: "",
    author: "",
    publisher: "",
    description: "",
    isbn: "",
    stock: "",
    status: "",
    state_book: "",
  });
  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  const registerBook = async () => {
    const register = await createBook(form);
    alert("Register OK");
  };

  return (
    <View>
      <BookForm form={form} handleChange={handleChange} />
      <Button title="Save" onPress={registerBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    textAlign: "center",
  },
});

export default BookRegisterScreen;
