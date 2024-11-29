import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  text,
  accent,
} from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import DishScroll from "../../assets/svg/DishScroll";
import ReviewScroll from "../../assets/svg/ReviewScroll";

export default function OnboardingSwipeInstructions() {
  return (
    <LinearGradient
      colors={["transparent", accent]}
      style={styles.overlay} // Gradient applies to the entire container
    >
      <View style={styles.actionContainer}>
        <View style={styles.actionContainer}>

          <View style={styles.actions}>

          <View style={styles.actionLeft}>
            <ReviewScroll width={27} height={25} />
            <View style={styles.actionLeft}>
              <Text style={styles.actionLabel}>Leave a review?</Text>
              <Text style={styles.actionHint}>Swipe Up</Text>
            </View>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.actionRight}>
              <DishScroll width={27} height={25} />

              <View style={styles.actionRight}>
                <Text style={styles.actionLabel}>Next Item?</Text>
                <Text style={styles.actionHint}>Swipe Right or Left</Text>
              </View>
            </View>

          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 40,
    zIndex: 1,
  },
  actionContainer: {
    width: "100%",
    height: "25%",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
  },
  actionLeft: {
    alignItems: "center",
    height: '100%',
  },
  actionRight: {
    alignItems: "center",
    height: '100%',
  },
  actionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: text,
  },
  actionHint: {
    fontSize: 14,
    color: text,
  },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: text,
  },
});
