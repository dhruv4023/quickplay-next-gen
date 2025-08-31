import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { verifyOwnerOTP } from "./auth.api";
import { useDispatch } from "react-redux";
import { setActiveDialog } from "../../state/slices/authSlice";
import { useAlert } from "../../utils/Alert";

const OtpVerify = ({ mobileNumber, setOtpSent }: { mobileNumber: string, setOtpSent: (otpSent: boolean) => void }) => {

    const [otp, setOtp] = useState("");

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    }
    const { showAlert } = useAlert();
    const dispatch = useDispatch();
    const handleVerify = async () => {
        const response = await verifyOwnerOTP({ phone: mobileNumber, otp:otp.trim(), type: "owner" });
        if (response.success) {
            showAlert(response.message, "success");
            setOtpSent(false);
            dispatch(setActiveDialog({ activeDialog: "ownerLogin" }));
        } else {
            showAlert(response.message, "error");
        }
    }

    return (
        <>
            <Typography variant="h6">Verify OTP</Typography>
            <Typography variant="body1">Enter the OTP sent to {mobileNumber}</Typography>
            <TextField
                label="OTP"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={otp}
                type="text"
                inputProps={{
                    maxLength: 6,
                    pattern: '[0-9]*',
                    inputMode: 'numeric'
                }}
                onChange={handleOtpChange}
            />
            <Button variant="contained" color="primary" onClick={handleVerify}>Verify</Button>
        </>
    )
}

export default OtpVerify;