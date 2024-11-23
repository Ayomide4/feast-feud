import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection, Timestamp } from "firebase/firestore";

export async function testAuth() {
  signInAnonymously(auth)
    .then(() => console.log("Signed in anonymously"))
    .catch((error) => console.error(error));
}

export async function addReview(review: Review) {
  try {
    const reviewsCollection = collection(db, "reviews");

    const docRef = await addDoc(reviewsCollection, {
      ...review,
      createdAt: Timestamp.now(), // Add a timestamp to track when the review was added
    });

    console.log("Review added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
}
