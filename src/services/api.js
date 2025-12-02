import axios from "axios";


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api", 
});

// APPI CALL METHODS
//USERS
export const registerUser = async(fName,lName,email,password) => {
    try{
      const resp =  await API.post('/auth/register',{fName,lName,email,password});
      console.log(resp.data);
      return await resp.data;
    }catch(error){
      console.log(error);
    return await error;
    } 
   };

export const loginUser = async (email,password) => {
  try{
    const resp =  await API.post('/auth/login',{email,password});
    sessionStorage.setItem('userToken',resp.data.access_token);
    sessionStorage.setItem('userId',resp.data.user_id);
    return await resp.data;
  }catch(error){
    return  error;
  
  }
 };

 export const addUser = async (newUser)=>{
    try{
       const response = await API.post("/auth/users",newUser);
       return await response.data || {};
    }catch (error) {
      console.error("Error adding user:", error);
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

 //EVENTSS
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

//Progress

export const newProgress = async(userId,eventId,eventTitle) => {
  try{
    const response = await API.get(`progress/${userId}/${eventId}/${eventTitle}`);
    return response.data || {};
  }catch (error) {
    console.error("Error deleting event:", error);
    return error;
}
};

export const progressCount = async(userId) => {
  try{
    const response = await API.get(`progress/count/${userId}`);
    return await response.data || {};
  }catch (error) {
    console.error("Error deleting event:", error);
    return error;
}};

export const progressList = async(userId) => {
  try{
    const response = await API.get(`progress/${userId}`);
    return await response.data || {};
  }catch (error) {
    console.error("Error deleting event:", error);
    return error;
}
};


