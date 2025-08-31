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

export const themeSettings = (mode: 'light' | 'dark'): any => {
  return {
    shape: {
      borderRadius: 3,
    },
    shadows: [
      "none",
      "0px 1px 1px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px -1px rgba(0,0,0,0.12)",
      "0px 2px 2px 0px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 2px 2px -1px rgba(0,0,0,0.12)",
      "0px 3px 3px 0px rgba(0,0,0,0.2),0px 3px 3px 0px rgba(0,0,0,0.14),0px 3px 3px -1px rgba(0,0,0,0.12)",
      "0px 4px 4px 0px rgba(0,0,0,0.2),0px 4px 4px 0px rgba(0,0,0,0.14),0px 4px 4px -1px rgba(0,0,0,0.12)",
      "0px 5px 5px 0px rgba(0,0,0,0.2),0px 5px 5px 0px rgba(0,0,0,0.14),0px 5px 5px -1px rgba(0,0,0,0.12)",
      "0px 6px 6px 0px rgba(0,0,0,0.2),0px 6px 6px 0px rgba(0,0,0,0.14),0px 6px 6px -1px rgba(0,0,0,0.12)",
      "0px 7px 7px 0px rgba(0,0,0,0.2),0px 7px 7px 0px rgba(0,0,0,0.14),0px 7px 7px -1px rgba(0,0,0,0.12)",
      "0px 8px 8px 0px rgba(0,0,0,0.2),0px 8px 8px 0px rgba(0,0,0,0.14),0px 8px 8px -1px rgba(0,0,0,0.12)",
      "0px 9px 9px 0px rgba(0,0,0,0.2),0px 9px 9px 0px rgba(0,0,0,0.14),0px 9px 9px -1px rgba(0,0,0,0.12)",
      "0px 10px 10px 0px rgba(0,0,0,0.2),0px 10px 10px 0px rgba(0,0,0,0.14),0px 10px 10px -1px rgba(0,0,0,0.12)",
      "0px 11px 11px 0px rgba(0,0,0,0.2),0px 11px 11px 0px rgba(0,0,0,0.14),0px 11px 11px -1px rgba(0,0,0,0.12)",
      "0px 12px 12px 0px rgba(0,0,0,0.2),0px 12px 12px 0px rgba(0,0,0,0.14),0px 12px 12px -1px rgba(0,0,0,0.12)",
      "0px 13px 13px 0px rgba(0,0,0,0.2),0px 13px 13px 0px rgba(0,0,0,0.14),0px 13px 13px -1px rgba(0,0,0,0.12)",
      "0px 14px 14px 0px rgba(0,0,0,0.2),0px 14px 14px 0px rgba(0,0,0,0.14),0px 14px 14px -1px rgba(0,0,0,0.12)",
      "0px 15px 15px 0px rgba(0,0,0,0.2),0px 15px 15px 0px rgba(0,0,0,0.14),0px 15px 15px -1px rgba(0,0,0,0.12)",
      "0px 16px 16px 0px rgba(0,0,0,0.2),0px 16px 16px 0px rgba(0,0,0,0.14),0px 16px 16px -1px rgba(0,0,0,0.12)",
      "0px 17px 17px 0px rgba(0,0,0,0.2),0px 17px 17px 0px rgba(0,0,0,0.14),0px 17px 17px -1px rgba(0,0,0,0.12)",
      "0px 18px 18px 0px rgba(0,0,0,0.2),0px 18px 18px 0px rgba(0,0,0,0.14),0px 18px 18px -1px rgba(0,0,0,0.12)",
      "0px 19px 19px 0px rgba(0,0,0,0.2),0px 19px 19px 0px rgba(0,0,0,0.14),0px 19px 19px -1px rgba(0,0,0,0.12)",
      "0px 20px 20px 0px rgba(0,0,0,0.2),0px 20px 20px 0px rgba(0,0,0,0.14),0px 20px 20px -1px rgba(0,0,0,0.12)",
      "0px 21px 21px 0px rgba(0,0,0,0.2),0px 21px 21px 0px rgba(0,0,0,0.14),0px 21px 21px -1px rgba(0,0,0,0.12)",
      "0px 22px 22px 0px rgba(0,0,0,0.2),0px 22px 22px 0px rgba(0,0,0,0.14),0px 22px 22px -1px rgba(0,0,0,0.12)",
      "0px 23px 23px 0px rgba(0,0,0,0.2),0px 23px 23px 0px rgba(0,0,0,0.14),0px 23px 23px -1px rgba(0,0,0,0.12)",
      "0px 24px 24px 0px rgba(0,0,0,0.2),0px 24px 24px 0px rgba(0,0,0,0.14),0px 24px 24px -1px rgba(0,0,0,0.12)"
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
