import Form from "./OwnerAuthForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useState } from "react";
import AuthDialogWrapper from "../../components/Dialogs/AuthDialogWrapper";
import { setActiveDialog } from "../../state/slices/authSlice";


const LoginDialog = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <AuthDialogWrapper open={useSelector((s: RootState) => s.auth.activeDialog === "ownerLogin")} loading={loading} components={<Form pageType="Login" loading={loading} setLoading={setLoading}/>} onClose={() => dispatch(setActiveDialog({ activeDialog: null }))}/>
  );
};  

export default LoginDialog;
