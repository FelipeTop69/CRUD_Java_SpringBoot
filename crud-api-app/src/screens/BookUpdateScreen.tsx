import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { BooktackParamsList } from "../navigations/types";

type DetailsRouteProp = RouteProp<BooktackParamsList, "BookUpdate">;

const BookUpdateScreen = () => {
  const route = useRoute<DetailsRouteProp>();
  const { id } = route.params;
  return (
    <View>
      <Text>Details Screen</Text>
      <Text>User id: {id}</Text>
    </View>
  );
};

export default BookUpdateScreen;
