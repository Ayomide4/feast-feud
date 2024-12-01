import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { gray, primary } from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  reviewersName: string;
  review: Review;
}

/**
 * A component that displays a user review with the reviewer's name, message, and star rating.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.reviewersName - The name of the person who wrote the review
 * @param {Object} props.review - The review object containing the review details
 * @param {number} props.review.starRating - The rating given by the reviewer (can be a decimal for half stars)
 * @param {string} props.review.message - The text content of the review
 * 
 * @returns {JSX.Element} A view containing the formatted review with the reviewer's name,
 * review message, star rating (using FontAwesome icons), and a decorative triangle
 */
export default function UserReview({
  reviewersName,
  review,
}: Props): JSX.Element {

    /**
     * Renders a star rating display using FontAwesome icons.
     * 
     * @returns {JSX.Element[]} An array of FontAwesome star icons representing the rating.
     * Each star can be full (star), half (star-half), or empty (star-o).
     * 
     * The rating is based on the review.starRating value:
     * - Full stars for whole numbers (Math.floor(review.starRating))
     * - Half star for decimal values
     * - Empty stars for remaining positions up to 5
     */
    const renderStars = (): JSX.Element[] => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <FontAwesome
              key={i}
              name={i <= Math.floor(review.starRating) ? "star" : i <= review.starRating ? "star-half" : "star-o"}
              size={15}
              color={primary}
            />
          );
        }
        return stars;
      };
      
  return (
    <View>
      {reviewersName ? <View style={styles.reviewersNameContainer}>
        <Text style={styles.reviewersNametext}>{reviewersName}</Text>
      </View> : null}
      <View style={styles.reviewMessageContainer}>
        <Text style={styles.reviewMessageText}>{review.message}</Text>
      </View>
      <View style={styles.reviewRatingContainer}>
      <View style={styles.starsContainer}>{renderStars()}</View>
      </View>
      <View style={styles.triangle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: primary,
    flex: 1,
    marginBottom: 200,
    marginHorizontal: 10,
  },
  reviewersNameContainer: {
    marginBottom: 2,
    paddingLeft: 10,
  },
  reviewMessageContainer: {
    backgroundColor: gray,
    width: "45%",
    height: 20,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 10,
    marginBottom: 5,
  },
  reviewRatingContainer: {
    backgroundColor: gray,
    width: "30%",
    height: 20,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    paddingLeft: 15,
    marginBottom: 5,
  },
  reviewersNametext: {
    color: "#fff",
    fontSize: 12,
  },
  reviewMessageText: {
    color: "#000",
    fontSize: 12,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#d8d6e0",
    marginLeft: -4,
    marginTop: -10,
    transform: [{ rotate: "100deg" }],
  },
});
