import { View, Text, StyleSheet } from "react-native";

export default function Modal() {
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "120%",
        alignItems: "center",
      }}
    >
      <View style={styles.modalBackground}></View>
      <View style={styles.modalContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen

    backgroundColor: "black",
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    top: 0,
  },

  modalContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "80%",
    height: 500,
    opacity: 1,
    top: 100,
  },
});
