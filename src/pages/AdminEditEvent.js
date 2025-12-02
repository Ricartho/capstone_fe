import React, {useState } from "react";
import {useNavigate, useLoaderData } from "react-router-dom";
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
  useMediaQuery,
  Paper,
IconButton,
} from "@mui/material";



export default function AdminEditEvent({onEdit}) {

  //The event from the API, served by the loader on App.js
  const eventToEdit = useLoaderData();
  console.log(eventToEdit);

 const handleLogout = () =>{
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      navigate("/");
    }
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [event, setEvent] = useState({
   title:eventToEdit.title ,
   eventDate: dayjs(),
   eventTimeStart: dayjs(),
   eventTimeEnd: dayjs().add(1, "hour"), 
   location: eventToEdit.location,
   description: eventToEdit.description, 
  });

  const handleCancel = () => {
    navigate("/admin");
   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!event.title || !event.eventDate || !event.eventTimeStart || !event.eventTimeEnd || !event.location) {
      setError("Please complete all required fields.");
      return;
   }

    const payload = {
      title: event.title,
      eventDate: event.eventDate,
      eventTimeStart: event.eventTimeStart,
      eventTimeEnd: event.eventTimeEnd,
      location: event.location,
      description: event.description
    };

    onEdit(eventToEdit.id,payload);
    navigate("/admin");
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
        <IconButton onClick={()=>handleLogout()} >
          <LogoutIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>
        {/* Title Only */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <LockIcon sx={{ fontSize: 50, color: "#FFC629" }} />
          <Typography variant={isMobile ? "h6" : "h5"} sx={{ mt: 1 }}>
            Edit Event
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
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

          {/* Title */}
          <Typography sx={{ mb: 1.25 }}>Event Name:</Typography>
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

          {/* Date */}
          <Typography sx={{ mb: 1.25 }}>Event Date:</Typography>
          <Paper sx={{ p: 1, mb: 2, backgroundColor: "white", borderRadius: 2 }}>
            <DatePicker
              value={event.eventDate}
              onChange={(newValue) => setEvent((prev) => ({ ...prev, eventDate: newValue }))}
            />
          </Paper>

            {/* ===== Event Time ===== */}
            <Typography sx={{ mb: 1 }}>Event Time:</Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                     {/* Start Time */}
                     <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white",width:"40%"}}>
                       <TimePicker
                         value={event.eventTimeStart}
                         onChange={(newValue) =>
                           setEvent((prev) => ({ ...prev, eventTimeStart: newValue }))
                         }
                         slotProps={{ textField: { size: "small", fullWidth: true } }}
                       />
                     </Paper>
         
                     {/* End Time */}
                     <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white",width:"40%" }}>
                       <TimePicker
                         value={event.eventTimeEnd}
                         onChange={(newValue) =>
                           setEvent((prev) => ({ ...prev, eventTimeEnd: newValue }))
                         }
                         slotProps={{ textField: { size: "small", fullWidth: true } }}
                       />
                     </Paper>
                </Box>

          {/* Location */}
          <Typography sx={{ mb: 1.25 }}>Location:</Typography>
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

          {/* Description*/}
          <Typography sx={{ mb: 1.25 }}>Description (not saved):</Typography>
          <TextField
            required={true}
            fullWidth
            name="description"
            value={event.description}
            onChange={handleChange}
            variant="outlined"
            size="small"
            multiline
            rows={3}
            sx={{ mb: 3, backgroundColor: "white", borderRadius: 1 }}
          />

          {/* Buttons */}
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