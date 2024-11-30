import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  SetStateAction,
} from "react";
import { getDishes } from "../api";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";

interface SearchContextType {
  searchQuery: string;
  filteredDishes: Dish[];
  setSearchQuery: (query: string) => void;
  setDishes: (dishes: Dish[]) => void;
}
interface Props {
  children: ReactNode;
  dishes: Dish[];
  setDishes: React.Dispatch<SetStateAction<Dish[]>>;
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
  dishes,
  setDishes,
}: Props): JSX.Element => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredDishes: Dish[] = dishes.filter((dish) =>
    dish.dishName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {}, []);

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
