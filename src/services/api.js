import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", 
});

export const getEvents = async (filters = {}) => {
  try {
    const response = await API.get("/events", { params: filters });
    return response.data.events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

