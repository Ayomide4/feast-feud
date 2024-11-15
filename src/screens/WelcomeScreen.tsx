import React from "react";

import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../../assets/feast.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={{ fontWeight: "300", fontSize: 30, marginBottom: 10 }}>
            Welcome To
          </Text>
          <Text style={{ fontSize: 34, fontWeight: "500", marginBottom: 40 }}>
            Feast Feud
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Enter Code")}
          >
            <Text style={{ color: "#E8E8FB", fontSize: 18 }}>Get Started</Text>
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
    backgroundColor: "#6120F3",
    height: 55,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    alignItems: "center",
    backgroundColor: "#E8E8FB",
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
