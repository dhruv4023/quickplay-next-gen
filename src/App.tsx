import { useEffect, useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { setClearOnUnload } from "./state/slices/authSlice"; 
import { themeSettings } from "./utils/theme";
import { AlertProvider } from "./utils/Alert";
import { AllRoutes } from "./navigation_componets/AllRoutes";
// `import ServerErrorDialog from "./utils/ServerErrorDialog";

const App = () => {
  const mode = useSelector((s: { mode: "light" | "dark" }) => s.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      dispatch(setClearOnUnload());
    });
  }, [dispatch]);
  return (
    <AlertProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AllRoutes />
          {/* <ServerErrorDialog /> */}
        </ThemeProvider>
      </Router>
    </AlertProvider>
  );
};

export default App;
