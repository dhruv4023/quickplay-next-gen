import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "../../components/Containers/FlexBetween";
import { forgotPasswordApiCall, resetPasswordApiCall } from "./auth.api";
import { useAlert } from "../../utils/Alert";
import AuthDialogWrapper from "../../components/Dialogs/AuthDialogWrapper";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { setActiveDialog } from "../../state/slices/authSlice";
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [otpSent, setOtpSent] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("+917600999183");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("123456");
    const [confirmPassword, setConfirmPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();

    const handleSendOtp = async () => {
        setLoading(true);
        const response = await forgotPasswordApiCall({ phone: mobileNumber });
        if (response.success) {
            setOtpSent(true);
            showAlert(response.message, "success");
        } else {
            showAlert(response.message, "error");
        }
        setLoading(false);
    }

    const handleResetPassword = async () => {
        setLoading(true);
        const response = await resetPasswordApiCall({ phone: mobileNumber, newPassword: password, confirmPassword, resetOtp: otp });
        if (response.success) {
            setOtpSent(false);
            dispatch(setActiveDialog({ activeDialog: null }));
            showAlert(response.message, "success");
        } else {
            showAlert(response.message, "error");
        }
        setLoading(false);
    }
    return (
        <AuthDialogWrapper open={useSelector((s: RootState) => s.auth.activeDialog === "owenerForgotPassword")} loading={loading} onClose={() => dispatch(setActiveDialog({ activeDialog: null }))}
            components={
                <>
                    <Typography variant="h4" mb={2}>Forgot Password</Typography>
                    <FlexBetween flexDirection={"column"} gap={2}>
                        <TextField
                            label="Mobile Number"
                            value={mobileNumber}
                            disabled={otpSent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSendOtp}>Send OTP</Button>

                        <TextField
                            label="OTP"
                            value={otp}
                            disabled={!otpSent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            value={password}
                            disabled={!otpSent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                        <TextField
                            label="Confirm Password"
                            value={confirmPassword}
                            disabled={!otpSent}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                        />
                        <Button variant="contained" disabled={!otpSent} color="primary" onClick={handleResetPassword}>Reset Password</Button>
                    </FlexBetween>
                </>
            } />
    );
}

export default ForgotPassword;

