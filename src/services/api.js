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
       return await response.data;
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
 export const rssCall = async()=>{
  try{
    const response = await API.get("/events/feed");
    return await response.data || [];
  }catch (error) {
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

export const newProgress = async(userId,eventId,eventCategory,eventTitle) => {
  try{
    const response = await API.get(`progress/${userId}/${eventId}/${eventCategory}/${eventTitle}`);
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

//MILESTONES

 export const getMilestones = async () => {
  try {
    const response = await API.get("/milestones");
    return await response.data || [];
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return error;
  }
};

export const addMilestone = async (newMilestone) => {
  try {
    const response = await API.post("/milestones", newMilestone);
    return await response.data || {};
  } catch (error) {
    console.error("Error adding event:", error);
    return error;
  }
};

export const getMilestone = async (id) => {
  try{
    const response = await API.get(`/milestones/${id}`);
    return await response.data || {};
  }catch(error){
    console.error("Error fetching events:", error);
    return error;
  }
};


export const updateMilestone = async (id, updates) => {
  try {
    const response = await API.put(`/milestones/${id}`, updates);
    return await response.data || {};
  } catch (error) {
    console.error("Error updating event:", error);
    return error;
  }
};

export const deleteMilestone = async (id) => {
  try {
    const response = await API.delete(`/milestones/${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error deleting event:", error);
    return error;
  }
};

//CATEGORIES

 export const getCategories = async () => {
  try {
    const response = await API.get("/categories");
    return await response.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return error;
  }
};

export const addCategory = async (newCategory) => {
  try {
    const response = await API.post("/categories", newCategory);
    return await response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    return error;
  }
};

export const getCategory = async (id) => {
  try{
    const response = await API.get(`/categories/${id}`);
    return await response.data || {};
  }catch(error){
    console.error("Error fetching category:", error);
    return error;
  }
};


export const updateCategory = async (id, updates) => {
  try {
    const response = await API.put(`/categories/${id}`, updates);
    return await response.data || {};
  } catch (error) {
    console.error("Error updating category:", error);
    return error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/categories/${id}`);
    return response.data || {};
  } catch (error) {
    console.error("Error deleting category:", error);
    return error;
  }
};

//REPORT

export const getAllReport = async()=>{
  try{
    const response = await API.get(`/report/download/all`);
    return response;
  }catch (error) {
    console.error("Error deleting category:", error);
    return error;
  }
};

export const getReport = async(id) =>{
  try{
     const response = await API.get(`/report/download/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting category:", error);
    return error;
  }
};


//PASSWORDS

export const getResetPasswordLink = async(email) => {
  try{
    console.log(email);
    const response = await API.post('/auth/forgot-password',{email});
    return response;
  }catch (error) {
    console.error("Error making reset password:", error);
    return error;
  }
}


export const updatePassowrd =  async(token,password) =>{
  try{
    const response = await API.post(`/auth/updatePassword/${token}`,password);
    return response;
  }catch (error) {
    console.error("Error making reset password:", error);
    return error;
  }
}