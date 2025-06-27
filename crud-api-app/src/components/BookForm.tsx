import { IBook } from "../api/types/IBook";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

interface Props {
  form: IBook;
  handleChange: (field: keyof IBook, value: string) => void;
}

const BookForm: React.FC<Props> = ({ form, handleChange }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={form.title}
        onChangeText={(text) => handleChange("title", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={form.author}
        onChangeText={(text) => handleChange("author", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="publisher"
        value={form.publisher}
        onChangeText={(text) => handleChange("publisher", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={form.description}
        onChangeText={(text) => handleChange("description", text)}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="ISBN"
        value={form.isbn}
        onChangeText={(text) => handleChange("isbn", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock"
        value={form.stock}
        onChangeText={(text) => handleChange("stock", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Status"
        value={form.status}
        onChangeText={(text) => handleChange("status", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="State book"
        value={form.state_book}
        onChangeText={(text) => handleChange("state_book", text)}
        keyboardType="numeric"
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default BookForm;
