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
import NavBar from "../components/navbar";
import Review from "../components/review";
import Modal from "../components/modal";
import DishScrollStack from "../components/DishScrollStack";
import OnboardingSwipeInstructions from "../components/OnboardingSwipeInstructions";
import { useOnboarding } from "../hooks/UseOnboarding";
import { SearchProvider, useSearch } from "../contexts/SearchProvider";
import DishSearchBar from "../components/DishSearchBar";

//TODO: use flatlist for lazy loading etc

export default function PartyScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showOnboarding, finishOnboarding } = useOnboarding();
  const reviewRef = useRef<TextInput>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {showOnboarding && <OnboardingSwipeInstructions onFadeOutComplete={finishOnboarding}/>}
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 65 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <SearchProvider>
              <DishSearchBar />
              <DishScrollStack/>
            </SearchProvider>
            
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
  }
});
