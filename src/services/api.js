import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api", 
});

// APPI CALL METHODS
//USERS
export const registerUser = async(email,password) => {
    try{
      const resp =  await API.post('/auth/register',{email,password});
      return await resp.data;
    }catch(error){
    console.log(error);
    return error;
    // throw new Error("This email address is already in use, please try again",{status:500});
    } 
   };

export const loginUser = async (email,password) => {
  try{
    const resp =  await API.post('/auth/login',{email,password});
    localStorage.setItem('userToken',resp.data.access_token);
    localStorage.setItem('userId',resp.data.user_id);
    return await resp.data;
  }catch(error){
    console.log(error);
    return error;
    // throw new Error("Login credentials incorrect, please try again",{status:500});
  
  }
 };

 export const addUser = async (newUser)=>{
    try{
       const response = await API.post("/auth/users",newUser);
       return await response.data || {};
    }catch (error) {
      console.error("Error adding user:", error);
      // throw error;
      return error;
    }
 };
 export const getUsers = async()=>{
    try{
       const response = await API.get("/auth/users");
       return await response.data || [];
    }catch (error) {
      console.error("Error adding event:", error);
      return error;
    }
 };
 export const updateUser = async(id,updates)=>{
    try{
       const response = await API.put(`/auth/users/${id}`,updates);
       return await response.data || {};
    }catch (error) {
      console.error("Error adding event:", error);
     return error;
    }
 };
 export const deleteUser = async(id)=>{
    try{
       const response = await API.delete(`/auth/users/${id}`);
       return await response.data || {};
    }catch (error) {
      console.error("Error adding event:", error);
      return error;
    }
 };

 export const getUser = async(id) => {
    try{
    const response = await API.get(`/auth/users/${id}`);
    return await response.data || {};
    
    }catch (error) {
      console.error("Error adding event:", error);
      return error;
    }
 };

 //EVENTS
 export const getEvents = async () => {
  try {
    const response = await API.get("/events");
    return await response.data || [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return error;
  }
};


export const addEvent = async (newEvent) => {
  try {
    const response = await API.post("/events", newEvent);
    return await response.data || {};
  } catch (error) {
    console.error("Error adding event:", error);
    return error;
  }
};

export const getEvent = async (id) => {
  try{
    const response = await API.get(`/events/${id}`);
    return await response.data || {};
  }catch(error){
    console.error("Error fetching events:", error);
    return error;
  }
};

export const updateEvent = async (id, updates) => {
  try {
    const response = await API.put(`/events/${id}`, updates);
    return await response.data || {};
  } catch (error) {
    console.error("Error updating event:", error);
    return error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await API.delete(`/events/${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error deleting event:", error);
    return error;
  }
};

