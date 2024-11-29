import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../assets/svg/search";
import NavBar from "../components/navbar";
import Review from "../components/review";
import Modal from "../components/modal";
import CardScrollView from "../components/DishScrollView";

//TODO: use flatlist for lazy loading etc

export default function PartyScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishes, setDishes] = useState<Dish[]>([
    {
      dishName: "Mac & Cheese",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/mac.png"),
      category: "Main Dish",
      dishId: "",
      user: undefined,
      images: [],
      reviews: []
    },
    {
      dishName: "Bacon Cheese Fries",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/bacon.jpg"),
      category: "Appetizer",
      dishId: "",
      user: undefined,
      images: [],
      reviews: []
    },
    {
      dishName: "Pasta",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/pasta.jpg"),
      category: "Main Dish",
      dishId: "",
      user: undefined,
      images: [],
      reviews: []
    }
  ]);
  const reviewRef = useRef<TextInput>(null);
  const focusInput = () => {
    if (reviewRef.current) {
      reviewRef.current.focus();
    }
  };  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              marginVertical: 20,
              marginLeft: 20,
            }}
          >
            Ayo's Friendsgiving
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.input}>
              <Search width={20} height={20} />
              <TextInput
                style={{
                  marginLeft: 10,
                  backgroundColor: "#E8E8FB",
                  width: "90%",
                  height: 30,
                }}
                placeholder="Search here..."
                placeholderTextColor="#000"
              />
            </View>

            <CardScrollView dishes={dishes}/>

            <Review ref={reviewRef} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <NavBar setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    backgroundColor: "#3F3649",
    flex: 1,
  },

  mainContainer: {
    position: "relative",
    flex: 1,
  },

  input: {
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    marginHorizontal: 10,
    backgroundColor: "#E8E8FB",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
});
