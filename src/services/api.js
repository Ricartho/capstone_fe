import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "", 
});

// APP CALL METHODS

export const registerUser = async(email,password) => {
    try{
      const resp =  await API.post('/auth/register',{email,password});
      console.log(resp.data);
      return await resp.data;
    }catch(err){
    console.log(err);
    throw new Error("This email address is already in use, please try again",{status:500});
    } 
   };

export const loginUser = async (email,password) => {
  try{
    const resp =  await API.post('/auth/login',{email,password});
    console.log(resp.data.access_token);
    return await resp.data;
  }catch(error){
    console.log(error);
    throw new Error("Login credentials incorrect, please try again",{status:500});
  
  }
 };

 export const getEvents = async () => {
  try {
    const response = await API.get("/events");
    return await response.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};


export const addEvent = async (newEvent) => {
  try {
    const response = await API.post("/events", newEvent);
    return await response.data;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

export const getEvent = async (id) => {
  try{
    const response = await API.get(`/events/${id}`);
    return await response.data || {};
  }catch(error){
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const updateEvent = async (id, updates) => {
  try {
    const response = await API.put(`/events/${id}`, updates);
    return await response.data || {};
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/events/${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

