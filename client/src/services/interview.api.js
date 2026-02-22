import API from "./axios";

export const startInterview = (data) =>
    API.post("/api/interview/start", data);

export const sendMessage = (data) =>
    API.post("/api/interview/message", data);

export const getInterview = (id) =>
    API.get(`/api/interview/${id}`);