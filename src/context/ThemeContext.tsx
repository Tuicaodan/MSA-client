import React, { useState, createContext, FC, useContext } from "react";
import { Color } from "../models/color.modle";

interface ThemeContextState {
  currentTheme: Color;
  currentTextColor: Color;
  changeToDrakTheme: () => void;
  changeToLightTheme: () => void;
}

const contextDefaultValues: ThemeContextState = {
  currentTheme: Color.WHITE,
  currentTextColor: Color.GREY,
  changeToDrakTheme: () => {},
  changeToLightTheme: () => {},
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
    setCurrentTheme(Color.GREY);
    setCurrentTextColor(Color.WHITE);
  };

  const changeToLightTheme = () => {
    setCurrentTheme(Color.WHITE);
    setCurrentTextColor(Color.GREY);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        currentTextColor,
        changeToDrakTheme,
        changeToLightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
