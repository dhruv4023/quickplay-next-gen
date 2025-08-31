import { Owner } from "./User.schema";


export interface RegisterValues extends Owner {
    type: "register",
    password: string,
    confirmPassword: string,
}

export type LoginValues =
    | { type: "login", phone: string; password: string; otp?: never }
    | { type: "login", phone: string; otp: string; password?: never };

export interface ChangePasswordValues {
    phone: string;
    password: string;
    otp: string;
    otpToken: string;
}

export interface OtpVerify {
    phone: string;
    otp?: string;
}
export interface VerifyOwnerOTPValues extends OtpVerify {
    type: "owner";
}
export interface VerifyPlayerOTPValues extends OtpVerify {
}

export interface ForgotPasswordValues extends OtpVerify {}

export interface ResetPasswordValues extends OtpVerify {
    newPassword: string;
    confirmPassword: string;
    resetOtp: string;
}