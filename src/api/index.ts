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

export async function addReview(review: Review, dish: Dish) {
  try {
    const reviewsCollection = collection(db, "reviews");

    const dishRef = doc(db, "dishes", dish.id);

    const docRef = await addDoc(reviewsCollection, {
      ...review,
      createdAt: Timestamp.now(), // Add a timestamp to track when the review was added
      dish: dishRef,
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

/**
 * Fetches dishes from Firestore and optionally combines them with provided reviews.
 *
 * @param {Review[]} [reviews] - Optional array of reviews to combine with dishes. If not provided, reviews will be fetched from Firestore.
 * @returns {Promise<Dish[]>} - A promise that resolves to an array of dishes, each potentially combined with related reviews.
 * @throws {Error} - Throws an error if fetching dishes or reviews from Firestore fails.
 */
export async function getDishes(reviews?: Review[]): Promise<Dish[]> {
  try {
    const reviewList = reviews && reviews.length > 0 ? reviews : await getReviews();

    const dishesQuery = query(
      collection(db, "dishes"),
      orderBy("createdAt", "asc")
    );

    const dishesSnapshot = await getDocs(dishesQuery);
    const dishes = dishesSnapshot.docs.map((doc) => {
      const data = doc.data() as Dish;
      return {
        ...data,
        id: doc.id,
      };
    });

    if (!reviewList || reviewList.length === 0) {
      console.warn("No reviews available.");

      return dishes.map((dish) => ({ ...dish, reviews: [] }));
    }

    // Combine dishes with reviews
    const combinedDishes = dishes.map((dish) => {
      const relatedReviews = reviewList
        .filter((review) => {
          const dishRef = review.dish;
          return dishRef && dishRef.id === dish.id;
        })
        .sort((a, b) => b.starRating - a.starRating);

      return {
        ...dish,
        reviews: relatedReviews,
      };
    });

    return combinedDishes;
  } catch (error) {
    console.error("Failed to fetch dishes with reviews from Firestore:", error);
    throw new Error("Failed to fetch dishes with reviews. Please try again later.");
  }
}

/**
 * Fetches reviews from the Firestore database.
 *
 * @returns {Promise<Review[]>} A promise that resolves to an array of reviews.
 * @throws Will throw an error if there is an issue fetching reviews from Firestore.
 *
 * @example
 * ```typescript
 * getReviews()
 *   .then((reviews) => {
 *     console.log(reviews);
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 * ```
 */
export async function getReviews(): Promise<Review[]> {
  try {
    const reviewsQuery = query(
      collection(db, "reviews"),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(reviewsQuery);

    if (querySnapshot.empty) {
      console.warn("No reviews found in the database.");
      return [];
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Review),
    }));
  } catch (error) {
    console.error("Error fetching reviews from Firestore:", error);
    throw new Error("Failed to fetch reviews. Please try again later.");
  }
}

/**
 * Fetches and sorts reviews by star rating in descending order.
 *
 * @param {Review[]} [reviews] - An optional array of reviews to sort. If not provided, the function will fetch reviews.
 * @returns {Promise<Review[]>} A promise that resolves to an array of sorted reviews.
 *
 * @throws Will log an error message if there is an issue fetching or sorting the reviews.
 */
export async function getSortedReviews(reviews?: Review[]): Promise<Review[]> {
  try {
    const reviewList = reviews && reviews.length > 0 ? reviews : await getReviews();

    if (!reviewList || reviewList.length === 0) {
      console.warn("No reviews available.");
      return [];
    }

    return [...reviewList].sort((a, b) => b.starRating - a.starRating);
  } catch (error) {
    console.error("Error fetching or sorting reviews:", error);
    return [];
  }
}

/**
 * Fetches and sorts dishes based on their average review ratings.
 * 
 * @param {Dish[]} [dishes] - Optional array of dishes to be sorted. If not provided, dishes will be fetched using `getDishes()`.
 * @returns {Promise<Dish[]>} - A promise that resolves to an array of dishes sorted by their average review ratings in descending order.
 * 
 * @throws {Error} - Throws an error if there is an issue fetching or sorting the dishes.
 */
export async function getSortedReviewedDishes(dishes?: Dish[]): Promise<Dish[]> {
  try {
    const dishList = dishes && dishes.length > 0 ? dishes : await getDishes();

    if (!dishList || dishList.length === 0) {
      console.warn("No dishes available.");
      return [];
    }

    const sortedDishes = dishList
      .map((dish) => {
        const totalStars = dish.reviews.reduce((sum, review) => sum + review.starRating, 0);
        const averageRating = dish.reviews.length > 0 ? totalStars / dish.reviews.length : 0;

        return {
          ...dish,
          averageRating,
        };
      })
      .sort((a, b) => b.averageRating - a.averageRating);

    return sortedDishes.map(({ averageRating, ...dish }) => dish);
  } catch (error) {
    console.error("Error fetching or sorting reviewed dishes:", error);
    throw new Error("Failed to fetch and sort reviewed dishes. Please try again later.");
  }
}