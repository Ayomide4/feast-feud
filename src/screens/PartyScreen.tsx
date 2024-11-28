import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Modal from "../components/modal";

//TODO: use flatlist for lazy loading etc
//- could render the top card and second card on top of each other so when you swipe the top card the second card shows.
//-

export default function PartyScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dishes, setDishes] = useState([
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
  ]);
  const reviewRef = useRef<TextInput>(null);
  const focusInput = () => {
    if (reviewRef.current) {
      reviewRef.current.focus();
    }
  };

  // Animated value to control the horizontal transition
  const cardOffsetX = new Animated.Value(0);

  const updateIndex = (index: number, swipeDirection: string) => {
    setDishes((prevDishes) => {
      const updatedDishes = [...prevDishes];

      if (swipeDirection === "left") {
        const swipedItem = updatedDishes.splice(index, 1)[0];
        updatedDishes.push(swipedItem); // Move swiped item to the end
      } else if (swipeDirection === "right") {
        // Move the last item to the beginning
        const swipedItem = updatedDishes.pop(); // Remove the last item
        if (swipedItem) {
          updatedDishes.unshift(swipedItem); // Add it to the beginning
        }
      }
      return updatedDishes;
    });
  };

  const horizontalPan = Gesture.Pan()
    .onUpdate((event) => {
      // Animate horizontal movement
      cardOffsetX.setValue(event.translationX);
    })
    .onEnd((event) => {
      // Determine swipe direction based on translationX
      if (event.translationX < -50) {
        console.log("swipe left");
        updateIndex(0, "left");
      } else if (event.translationX > 50) {
        console.log("swipe right");
        updateIndex(0, "right");
      } else {
        console.log("no significant swipe detected");
      }
    })
    .activeOffsetX([-10, 10]) // Respond to significant horizontal movements
    .failOffsetY([-10, 10]); // Allow vertical gestures to pass through

  // Scroll Gesture
  const scrollGesture = Gesture.Native();

  // Combine both gestures
  const combinedGesture = Gesture.Simultaneous(scrollGesture, horizontalPan);

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

            <View>
              <FlatList
                data={dishes}
                scrollEnabled={false}
                contentContainerStyle={{
                  width: "100%",
                  height: 600,
                  position: "relative",
                }}
                keyExtractor={(item, index) => index.toString()} // Ensures unique keys
                renderItem={(
                  { item, index }, // Correct destructuring
                ) => {
                  const scale = new Animated.Value(1 - index * 0.05); // Reduce size progressively
                  const offsetX = new Animated.Value(index * 20);
                  const zIndex = dishes.length - index;

                  return (
                    <GestureDetector gesture={combinedGesture}>
                      <Card
                        dishTitle={item.dishName}
                        profileImg={item.profileImg}
                        dishImg={item.dishImg}
                        category={item.category}
                        scale={scale}
                        offsetX={offsetX}
                        zIndex={zIndex}
                      />
                    </GestureDetector>
                  );
                }}
              />
              {/* <Card */}
              {/*   dishTitle={dishes[1].dishName} */}
              {/*   profileImg={dishes[1].profileImg} */}
              {/*   dishImg={dishes[1].dishImg} */}
              {/*   category={dishes[1].category} */}
              {/* /> */}
              {/* <View */}
              {/*   style={{ */}
              {/*     backgroundColor: "#E8E8FB", */}
              {/*     height: 500, */}
              {/*     width: "90%", */}
              {/*     position: "absolute", */}
              {/*     borderRadius: 20, */}
              {/*     left: 20, */}
              {/*     top: 20, */}
              {/*     transform: [{ scaleY: 0.95 }], */}
              {/*     zIndex: -1, */}
              {/*     shadowColor: "#171717", */}
              {/*     shadowOffset: { width: 5, height: 0 }, */}
              {/*     shadowOpacity: 0.3, */}
              {/*     shadowRadius: 3, */}
              {/*   }} */}
              {/* /> */}
              {/* <View */}
              {/*   style={{ */}
              {/*     backgroundColor: "#E8E8FB", */}
              {/*     height: 500, */}
              {/*     width: "90%", */}
              {/*     position: "absolute", */}
              {/*     borderRadius: 20, */}
              {/*     left: 30, */}
              {/*     top: 20, */}
              {/*     transform: [{ scaleY: 0.9 }], */}
              {/*     zIndex: -2, */}
              {/*     shadowColor: "#171717", */}
              {/*     shadowOffset: { width: 5, height: 0 }, */}
              {/*     shadowOpacity: 0.3, */}
              {/*     shadowRadius: 3, */}
              {/*   }} */}
              {/* /> */}
            </View>

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
