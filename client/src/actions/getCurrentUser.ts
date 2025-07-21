/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getCurrentUser() {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const response = await axios.get(`${apiUrl}/getCurrentUser`, {
      withCredentials: true,
    });
    console.log("response", response);
    return response;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.log(error);
      return null;
    }
    throw error;
  }
}
