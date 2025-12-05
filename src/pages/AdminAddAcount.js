import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//MUI
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
    useMediaQuery,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export default function AdminAddAccount({onAddUser}) {
console.log("Welcome");
    const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    admin: "false",
    password:"",
    confirmPassword:"",
  });
console.log(formData);
  const [error, setError] = useState("");
  //REGEX to ensure email format
   const myRegex = /[A-Za-z0-9]+@[A-Za-z]+\.kennesaw\.edu/;

   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    console.log('user to submit',formData);

      if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }else{
        if(!myRegex.test(formData.email)){
      setError("Only KSU emails are accepted,make sure the format is kennesaw.edu");
      return;
     }
    }

    if(formData.fName !== "" && formData.lName !== "" && formData.admin !== "" && formData.email !== "" && formData.password !==""){
        const action = await onAddUser(formData);
        console.log(action);
        if(!action.id){
          setError("Error while creating account, please verify and try again");
        }else{
           navigate("/admin/view-accounts");
        }
       
    }else{
      setError("Please complete all required fields.");
      return;
    }
    
  };

  const handleCancel = () => {
    navigate("/admin/view-accounts");
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

      {/* ===== Page Title ===== */}
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
         Create New Account
        </Typography>
      </Box>

      {/* ===== Form Section ===== */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 4,
          backgroundColor: "#111",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        }}
      >
       <form autoComplete="off" onSubmit={handleSubmit}>
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

        {/* Error Message */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", fontSize: 14 }}>
            {error}
          </Typography>
        )}

        {/* First Name */}
        <Typography sx={{ fontSize: 14, mb: 1 }}>First Name:</Typography>
        <TextField
          required
          name="fName"
          value={formData.fName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter first name"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        />

        {/* Last Name */}
        <Typography sx={{ fontSize: 14,mb: 1  }}>Last Name:</Typography>
        <TextField
          required
          name="lName"
          value={formData.lName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter last name"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        />

        {/* Email */}
        <Typography sx={{ fontSize: 14,mb: 1 }}>KSU Email:</Typography>
        <TextField
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="example@student.kennesaw.edu"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        />

        <Typography sx={{ fontSize: 14,mb: 1 }}>Password:</Typography>
        <TextField
          required
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        />

        <Typography sx={{ fontSize: 14,mb: 1 }}>Confirm Password:</Typography>
        <TextField
          required
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        />
        

        {/* Role */}
        <Typography sx={{ fontSize: 14,mb: 1 }}>Role:</Typography>
        <TextField
        required
          select
          name="admin"
          value={formData.admin}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
          sx={{ mb: 3,}}
        >
          <MenuItem value="false">Student</MenuItem>
          <MenuItem value="true">Faculty/Admin</MenuItem>
        </TextField>

       
        {/* ===== Buttons ===== */}
          <Button
           type="submit"
           fullWidth
           variant="contained"
           sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              mb: 3,
                  "&:hover": { backgroundColor: "#e6b400" },
                }}
              >
                Create User
          </Button>
        
          <Button
            fullWidth
            variant="contained"
            sx={{
                mb:3,
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