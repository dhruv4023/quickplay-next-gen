import { useCallback, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormFields from "./FormFields.js";
import { loginApiCall, registerApiCall } from "./auth.api.js";
import FlexEvenly from "../../components/FlexEvenly.js";
import FlexBetween from "../../components/Containers/FlexBetween.js";
import { useAlert } from "../../utils/Alert.js";
import { RegisterValues, LoginValues } from "../../schemas/AuthUser/Auth.schema.js";
import { fadeIn } from "../../utils/animation.js";
import { setActiveDialog } from "../../state/slices/authSlice";


interface FormProps {
  pageType: "Login" | "Register";
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setOtpSent?: (otpSent: boolean) => void;
  setMobileNumber?: (mobileNumber: string) => void;
}

const initialValuesRegister: RegisterValues = {
  type: "register",
  firstName: "Test",
  lastName: "User",
  phone: "+917600999183",
  password: "123456",
  confirmPassword: "123456"
};

const initialValuesLogin: LoginValues = {
  type: "login",
  phone: "+917600999183",
  password: "123456"
};

const Form = ({ pageType, setOtpSent, setMobileNumber, loading, setLoading }: FormProps) => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";
  const [values, setValues] = useState<RegisterValues | LoginValues>(isLogin ? initialValuesLogin : initialValuesRegister);

  const { showAlert } = useAlert();

  const onChangehandle = useCallback((val: string, name: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: val }));
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (values.type === "login") {
        const response = await loginApiCall(values, dispatch, navigate);
        if (response.success) {
          showAlert(response.message, "success");
          dispatch(setActiveDialog({ activeDialog: null }));
        } else {
          showAlert(response.message, "error");
        }
      } else {
        const { success, message } = await registerApiCall(values);
        if (success) {
          setOtpSent && setOtpSent(true);
          setMobileNumber && setMobileNumber(values.phone);
          showAlert(message, "success");
        } else {
          showAlert(message || "Failed to register!", "error");
        }
      }
    } catch (error: any) {
      const message = error?.message || "An unexpected error occurred.";
      showAlert(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "2rem",
              color: palette.primary.main,
              textAlign: "center",
              mb: "1rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              animation: `${fadeIn} 0.5s ease-out`,
            }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </Box>
          <FormFields
            onChangehandle={onChangehandle}
            values={values}
            isRegister={isRegister}
            isLogin={isLogin}
          />
        </Box>
        <FlexEvenly>
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            sx={{
              m: "1.5rem 0 1rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.default,
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: palette.primary.dark,
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
              "&:disabled": {
                backgroundColor: palette.grey[400],
                color: palette.grey[600],
              },
              transition: "all 0.3s ease",
              animation: `${fadeIn} 0.5s ease-out 0.2s both`,
            }}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
        </FlexEvenly>

        {isLogin && (
          <FlexBetween
            flexWrap={"wrap"}
            gap={2}
            mt={2}
            sx={{
              animation: `${fadeIn} 0.5s ease-out 0.4s both`,
            }}
          >
            <Typography
              onClick={() => {
                dispatch(setActiveDialog({ activeDialog: "ownerSignup" }));
              }}
              sx={{
                textDecoration: "none",
                color: palette.primary.main,
                fontWeight: "500",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                  transform: "translateX(5px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Don't have an account? Sign up
            </Typography>
            <Typography
              onClick={() => {
                dispatch(setActiveDialog({ activeDialog: "owenerForgotPassword" }));
              }}
              sx={{
                textDecoration: "none",
                color: palette.primary.main,
                fontWeight: "500",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                  transform: "translateX(5px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Forgot Password?
            </Typography>
          </FlexBetween>
        )}
      </form>
    </Box>
  );
};

export default Form;
