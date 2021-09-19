import React, { useState, createContext, FC, useContext } from "react";

interface ThemeContextState {
  currentTheme: string;
  setCurrentTheme: (color: string) => void;
  currentTextColor: string;
  setCurrentTextColor: (color: string) => void;
  changeToDrakTheme: () => void;
  changeToLightTheme: ()=>void;
}

const contextDefaultValues: ThemeContextState = {
  currentTheme: "white",
  setCurrentTheme: (theme: string) => {},
  currentTextColor: "rgba(75, 85, 99, 1)",
  setCurrentTextColor: (color: string) => {},
  changeToDrakTheme: () => {},
  changeToLightTheme:()=>{}
};

const ThemeContext = createContext<ThemeContextState>(contextDefaultValues);

export const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider: FC = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    contextDefaultValues.currentTheme
  );

  const [currentTextColor, setCurrentTextColor] = useState(
    contextDefaultValues.currentTextColor
  );

  const changeToDrakTheme = () => {
    setCurrentTheme("rgba(75, 85, 99, 1)");
    setCurrentTextColor("white");
  };

  const changeToLightTheme = () => {
    setCurrentTheme("white");
    setCurrentTextColor("rgba(75, 85, 99, 1)");
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
        currentTextColor,
        setCurrentTextColor,
        changeToDrakTheme,
        changeToLightTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
