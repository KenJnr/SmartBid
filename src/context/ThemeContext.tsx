// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "../utils/theme";

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };
  

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === "dark" ? darkTheme : lightTheme);
    });
    return () => subscription.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
