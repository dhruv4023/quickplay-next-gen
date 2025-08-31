import { RootState } from "../../state/store";
import { setActiveDialog } from "../../state/slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "../../components/Containers/FlexBetween";
import { useAlert } from "../../utils/Alert";
import { sendPlayerOtp, verifyPlayerOtp } from "./auth.api";
import AuthDialogWrapper from "../../components/Dialogs/AuthDialogWrapper";
import { Button, TextField, Typography } from "@mui/material";

const PlayerLogin = () => {
    const dispatch = useDispatch();
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [mobileNumber, setMobileNumber] = useState("+917600999183");
    const [loading, setLoading] = useState(false);

    const { showAlert } = useAlert();

    const handleSendOtp = async () => {
        setOtpSent(true);
        setLoading(true);
        const response = await sendPlayerOtp({ phone: mobileNumber, otp: otp });
        if (response.success) {
            setOtpSent(true);
            setLoading(false);
            showAlert(response.message, "success");
        } else {
            setOtpSent(false);
            setLoading(false);
            showAlert(response.message, "error");
        }
    }

    const handleVerifyOtp = async () => {
        setOtpSent(false);
        setLoading(true);
        const response = await verifyPlayerOtp({ phone: mobileNumber, otp: otp }, dispatch);
        if (response.success) {
            setOtpSent(false);
            setLoading(false);
            dispatch(setActiveDialog({ activeDialog: null }));
            showAlert(response.message, "success");
        } else {
            setOtp("");
            setLoading(false);
            showAlert(response.message, "error");
        }
    }

    return (<AuthDialogWrapper onClose={() => {
        dispatch(setActiveDialog({ activeDialog: null }));
        setMobileNumber("");
        setOtp("");
    }} loading={loading} open={useSelector((s: RootState) => s.auth.activeDialog === "playerLogin")} components={
        <>
            <Typography variant="h4" mb={2}>Player Login</Typography>
            <FlexBetween flexDirection={"column"} gap={2}>
                <TextField
                    label="Mobile Number"
                    value={mobileNumber}
                    disabled={otpSent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMobileNumber(e.target.value)}
                />
                <Button variant="contained"
                    disabled={otpSent} color="primary" onClick={handleSendOtp}>Send OTP</Button>

                <TextField
                    label="OTP"
                    value={otp}
                    disabled={!otpSent}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                />
                <Button variant="contained"
                    disabled={!otpSent} color="primary" onClick={handleVerifyOtp}>Login</Button>
            </FlexBetween>
        </>
    } />
    );
}

export default PlayerLogin;


