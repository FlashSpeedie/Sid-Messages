import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://sidmsgbackend.onrender.com/api" : "/api",
  withCredentials: true,
});
