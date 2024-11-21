import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  Alert,
  Animated,
  PanResponder,
} from "react-native";
import StarEmpty from "../../assets/svg/star-empty";
import { bg, text } from "../constants/colors";
import UpArrow from "../../assets/svg/up-arrow";
import { useRef, useState } from "react";

//TODO: use slide , watch a tutorial
export default function Review(props: any) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 26, marginBottom: 10 }]}>
        How was this dish?
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
        <StarEmpty />
      </View>
      <Text style={[styles.text, { fontSize: 16, marginBottom: 20 }]}>
        Your feedback is anonymous
      </Text>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Enter your review..."
          placeholderTextColor="#000"
        />

        <Pressable
          onPress={() => {
            props.setModalVisible(false);
          }}
        >
          <View
            style={{
              borderRadius: 500,
              backgroundColor: text,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <UpArrow width={30} height={30} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40,
    backgroundColor: bg,
  },
  text: {
    color: text,
  },
  input: {
    borderRadius: 50,
    backgroundColor: text,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    width: "85%",
  },
});
