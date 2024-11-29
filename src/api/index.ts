import {
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";

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

export async function addDish(dish: Dish, user: User) {
  try {
    const dishCollection = collection(db, "dishes");
    const userRef = doc(db, "users", user.uid);

    const docRef = await addDoc(dishCollection, {
      ...dish,
      createdAt: Timestamp.now(),
      user: userRef,
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding dish", dish);
  }
}

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

    const firebaseUser = userCredentials.user;

    // Create a document in Firestore with additional user info
    await setDoc(doc(db, "users", firebaseUser.uid), {
      email: user.email,
      username: user.userName,
      createdAt: new Date(),
      profileImage: "",
    });

    return firebaseUser;
  } catch (error: any) {
    console.error("Error logging in: ", error);
  }
}

export async function getDishes() {
  try {
    const dishesQuery = query(
      collection(db, "dishes"),
      orderBy("createdAt", "asc"),
    );

    const querySnapshot = await getDocs(dishesQuery);

    const dishes = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return dishes;
  } catch (error) {
    console.error("Failed to get dishes from db", error);
  }
}
