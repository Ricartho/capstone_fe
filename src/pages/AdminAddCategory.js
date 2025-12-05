import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

//MUI
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LogoutIcon from '@mui/icons-material/Logout';

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  Paper,
} from "@mui/material";

export default function AdminAddCategory({onAddCategory}) {

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [category, setCategory] = useState({
    title: "",
    uniqCode: "",
    description: "",
  });
 
  const handleCancel = () => navigate("/admin/view-category");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    
    console.log("Event to submit:", category);
    e.preventDefault();
    if(category.title != null && category.uniqCode != null && category.description != null){
       const action =  await onAddCategory(category);
       console.log(action);
       if(!action.id){
          setError("Error while creating category, please verify the UniqCode and try again");
       }else{
        navigate("/admin/view-category");
       }
        
    }else{
      setError("Please complete all required fields.");
      return;
    }
  
  };


  //The menu bar actions
      const handleHomepage = (path) =>{
        navigate(path);
        window.location.reload(); 
      }
      const handleProgressPage = (path) =>{
        navigate(path);
        window.location.reload(); 
      }
      const handleLogout = (path) =>{
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('userId');
        navigate(path);
        window.location.reload(); 
      }
      //
       //make sure the user is logged in
      const checkLogin = () => {
          if(!sessionStorage.getItem('userToken')){navigate("/");}
      };
      
      useEffect(()=>{
          //  checkLogin();
         },[]);
  return (
      <>
       {/* ===== Header Bar ===== */}
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFC629",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "8px 15px" : "12px 25px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={() => handleHomepage("/admin")} size="small">
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>

        <Typography variant={isMobile ? "h6" : "h5"}sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          ADMIN DASHBOARD
        </Typography>

         <Box>
        {/* <IconButton onClick={() => handleProgressPage("/my-progress")} size="small">
          <TuneIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton> */}
        <IconButton onClick={()=>handleLogout("/")} size="small">
          <LogoutIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
        </Box>
      </Box>

        {/* ===== Page Title & Lock Icon ===== */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <LockIcon sx={{ fontSize: 50, color: "#FFC629", mb: 1 }} />
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 600 }}>
            Create New Category
          </Typography>
        </Box>

        {/* ===== Form Container ===== */}
        <Box
          sx={{
            mt: 4,
            width: "90%",
            maxWidth: 450,
            backgroundColor: "#111",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
          }}
        >
           {/* ===== FORM ===== */}

          <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Back Icon */}
          {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              New Event 
            </Typography>
          </Box> */}
          {/* Back Button */}
        <IconButton
          onClick={handleCancel}
          sx={{
            mb:3,
            backgroundColor: "#FFC629",
            color: "black",
            width: 35,
            height: 35,
            alignSelf: "flex-start",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

           {/* Error */}
          {error && (
              <Typography sx={{ color: "#ff6b6b", mb: 2, fontSize: 14 }}>
                  {error}
              </Typography>
          )}
         
          
          {/* ===== Event Name ===== */}
          <Typography sx={{ mb: 1 }}>Category Name:</Typography>
          <TextField
             required={true}
            fullWidth
            name="title"
            value={category.title}
            onChange={handleChange}
            variant="outlined"
            size="small"
          
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

    

          {/* ===== Location ===== */}
          <Typography sx={{ mb: 1 }}>Category Code:</Typography>
          <TextField
            required={true}
            fullWidth
            name="uniqCode"
            value={category.uniqCode}
            onChange={handleChange}
            variant="outlined"
            size="small"
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          {/* ===== Description ===== */}
          <Typography sx={{ mb: 1 }}>Description:</Typography>
          <TextField
            fullWidth
            required={true}
            name="description"
            value={category.description}
            onChange={handleChange}
            multiline
            rows={3}
            variant="outlined"
            size="small"
            sx={{ mb: 3, backgroundColor: "white", borderRadius: 1 }}
          />

          {/* ===== Buttons ===== */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              mb: 2,
              "&:hover": { backgroundColor: "#e6b400" },
            }}
           type="submit"
          >
            Create Category
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#444",
              color: "white",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#555" },
            }}
            onClick={handleCancel}
          >
            Cancel
          </Button>
          </form>
        </Box>
      </>

  );
}