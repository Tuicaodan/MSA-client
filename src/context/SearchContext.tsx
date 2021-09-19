import React, { useState, createContext, FC, useContext } from "react";

interface SearchContextState {
  wordEntered: string;
  setWordEntered: (word: string) => void;
  filteredData: any;
  setFilteredData: (data: any) => void;
}

const contextDefaultValues: SearchContextState = {
  wordEntered: "",
  setWordEntered: (word: string) => {},
  filteredData: [],
  setFilteredData: (data: []) => {},
};

const SearchContext = createContext<SearchContextState>(contextDefaultValues);

export const useSearchContext = () => useContext(SearchContext);

const SearchContextProvider: FC = ({ children }) => {
  const [wordEntered, setWordEntered] = useState(
    contextDefaultValues.wordEntered
  );

  const [filteredData, setFilteredData] = useState([]);

  return (
    <SearchContext.Provider
      value={{ wordEntered, setWordEntered, filteredData, setFilteredData }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
