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
  DocumentReference,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
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
 * Fetches dishes from Firestore and combines them with their associated reviews.
 * 
 * @param reviews - Optional array of Review objects to use instead of fetching from database
 * @param userRefernce - Optional DocumentReference to filter dishes by user
 * @returns Promise that resolves to an array of Dish objects with their associated reviews
 * @throws Error if fetching dishes or reviews fails
 * 
 * @example
 * ```typescript
 * // Get all dishes with their reviews
 * const dishes = await getDishes();
 * 
 * // Get dishes for a specific user
 * const userDishes = await getDishes(null, userRef);
 * 
 * // Get dishes with provided reviews
 * const dishesWithReviews = await getDishes(existingReviews);
 * ```
 */
export async function getDishes(reviews?: Review[]|null, userRefernce?: DocumentReference): Promise<Dish[]> {
  try {
    const reviewList = reviews && reviews.length > 0 ? reviews : await getReviews();

    const dishesQuery =
    userRefernce ? 
    query(
      collection(db, "dishes"),
      where("user", "==", userRefernce),
      orderBy("createdAt", "asc")
    )
    : query(
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
 * Retrieves reviews from Firestore database.
 * If a dish reference is provided, returns reviews for that specific dish.
 * If no dish reference is provided, returns all reviews.
 * Reviews are ordered by creation date in ascending order.
 * 
 * @param dish - Optional DocumentReference for a specific dish to filter reviews
 * @returns Promise containing an array of Review objects
 * @throws Error if the database query fails
 * 
 * @example
 * // Get all reviews
 * const allReviews = await getReviews();
 * 
 * // Get reviews for a specific dish
 * const dishReviews = await getReviews(dishReference);
 */
export async function getReviews(dish? : DocumentReference | null): Promise<Review[]> {
  try {
    const reviewsQuery = 
    dish != null ? query(
      collection(db, "reviews"),
      where("dish", "==", dish),
      orderBy("createdAt", "asc")
    ) : 
    query(
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
