import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "https://sidlink-backend.onrender.com/api"
    : "/api",
  withCredentials: true, // ✅ This is needed to send cookies!
});
