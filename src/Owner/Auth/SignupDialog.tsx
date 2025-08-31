import Form from "./OwnerAuthForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useState } from "react";
import OtpVerify from "./OtpVerify";
import AuthDialogWrapper from "../../components/Dialogs/AuthDialogWrapper";
import { setActiveDialog } from "../../state/slices/authSlice";

const SignupDialog = () => {
  const dispatch = useDispatch();
  const [otpSent, setOtpSent] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  return (<AuthDialogWrapper
    loading={loading} open={useSelector((s: RootState) => s.auth.activeDialog === "ownerSignup")} onClose={() => {
      dispatch(setActiveDialog({ activeDialog: "ownerLogin" }));
    }} components={otpSent ? <OtpVerify mobileNumber={mobileNumber} setOtpSent={setOtpSent} /> : <Form loading={loading} setLoading={setLoading} pageType="Register" setOtpSent={setOtpSent} setMobileNumber={setMobileNumber} />}
  />
  );
};

export default SignupDialog;
