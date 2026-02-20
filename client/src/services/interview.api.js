import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔹 Start Interview
export const startInterview = (data) =>
  API.post("/api/interview/start", data);

// 🔹 Send Message
export const sendMessage = (data) =>
  API.post("/api/interview/message", data);

// 🔹 Get Interview
export const getInterview = (id) =>
  API.get(`/api/interview/${id}`);