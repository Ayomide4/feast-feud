import React, { useRef, useState, useEffect } from "react";
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
import NavBar from "../components/navbar";
import Review from "../components/review";
import Modal from "../components/modal";
import DishScrollStack from "../components/DishScrollStack";
import OnboardingSwipeInstructions from "../components/OnboardingSwipeInstructions";
import { useOnboarding } from "../hooks/UseOnboarding";
import { SearchProvider } from "../contexts/SearchProvider";
import DishSearchBar from "../components/DishSearchBar";
import { getDishes } from "../api";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function PartyScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showOnboarding, finishOnboarding } = useOnboarding();
  const reviewRef = useRef<TextInput>(null);
  const [currentDish, setCurrentDish] = useState<Dish | undefined>(undefined);

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set up the real-time listener
    const dishesQuery = query(
      collection(db, "dishes"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      dishesQuery,
      (snapshot) => {
        const updatedDishes: Dish[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Dish[]),
        }));

        setDishes(updatedDishes); // Update the state with the latest dishes
        setIsLoading(false);
        console.log("start", updatedDishes[0]);
        setCurrentDish(updatedDishes[0]);
      },
      (error) => {
        console.error("Error fetching real-time updates:", error);
        setIsLoading(false);
      },
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {showOnboarding && (
          <OnboardingSwipeInstructions onFadeOutComplete={finishOnboarding} />
        )}
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 25,
              marginVertical: 20,
              marginLeft: 25,
            }}
          >
            Ayo's Friendsgiving
          </Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SearchProvider dishes={dishes} setDishes={setDishes}>
              <DishSearchBar />
              <DishScrollStack setCurrentDish={setCurrentDish} />
            </SearchProvider>

            <Review ref={reviewRef} currentDish={currentDish} dishes={dishes} />
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
});
