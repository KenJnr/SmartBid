// src/utils/theme.ts

export const lightTheme = {
    mode: "light",
    colors: {
      primary: "#ff7d00", //for buttons and icons
      secondary: "#1282a2", // top section
      background: "#fff", //footer section
      text: "black", //card Text
      text1: "#666", //other Text
      Title: "#fff", //headings
      subTitle: "#ccc", //subheadings
      card: "#FFF", //cards
      cardSubTitle: "#666", // card subtitle text
      divider: "#eee", // divider
      backIcon: "#ddd", // back icon background
      iconBackground: "#FFEFD6",
      inputField: "#eee", // input field background
      border: "#E5E5E5",
      error: "#FF3B30",
      success: "#34C759",
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    fontSizes: {
      small: 14,
      medium: 16,
      large: 20,
      xl: 24,
    },
    borderRadius: {
      sm: 8,
      md: 12,
      lg: 32,
    },
  };
  
  export const darkTheme = {
    mode: "dark",
    colors: {
      primary: "#ff8500", // for buttons and icons
      secondary: "#001524", // top section
      background: "#103957", // footer section
      text: "#fff", // card Text
      text1: "#fff", // other Text
      Title: "#fff", // headings
      subTitle: "#D1E8FF", //subheadings
      card: "#1B4B66", // cards
      cardSubTitle: "#D1E8FF",
      divider: "#3A5A73",
      backIcon: "#8d99ae",
      iconBackground: "#FFEFD6",
      inputField: "#d0cfcf", // input field background
      border: "#3A3A3C",
      error: "#FF453A",
      success: "#30D158",
    },
    spacing: lightTheme.spacing,
    fontSizes: lightTheme.fontSizes,
    borderRadius: lightTheme.borderRadius,
  };
  