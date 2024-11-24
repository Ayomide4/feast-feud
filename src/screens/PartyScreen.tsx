import React, { useRef } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../assets/svg/search";
import NavBar from "../components/navbar";
import Review from "../components/review";
import Card from "../components/card";

//FIXME: fix flatlist scrollview issue
//FIXME: use margin on cards instead of padding on container around cards?
//TODO: use flatlist for lazy loading etc

export default function PartyScreen() {
  const reviewRef = useRef<TextInput>(null);
  const focusInput = () => {
    if (reviewRef.current) {
      reviewRef.current.focus();
    }
  };

  const dishes = [
    {
      dishName: "Mac & Cheese",
      creator: "Ayo",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/mac.png"),
      category: "Main Dish",
    },
    {
      dishName: "Bacon Cheese Fries",
      creator: "Zay",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/bacon.jpg"),
      category: "Appetizer",
    },
    {
      dishName: "Pasta",
      creator: "Sike",
      profileImg: require("../../assets/me.jpg"),
      dishImg: require("../../assets/pasta.jpg"),
      category: "Main Dish",
    },
  ];

  const renderDishes = dishes.map((dish, index) => {
    const scale = 1 - index * 0.05; // Reduce size progressively
    const zIndex = dishes.length - index;

    return (
      <Card
        dishTitle={dish.dishName}
        profileImg={dish.profileImg}
        dishImg={dish.dishImg}
        category={dish.category}
        scale={scale}
        zIndex={zIndex}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            color: "#fff",
            fontSize: 25,
            marginVertical: 20,
          }}
        >
          Ayo's Friendsgiving
        </Text>
      </View>
      <View style={styles.mainContainer}>
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
            {/* <View style={{ position: "relative" }}>{renderDishes}</View> */}
            {/**/}
            {/* <Card */}
            {/*   dishTitle={dishes[0].dishName} */}
            {/*   profileImg={dishes[0].profileImg} */}
            {/*   dishImg={dishes[0].dishImg} */}
            {/*   category={dishes[0].category} */}
            {/* /> */}

            <FlatList
              data={dishes}
              contentContainerStyle={{
                width: "100%",
                height: 600,
                position: "relative",
              }}
              style={{}}
              keyExtractor={(item, index) => index.toString()} // Ensures unique keys
              renderItem={(
                { item, index }, // Correct destructuring
              ) => {
                const scale = new Animated.Value(1 - index * 0.05); // Reduce size progressively
                const offsetX = new Animated.Value(index * 20);
                const zIndex = dishes.length - index;

                return (
                  <Card
                    dishTitle={item.dishName}
                    profileImg={item.profileImg}
                    dishImg={item.dishImg}
                    category={item.category}
                    scale={scale}
                    offsetX={offsetX}
                    zIndex={zIndex}
                  />
                );
              }}
            />

            <Review ref={reviewRef} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <NavBar />
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
