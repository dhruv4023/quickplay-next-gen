
import { ApiResponse, ErrorResponse } from "../schemas/Response.schema";
import api from "./api";

export const uploadImageApiCall = async (file:any, token:string) : Promise<ApiResponse|ErrorResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await api.post("/api/images/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    });
    const data = response.data;
    return { success: true, data, message: "Image uploaded successfully!" };
  } catch (error: any) {
    const message = error?.response?.data?.message || "Error while registering";
    return { success: false, message, error:error };
  }
};