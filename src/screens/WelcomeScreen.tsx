import React from "react";

import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { testAuth } from "../api";

export default function WelcomeScreen({ navigation }: any) {
  const handlePress = async () => {
    navigation.navigate("Enter Code");
    await testAuth();
  };
  return (
    <ImageBackground
      source={require("../../assets/feast.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text
            style={{
              fontWeight: "300",
              fontSize: 30,
              marginBottom: 10,
              color: "#ECE6F3",
            }}
          >
            Welcome To
          </Text>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "500",
              marginBottom: 20,
              color: "#ECE6F3",
            }}
          >
            Dish Duel
          </Text>
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={{ color: "#3F3649", fontSize: 18 }}>Get Started</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#B292D8",
    height: 55,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#3F3649",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: 300,
    paddingTop: 50,
  },
  backgroundImage: {
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
});
