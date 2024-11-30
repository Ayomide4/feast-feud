import React, { createContext, useState, useContext, useEffect } from "react";
import { getDishes } from "../api";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface SearchContextType {
  searchQuery: string;
  filteredDishes: Dish[];
  setSearchQuery: (query: string) => void;
  setDishes: (dishes: Dish[]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

/**
 * Provides search functionality for filtering dishes based on a search query.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 *
 * @returns {JSX.Element} The SearchContext provider with search query and filtered dishes.
 *
 * @remarks
 * This context provider maintains the state for the search query and the list of dishes.
 * It filters the dishes based on the search query and provides the filtered list along with
 * functions to update the search query and the list of dishes.
 *
 * @example
 * ```tsx
 * import { SearchProvider } from './contexts/SearchProvider';
 *
 * const App = () => (
 *   <SearchProvider>
 *     <YourComponent />
 *   </SearchProvider>
 * );
 * ```
 */
export const SearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dishes, setDishes] = useState<Dish[]>([]);
  const filteredDishes: Dish[] = dishes.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set up the real-time listener
    const dishesQuery = query(
      collection(db, "dishes"),
      orderBy("createdAt", "asc"),
    );

    const unsubscribe = onSnapshot(
      dishesQuery,
      (snapshot) => {
        const updatedDishes: Dish[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Dish[]),
        }));

        setDishes(updatedDishes); // Update the state with the latest dishes
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time updates:", error);
        setIsLoading(false);
      },
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // useEffect(() => {
  //   const fetchDishes = async () => {
  //     try {
  //       setIsLoading(true);
  //       const fetchedDishes = await getDishes();
  //       setDishes(fetchedDishes);
  //       console.log(fetchedDishes);
  //     } catch (err) {
  //       console.error("Error fetching dishes", err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //
  //   fetchDishes();
  // }, []); // Empty dependency array means this runs once when the component mounts
  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        filteredDishes,
        setSearchQuery,
        setDishes,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

/**
 * Custom hook to access the search context.
 *
 * This hook provides access to the search context, which should be used
 * within a `SearchProvider`. If the hook is used outside of a `SearchProvider`,
 * it will throw an error.
 *
 * @returns {SearchContextType} The current search context value.
 * @throws {Error} If the hook is used outside of a `SearchProvider`.
 */
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
