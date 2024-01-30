import React, { createContext, useState, useEffect } from "react";
import { Dimensions } from "react-native";

export const WindowContext = createContext();

export const WindowSizeProvider = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState(
    Dimensions.get("window")
  );

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions(Dimensions.get("window"));
    };

    Dimensions.addEventListener("change", updateWindowDimensions);

    return () => {
      Dimensions.removeEventListener("change", updateWindowDimensions);
    };
  }, []);

  return (
    <WindowContext.Provider value={windowDimensions}>
      {children}
    </WindowContext.Provider>
  );
};
