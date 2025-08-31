import { setPlayer } from "../../state/slices/authSlice";
import { ErrorResponse } from "../../schemas/Response.schema";
import { VerifyPlayerOTPValues } from "../../schemas/AuthUser/Auth.schema";
import { ApiResponse } from "../../schemas/Response.schema";
import api from "../../utils/api";



export const sendPlayerOtp = async (values: VerifyPlayerOTPValues): Promise<ApiResponse | ErrorResponse> => {
  try {
    const response = await api.post(`/player/otp/create`, values);
    return {
      success: true,
      message: response.data.message || "OTP sent successfully to your phone number!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to send OTP";
    return { success: false, message, error: error };
  }
};


export const verifyPlayerOtp = async (values: VerifyPlayerOTPValues, dispatch: Function): Promise<ApiResponse | ErrorResponse> => {
  try {
    const response = await api.post(`/player/otp/verify`, values);
    dispatch(setPlayer({
      player: response.data.data.player,
      token: response.data.data.token
    }));
    return {
      success: true,
      message: response.data.message || "OTP verified successfully!",
      data: response.data
    };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Failed to verify OTP";
    return { success: false, message, error: error };
  }
};
