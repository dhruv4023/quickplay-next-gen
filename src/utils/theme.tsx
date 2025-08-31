export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#FAFAFA",
    50: "#F0F0F0",
    100: "#D9D9D9",
    200: "#BFBFBF",
    300: "#A6A6A6",
    400: "#8C8C8C",
    500: "#737373",
    600: "#595959",
    700: "#404040",
    800: "#262626",
    900: "#0D0D0D",
    1000: "#000000",
  },
  primary: {
    25: "#F5F9FF",
    50: "#EBF2FF",
    100: "#D6E4FF",
    200: "#ADC8FF",
    300: "#84A9FF",
    400: "#6690FF",
    500: "#3366FF",
    600: "#254EDA",
    700: "#1939B7",
    800: "#102693",
    900: "#08154D",
  },
  secondary: {
    25: "#FFFDE0",
    50: "#FFFAC2",
    100: "#FFF7A4",
    200: "#FFF285",
    300: "#FFED66",
    400: "#FFE747",
    500: "#FFE229",
    600: "#CCB61E",
    700: "#998914",
    800: "#665C0A",
    900: "#332E02",
  },
};

export const themeSettings = (mode: 'light' | 'dark') => {
  return {
    shape: {
      borderRadius: 3,
    },
    shadows: [
      "0px 1px 1px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
    ],
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colorTokens.primary[500],
            contrastText: colorTokens.grey[0],
          },
          secondary: {
            main: colorTokens.secondary[500],
            contrastText: colorTokens.grey[900],
          },
          background: {
            default: colorTokens.grey[800],
            paper: colorTokens.grey[900],
          },
          text: {
            primary: colorTokens.grey[0],
            secondary: colorTokens.grey[300],
          },
        }
        : {
          primary: {
            main: colorTokens.primary[500],
            contrastText: colorTokens.grey[900],
          },
          secondary: {
            main: colorTokens.secondary[500],
            contrastText: colorTokens.grey[900],
          },
          background: {
            default: colorTokens.grey[50],
            paper: colorTokens.grey[10],
          },
          text: {
            primary: colorTokens.grey[900],
            secondary: colorTokens.grey[700],
          },
        }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 16,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 48,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 28,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
    },
  };
};
