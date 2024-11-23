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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Search from "../../assets/svg/search";
import NavBar from "../components/navbar";
import Review from "../components/review";
import Card from "../components/card";

export default function PartyScreen() {
  const reviewRef = useRef<TextInput>(null);
  const focusInput = () => {
    if (reviewRef.current) {
      reviewRef.current.focus();
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: "#fff", fontSize: 25, marginTop: 20 }}>
          Ayo's Friendsgiving
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
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

            <Pressable onPress={focusInput} style={{ marginTop: 20 }}>
              <Card />
            </Pressable>

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
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#E8E8FB",
    height: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: "70%",
    resizeMode: "cover",
    marginBottom: 10,
  },
});
