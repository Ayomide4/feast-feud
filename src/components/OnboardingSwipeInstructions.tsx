import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DishScroll from "../../assets/svg/DishScroll";
import ReviewScroll from "../../assets/svg/ReviewScroll";
import { text, accent } from "../constants/colors";

interface Props {
    onFadeOutComplete?: () => void;
    }
export default function OnboardingSwipeInstructions({ onFadeOutComplete }: Props) {
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

              <View style={styles.actionLeft}>
                <ReviewScroll width={27} height={25} />
                <View>
                  <Text style={styles.actionLabel}>Leave a review?</Text>
                  <Text style={styles.actionHint}>Swipe Up</Text>
                </View>
              </View>

              <View style={styles.separator}></View>

              <View style={styles.actionRight}>
                <DishScroll width={27} height={25} />
                <View>
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
    height: "100%",
  },
  actionRight: {
    alignItems: "center",
    height: "100%",
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
    height: "100%",
    backgroundColor: text,
  },
});
