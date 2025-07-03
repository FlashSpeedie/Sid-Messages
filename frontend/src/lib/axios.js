// lib/axios.js

import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "https://sidlink-backend.onrender.com/api"
    : "/api"; // <== make sure it's "/api" in production too

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
