import React, { useState } from "react";
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
import { testAuth } from "../api";
import NavBar from "../components/navbar";
import Review from "../components/review";

export default function PartyScreen() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: "#fff", fontSize: 25, marginTop: 20 }}>
          Ayo's Friendsgiving
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <KeyboardAvoidingView
          style={styles.avoid}
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

            <Pressable>
              <View style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <View
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "#3f3649",
                      width: 40,
                      height: 40,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: 20 }}>A</Text>
                  </View>
                  <Text style={{ fontSize: 24, fontWeight: "semibold" }}>
                    Ayo
                  </Text>
                </View>
                <Image
                  style={styles.img}
                  source={require("../../assets/mac.png")}
                />
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Mac & Cheese
                </Text>
              </View>
            </Pressable>

            <Review
              isKeyboardVisible={isKeyboardVisible}
              setKeyboardVisible={setKeyboardVisible}
            />
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
  card: {
    backgroundColor: "#E8E8FB",
    borderRadius: 20,
    marginTop: 30,
    padding: 10,
    height: 500,
  },
  img: {
    height: "70%",
    resizeMode: "cover",
    marginBottom: 10,
  },
  reviewBtn: {
    marginTop: 10,
    width: "100%",
    borderBottomWidth: 100,
    borderBottomColor: "red",
    borderLeftWidth: 20,
    borderTopLeftRadius: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderStyle: "solid",
  },
  avoid: {
    flex: 1,
    position: "relative",
  },
});
