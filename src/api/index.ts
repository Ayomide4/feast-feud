import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
} from "firebase/auth";
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

export async function addDish(dish: Dish) {}

export async function signIn(user: any) {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );
    return userCredentials.user;
  } catch (error: any) {
    console.error("Error logging in: ", error);
  }
}

export async function signUp(user: any) {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password,
    );
    return userCredentials.user;
  } catch (error: any) {
    console.error("Error logging in: ", error);
  }
}
