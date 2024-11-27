import React, { forwardRef } from "react";
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
import StarFilled from "../../assets/svg/star-filled";
import { addReview } from "../api/index";

const Review = forwardRef((props: any, ref: React.Ref<TextInput>) => {
  const [target, setTarget] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleStarPress = (index: number) => {
    setTarget(index);
    console.log(index + 1);
  };
  const renderStars = Array.from({ length: 5 }).map((_, index: number) => {
    return (
      <Pressable key={index} onPress={() => handleStarPress(index)}>
        {target != null && index <= target ? (
          <StarFilled key={index} />
        ) : (
          <StarEmpty key={index} />
        )}
      </Pressable>
    );
  });

  const sendReview = async () => {
    try {
      // Validation
      if (target === null) {
        throw new Error("Please select a star rating.");
      }
      if (!message.trim()) {
        throw new Error("Please write a review message.");
      }

      // Attempt to add the review
      await addReview({
        starRating: target + 1, // Ensure 1-based star rating
        message: message.trim(), // Trim unnecessary spaces
      });

      if (ref) {
        ref.current.blur();
      }

      // Reset the input field after success
      setMessage("");
      setTarget(null);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Error", error.message); // Show the error message to the user
      } else {
        console.error("Unexpected error:", error); // Log unexpected errors for debugging
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 26, marginBottom: 10 }]}>
        How was this dish?
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {renderStars}
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
          style={[styles.input]}
          placeholder="Enter your review..."
          placeholderTextColor="#000"
          ref={ref}
          value={message}
          onChangeText={setMessage}
          returnKeyType="done"
        />

        <Pressable onPress={sendReview}>
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
});

export default Review;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: bg,
    flex: 1,
    marginBottom: 200,
    marginHorizontal: 10,
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
