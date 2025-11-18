import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function AdminNewEvent() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    eventDate: dayjs(),
    startTime: dayjs(),
    endTime: dayjs().add(1, "hour"), 
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    
    console.log("Event to submit:", event);
    alert("Event created successfully (demo only).");
    navigate("/admin");
  };

  const handleCancel = () => navigate("/admin");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
          {/* Back Icon */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleCancel} sx={{ color: "#FFC629", mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              New Event Details
            </Typography>
          </Box>

          {/* ===== Event Name ===== */}
          <Typography sx={{ mb: 1 }}>Event Name:</Typography>
          <TextField
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
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            {/* Start Time */}
            <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white" }}>
              <TimePicker
                value={event.startTime}
                onChange={(newValue) =>
                  setEvent((prev) => ({ ...prev, startTime: newValue }))
                }
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>

            {/* End Time */}
            <Paper elevation={2} sx={{ p: 1, flex: 1, backgroundColor: "white" }}>
              <TimePicker
                value={event.endTime}
                onChange={(newValue) =>
                  setEvent((prev) => ({ ...prev, endTime: newValue }))
                }
                slotProps={{ textField: { size: "small", fullWidth: true } }}
              />
            </Paper>
          </Box>

          {/* ===== Location ===== */}
          <Typography sx={{ mb: 1 }}>Location:</Typography>
          <TextField
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
            onClick={handleCreate}
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
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
