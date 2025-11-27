import axios from "axios";


const API = axios.create({
  baseURL: "http://localhost:3000/api", 
});

// export const getEvents = async (filters = {}) => {
//   try {
//     const response = await API.get("/events", { params: filters });
//     return response.data.events || [];
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return [];
//   }
// };
export const getEvents = async () => {
  try {
    const response = await API.get("/events");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};


export const addEvent = async (newEvent) => {
  try {
    const response = await API.post("/events", newEvent);
    return response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const updateEvent = async (id, updates) => {
  try {
    const response = await API.put(`/events/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const loginUser = async (email,password) => {
  try {
    const response = await API.post("/auth/login",{email,password});
    return await response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (email,password) => {
  try {
    const response = await API.post("/auth/register", {email,password});
    return await response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

