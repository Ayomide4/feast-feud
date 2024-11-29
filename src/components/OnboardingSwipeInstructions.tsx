import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { text, accent } from "../constants/colors";
import SwipeUp from "../../assets/svg/SwipeUp";

interface Props {
    onFadeOutComplete?: () => void;
    }
    
/**
 * A component that displays swipe instructions during onboarding with fade in/out animations.
 * 
 * This component shows instructions for two main actions:
 * 1. Swiping up to leave a review
 * 2. Swiping horizontally to see next item
 * 
 * The component fades in automatically on mount and can be dismissed with a tap,
 * triggering a fade out animation.
 * 
 * @param {Object} props - The component props
 * @param {() => void} props.onFadeOutComplete - Optional callback function that is called
 * when the fade out animation completes
 * 
 * @returns {JSX.Element} A touchable animated view containing swipe instructions
 */
export default function OnboardingSwipeInstructions({ onFadeOutComplete }: Props): JSX.Element {
  const opacity = useRef(new Animated.Value(0)).current;
  const fadeInDuration = 500
  const fadeOutDuration = 300

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: fadeInDuration,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  /**
   * Initiates a fade-out animation using React Native's Animated API.
   * The opacity value animates from its current value to 0 over the specified duration.
   * Once the animation completes, it calls the optional onFadeOutComplete callback if provided.
   * 
   * @function
   * @uses Animated.timing for animating opacity
   * @uses useNativeDriver for better performance
   */
  const handleFadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: fadeOutDuration,
      useNativeDriver: true,
    }).start(() => {
      if (onFadeOutComplete) {
        onFadeOutComplete();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleFadeOut}>
      <Animated.View style={[styles.overlay, { opacity }]}>
        <LinearGradient colors={["transparent", accent]} style={styles.overlay}>
          <View style={styles.actionContainer}>
            <View style={styles.actions}>

              <View style={styles.actionItem}>
                <SwipeUp width={50} height={50} />
                <View  style={styles.actionItem}>
                  <Text style={styles.actionLabel}>Leave a review?</Text>
                  <Text style={styles.actionHint}>Swipe Up</Text>
                </View>
              </View>

              <View style={styles.separator}></View>

              <View style={styles.actionItem}>
                <SwipeHorizontal width={50} height={50} />
                <View style={styles.actionItem}>
                  <Text style={styles.actionLabel}>Next Item?</Text>
                  <Text style={styles.actionHint}>Swipe Right or Left</Text>
                </View>
              </View>
              
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 1,
  },
  actionContainer: {
    width: "100%",
    height: "33%",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
  },
  actionItem: {
    alignItems: "center",
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
    width: 2,
    backgroundColor: text,
  },
});
