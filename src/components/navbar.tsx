import { View, StyleSheet, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Home from "../../assets/svg/home";
import Add from "../../assets/svg/add";
import Messages from "../../assets/svg/messages";
import { SetStateAction, useState } from "react";
import React from "react";

interface Props {
  navigation?: any;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}
export default function NavBar({navigation, setIsModalOpen }: Props) {
  const handleFeature = () => {
    Alert.alert("Feature not implemented yet :(");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4B4156", "#4A4C60"]}
        style={styles.background}
        end={{ x: 0.05, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <Pressable onPress={() => {navigation.navigate('Party')}}>
            <Home width={40} height={40} />
          </Pressable>
          <Pressable onPress={() => setIsModalOpen(true)}>
            <Add width={50} height={50} />
          </Pressable>
          <Pressable onPress={() => {navigation.navigate('YourReviews')}}>
            <Messages width={45} height={50} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});
