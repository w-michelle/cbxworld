/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default async function getCurrentUser() {
  const user = axios
    .get("http://localhost:8080/getCurrentUser", {
      withCredentials: true,
    })
    .then((data) => {
      return data;
    })
    .catch((error: any) => {
      console.log(error);
      return null;
    });
  return user;
}
