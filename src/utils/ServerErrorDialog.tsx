
import axios from 'axios';

const checkServerStatus = async () => {
  const bashURL=String(import.meta.env.VITE_APP_REST_API).substring(0, String(import.meta.env.VITE_APP_REST_API).length - 4);
  try {
    const response = await axios.get(`${bashURL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000, // 5 seconds timeout
    });
    return response.status === 200;
  } catch (error) {
    console.error("Server is down or unreachable:", error);
    return false;
  }
};



import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme } from "@mui/material";

const ServerErrorDialog = () => {
  const [serverDown, setServerDown] = useState(false);
  const { palette } = useTheme();
  useEffect(() => {
    const pingServer = async () => {
      const isServerUp = await checkServerStatus();
      if (!isServerUp) {
        setServerDown(true);
      }
    };

    pingServer();
  }, []);

  return (
    <Dialog open={serverDown} onClose={() => setServerDown(false)}>
      <DialogTitle sx={{ backgroundColor: palette.primary.main, color: palette.primary.contrastText }}>Connection Error</DialogTitle>
      <DialogContent>
        Internet not connected or the server is down. Please check your connection. or check after some time!
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setServerDown(false)} color="primary">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServerErrorDialog;
