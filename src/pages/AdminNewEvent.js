import React, { useState } from "react";
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

export default function AdminNewEvent({onAddEvent}) {

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const [event, setEvent] = useState({
    title: "",
    eventDate: dayjs(),
    eventTimeStart: dayjs(),
    eventTimeEnd: dayjs().add(1, "hour"), 
    location: "",
    description: "",
  });
  const handleLogout = () =>{
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      navigate("/");
    }
  const handleCancel = () => navigate("/admin");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    
    console.log("Event to submit:", event);
    //e.preventDefault();
    if(event.title != null && event.location != null && event.description != null){
        onAddEvent(event);
        navigate("/admin");
    }else{
      setError("Please complete all required fields.");
      return;
    }
  
  };



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
        <IconButton onClick={()=>navigate("/admin")}>
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          ADMIN DASHBOARD
        </Typography>
        <IconButton onClick={()=>handleLogout()}>
          <LogoutIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>

        {/* ===== Page Title & Lock Icon ===== */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <LockIcon sx={{ fontSize: 50, color: "#FFC629", mb: 1 }} />
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 600 }}>
            Create New Event
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
          <Typography sx={{ mb: 1 }}>Event Name:</Typography>
          <TextField
             required={true}
            fullWidth
            name="title"
            value={event.title}
            onChange={handleChange}
            variant="outlined"
            size="small"
          
            sx={{ mb: 2, backgroundColor: "white", borderRadius: 1 }}
          />

          {/* ===== Event Date ===== */}
          <Typography sx={{ mb: 1 }}>Event Date:</Typography>
          <Paper
            elevation={2}
            sx={{ mb: 2, p: 1, borderRadius: 1.5, backgroundColor: "white" }}
          >
            <DatePicker
              value={event.eventDate}
              onChange={(newValue) =>
                setEvent((prev) => ({ ...prev, eventDate: newValue }))
              }
              slotProps={{ textField: { size: "small", fullWidth: true } }}
            />
          </Paper>

          {/* ===== Event Time ===== */}
          <Typography sx={{ mb: 1 }}>Event Time:</Typography>
          <Box sx={{ display: "flex", flexDirection:"row",gap: 2, mb: 2 }}>
            {/* Start Time */}
            <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white", width:"40%"}}>
              <TimePicker
                value={event.eventTimeStart}
                onChange={(newValue) =>
                  setEvent((prev) => ({ ...prev, eventTimeStart: newValue }))
                }
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>

            {/* End Time */}
            <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white",width:"40%"}}>
              <TimePicker
                value={event.eventTimeEnd}
                onChange={(newValue) =>
                  setEvent((prev) => ({ ...prev, eventTimeEnd: newValue }))
                }
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>
          </Box>

          {/* ===== Location ===== */}
          <Typography sx={{ mb: 1 }}>Location:</Typography>
          <TextField
            required={true}
            fullWidth
            name="location"
            value={event.location}
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
            value={event.description}
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
            Create Event
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