import React, { useEffect, useState } from "react";
import { useNavigate, useParams ,useLoaderData} from "react-router-dom";
import axios from "axios";
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
  Select,
  InputLabel
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";




export default function AdminEditMilestone({onEdit,categories}) {

  const isMobile = useMediaQuery("(max-width:600px)");

  //The event from the API, served by the loader on App.js
  const milestoneToEdit = useLoaderData();
  console.log( milestoneToEdit);

  const navigate = useNavigate();

  const { id } = useParams();
  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: milestoneToEdit.title,
    criteria: milestoneToEdit.criteria,
    category: milestoneToEdit.category,
    description: milestoneToEdit.description,
  });

const handleCancel = () => {
    navigate("/admin/view-milestones");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    // e.preventDefault()
    setError("");
      console.log('user to updatet',formData);
    if (!formData.title || !formData.criteria || !formData.description || !formData.category) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      title: formData.title,
      criteria: formData.criteria,
      category: formData.category,
      description: formData.description
     
    };

    onEdit(milestoneToEdit.id,payload);
    navigate("/admin/view-milestones");
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
          Edit Milestone
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
          mt: 3,
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

        {/* Errors */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", fontSize: 14 }}>
            {error}
          </Typography>
        )}

       
        <Typography sx={{ fontSize: 14,mb: 1 }}>Milestone Name:</Typography>
        <TextField
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          sx={{ mb: 3,}}
        />
       
        <Typography sx={{ fontSize: 14,mb: 1 }}>Milestone criteria:</Typography>
        <TextField
          required
          name="criteria"
          type="number"
          value={formData.criteria}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
           sx={{ mb: 3,}}
        />

        <Typography sx={{ mb: 1 }}>Category:</Typography>
        <Select
            required={true}
            fullWidth
            name="category"
            label="Category"
            variant="outlined"
            size="small"
            value={formData.category}
            onChange={handleChange}
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
         > 

        {categories.map(cat =>(
            <MenuItem value={cat.uniqCode}>{cat.title}</MenuItem>
        ))}
        </Select>
        <Typography sx={{ fontSize: 14,mb: 1 }}>Milestone Goal / Description:</Typography>
        <TextField
          required
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          multiline
            rows={3}
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
           sx={{ mb: 3,}}
        />
       

        


    <Button
          fullWidth
          variant="contained"
          sx={{
                backgroundColor: "#FFC629",
                color: "black",
                fontWeight: "bold",
                mb: 2,
          }}
          type="submit"
          disabled={loading}
          >
            UPDATE
          </Button>
          
    <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#333", color: "white", fontWeight: "bold" }}
            onClick={handleCancel}
            disabled={loading}
            >
            CANCEL
          </Button>
      
        </form>
      </Box>
    </>
  );
}