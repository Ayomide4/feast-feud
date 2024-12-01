import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import UserReview from "../components/UserReview";
import NavBar from "../components/navbar";
import Modal from "../components/modal";
import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { getDishes } from "../api";

interface Props {
  navigation?: any;
}

interface YourReviews {
  reviewersName: string;
  review: Review;
}

/**
 * A screen component that displays reviews for the user's dishes.
 * 
 * @component
 * @param {object} props - Component props
 * @param {object} props.navigation - Navigation object from React Navigation
 * @returns {JSX.Element} A screen displaying the user's dish reviews with navigation
 * 
 * @description
 * This component handles the following functionality:
 * - Displays reviews for dishes created by the authenticated user
 * - Sets up real-time listeners for review updates
 * - Handles authentication state and redirects
 * - Shows a modal for additional actions
 * - Provides navigation capabilities
 * 
 * The component includes:
 * - Real-time review updates using Firestore
 * - Authentication state management
 * - Modal state management
 * - Navigation bar integration
 * 
 * @example
 * ```tsx
 * <YourReviews navigation={navigation} />
 * ```
 */
export default function YourReviews({ navigation }: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [reviews, setReviews] = useState<YourReviews[]>([]);

  useEffect(() => {
    /**
     * Fetches data related to the user's reviews and sets up a real-time listener for updates.
     * 
     * @async
     * @function fetchData
     * @returns {Promise<void>} A function to unsubscribe from real-time updates.
     * 
     * @throws Will log an error message if fetching initial data fails.
     * 
     * @description
     * This function performs the following steps:
     * 1. Checks if the user is anonymous and shows a login toast if true.
     * 2. Fetches the user's dishes if the user is authenticated.
     * 3. Logs a warning if no dishes are found for the user.
     * 4. Sets up a Firestore query to listen for real-time updates on reviews related to the user's dishes.
     * 5. Processes the real-time updates and updates the state with the new reviews.
     * 6. Logs errors if any occur during the fetching or processing of data.
     */
    const fetchData = async (): Promise<(() => void) | undefined> =>{
      try {
        if (user?.isAnonymous) {
          showLoginToast();
          return;
        }

        const dishes = user?.uid
          ? await getDishes(null, doc(db, "users", user?.uid))
          : [];
        if (dishes.length === 0) {
          console.warn("No dishes found for user:", user?.uid);
          return;
        }

        const dishesQuery = query(
          collection(db, "reviews"),
          where(
            "dish",
            "in",
            dishes.map((dish) => doc(db, "dishes", dish.id))
          )
        );

        const unsubscribe = onSnapshot(
          dishesQuery,
          async (snapshot) => {
            try {
              const updatedReviews: YourReviews[] = snapshot.docs.map(
                (doc) => ({
                  reviewersName: '',
                  review: doc.data() as Review,
                })
              );

              setReviews(updatedReviews);
            } catch (error) {
              console.error("Error processing real-time dish updates:", error);
            }
          },
          (error) => {
            console.error("Error fetching real-time updates:", error);
          }
        );

        return unsubscribe;
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * Displays an alert to the user indicating that they need to sign in to upload their dish.
   * The alert provides two options:
   * - "Cancel": Navigates to the "Party" screen.
   * - "OK": Navigates to the "Login" screen.
   */
  const showLoginToast = () => {
    Alert.alert("Sign In Required", "You need to sign in to upload your dish", [
      {
        text: "Cancel",
        onPress: () => navigation.navigate("Party"),
      },
      {
        text: "OK",
        onPress: () => navigation.navigate("Login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {reviews.map((review, index) => {
          return (
            <View style={styles.userReviewContainer} key={index}>
              <UserReview
                key={index}
                reviewersName={review.reviewersName}
                review={review.review}
              />
            </View>
          );
        })}
      </View>
      <NavBar navigation={navigation} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#3F3649",
    flex: 1,
  },
  mainContainer: {
    margin: 20,
  },
  userReviewContainer: {
    marginBottom: 15,
  },
});
