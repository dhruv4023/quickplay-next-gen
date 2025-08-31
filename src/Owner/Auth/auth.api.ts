import { setLogin } from "../../state/slices/authSlice";
import api from "../../utils/api";
import { ChangePasswordValues, ForgotPasswordValues, LoginValues, RegisterValues, ResetPasswordValues, VerifyOwnerOTPValues } from "../../schemas/AuthUser/Auth.schema";
import { ApiResponse, ErrorResponse } from "../../schemas/Response.schema";

export const registerApiCall = async (values: RegisterValues): Promise<ApiResponse|ErrorResponse> => {
  try {
    const response = await api.post(`/owner/register`, values);
    return {
      data: response.data,
      success: true,
      message:
        response.data.message ||
        "You will receive an email which contains a password! Please login with that password!",
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Error while registering";
    return { success: false, message, error:error };
  }
};

export const loginApiCall = async (
  values: LoginValues,
  dispatch: Function,
  navigate: Function
): Promise<ApiResponse|ErrorResponse> => {
  try {
    const loggedInResponse = await api.post(`/owner/login`, values);

    const loggedIn = loggedInResponse.data;
    dispatch(
      setLogin({
        owner: loggedIn.data.owner,
        token: loggedIn.data.token,
        refreshToken: loggedIn.data.refreshToken,
      })
    );
    navigate(`/owner/dashboard`);
    return { success: true, message: loggedIn.message || "Login successful!" , data: loggedIn.data };
  } catch (error: any) {
    console.error("Error logging in", error);
    const message = error?.response?.data?.message || "Error logging in";
    return { success: false, message, error:error };
  }
};

export const changePasswordApiCall = async (
  values: ChangePasswordValues
): Promise<ApiResponse|ErrorResponse> => {
  try {
      const response = await api.post(`/password/verify`, values);
    return {
      success: true,
      message: response?.data?.message || "Password changed successfully!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to change password";
    return { success: false, message, error:error };
  }
};

export const verifyOwnerOTP = async (values: VerifyOwnerOTPValues): Promise<ApiResponse|ErrorResponse> => {
  try {
    const response = await api.post(`/owner/verify/otp`, values);
    return {
      success: true,
      message: response.data.message || "OTP sent successfully to your phone number!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to send OTP";
    return { success: false, message, error:error };
  }
};


export const forgotPasswordApiCall = async (values: ForgotPasswordValues): Promise<ApiResponse|ErrorResponse> => {
  try {
    const response = await api.post(`/owner/forget/password`, values);
    return {
      success: true,
      message: response.data.message || "Password reset sms sent!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to send password reset sms";
    return { success: false, message, error:error };
  }
};

export const resetPasswordApiCall = async (values: ResetPasswordValues): Promise<ApiResponse|ErrorResponse> => {
  try {
    const response = await api.post(`/owner/reset/password`, values);
    return {
      success: true,
      message: response.data.message || "Password reset successfully!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to reset password";
    return { success: false, message, error:error };
  }
};