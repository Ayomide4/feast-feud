import React, { useRef } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Search from '../../assets/svg/search';
import { useSearch } from '../contexts/SearchProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

/**
 * DishSearchBar component provides a search input field for users to search for dishes.
 * It uses a custom hook `useSearch` to manage the search query state.
 * 
 * @component
 * @example
 * // Usage example:
 * <DishSearchBar />
 * 
 * @returns {JSX.Element} The rendered search bar component.
 * 
 * @remarks
 * The component uses `TouchableWithoutFeedback` to handle focus on the `TextInput` when the search bar is pressed.
 * The `TextInput` is styled with a background color and placeholder text.
 * 
 * @hook
 * @function useSearch
 * @returns {Object} An object containing `searchQuery` and `setSearchQuery`.
 */
export default function DishSearchBar(): JSX.Element {
  const { searchQuery, setSearchQuery } = useSearch();
  const searchRef = useRef<TextInput>(null);

  return (
    <TouchableWithoutFeedback onPress={() => searchRef?.current?.focus()}
     style={styles.input}>
      <Search width={20} height={20} />
      <TextInput
      ref={searchRef}
        style={{
          marginLeft: 10,
          backgroundColor: '#E8E8FB',
          width: '90%',
          height: 30,
        }}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder='Search here...'
        placeholderTextColor='#000'
        autoComplete='off'
      />
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 22,
    marginRight: 22,
    backgroundColor: '#E8E8FB',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
