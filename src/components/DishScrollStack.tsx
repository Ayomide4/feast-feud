import React, { Key, SetStateAction, useEffect, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Card from "./card";
import Carousel from "react-native-reanimated-carousel";
import { interpolate } from "react-native-reanimated";
import { PanGesture } from "react-native-gesture-handler";
import { useSearch } from "../contexts/SearchProvider";

interface Props {
  autoplay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  onSnapToItem?: (index: Number) => void;
  setCurrentDish: React.Dispatch<SetStateAction<Dish | undefined>>;
}
interface StackSlideAnimation {
  transform: [{ translateX: number }, { scale: number }];
  zIndex: number;
  opacity: number;
}

/**
 * A component that displays a horizontal carousel of dish cards with a stack slide effect.
 *
 * @component
 *
 * @param {Object} props - The component props
 * @param {boolean} [props.autoplay=false] - Whether the carousel should auto-play
 * @param {number} [props.autoplayInterval=2000] - The interval in milliseconds between auto-play transitions
 * @param {boolean} [props.loop=true] - Whether the carousel should loop back to the beginning
 * @param {Function} [props.onScrollStart] - Callback function triggered when scrolling starts
 * @param {Function} [props.onScrollEnd] - Callback function triggered when scrolling ends
 * @param {Function} [props.onSnapToItem] - Callback function triggered when carousel snaps to an item
 *
 * @returns {JSX.Element} A carousel component displaying dish cards with a stack slide animation effect
 *
 * @example
 * <DishScrollStack
 *   autoplay={true}
 *   autoPlayInterval={3000}
 *   loop={true}
 *   onScrollStart={() => console.log('Scroll started')}
 *   onScrollEnd={() => console.log('Scroll ended')}
 *   onSnapToItem={(index) => console.log('Snapped to index', index)}
 * />
 */
export default function DishScrollStack({
  autoplay = false,
  autoPlayInterval = 2000,
  loop = true,
  onScrollStart,
  onScrollEnd,
  onSnapToItem,
  setCurrentDish,
}: Props): JSX.Element {
  const width: number = Dimensions.get("window").width;
  const { filteredDishes } = useSearch();
  const [loopStopOverride, setLoopStopOverride] = useState<boolean>(false);
  const [carouselKey, setCarouselKey] = useState<Key>("");

  useEffect(() => {
    const singleDish: boolean = filteredDishes.length <= 1;
    setLoopStopOverride(singleDish);
    setCarouselKey(singleDish ? filteredDishes.toString() : "");
  }, [filteredDishes]);

  /**
   * Generates animation styles for a stack slide effect.
   *
   * @param value - The animation progress value. Expected range is typically between -1 and 8.
   * @returns An object containing transform properties (translateX and scale), zIndex, and opacity
   *          for animating stack-like sliding behavior.
   *
   * Transform values are interpolated as follows:
   * - translateX: [-30% screen width, 0, 30% screen width] for values [-1, 0, 5]
   * - scale: [1, 1, 0.95] for values [-1, 0, 1]
   * - opacity: [0, 1, 0.1] for values [-1, 0, 8]
   * - zIndex: [10, 20, 30] for values [-1, 0, -1]
   */
  const stackSlideAnimation = (value: number): StackSlideAnimation => {
    "worklet";
    const translateX: number = interpolate(
      value,
      [-1, 0, 5],
      [-width * 0.3, 10, width * 0.3],
    );
    const scale: number = interpolate(value, [-1, 0, 1], [1, 1, 0.95]);
    const opacity: number = interpolate(value, [-1, 0, 8], [0, 1, 0.1]);
    const zIndex: number = Math.round(
      interpolate(value, [-1, 0, -1], [10, 20, 30]),
    );

    return {
      transform: [{ translateX }, { scale }],
      zIndex,
      opacity,
    };
  };

  return (
    <View style={styles.container}>
      <Carousel
        key={carouselKey}
        autoPlayInterval={autoPlayInterval}
        autoPlay={autoplay}
        data={filteredDishes}
        height={600}
        loop={loopStopOverride ? !loopStopOverride : loop}
        width={width}
        mode={"horizontal-stack"}
        modeConfig={{
          snapDirection: "left",
        }}
        onConfigurePanGesture={(panGesture: PanGesture) => {
          panGesture.activeOffsetX([-20, 20]);
        }}
        renderItem={({ item }) => <Card dish={item} />}
        customAnimation={stackSlideAnimation}
        onScrollStart={onScrollStart}
        onScrollEnd={onScrollEnd}
        onSnapToItem={(index) => setCurrentDish(filteredDishes[index])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
