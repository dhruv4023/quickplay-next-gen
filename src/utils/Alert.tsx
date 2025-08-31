import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { createContext, useCallback, useState, useContext, ReactNode } from "react";

type AlertSeverity = "error" | "warning" | "info" | "success";

interface AlertState {
  open: boolean;
  message: string;
  severity: AlertSeverity;
}

interface AlertContextType {
  showAlert: (message: string, severity?: AlertSeverity) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: "",
    severity: "info",
  });

  const showAlert = useCallback((message: string, severity: AlertSeverity = "info") => {
    setAlert({ open: true, message, severity });
  }, []);

  const handleClose = () => {
    setAlert((prevAlert) => ({ ...prevAlert, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={alert.severity} variant="filled">
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

// Custom hook to use the alert context
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
