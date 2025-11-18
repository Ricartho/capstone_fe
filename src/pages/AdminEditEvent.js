import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  useMediaQuery,
  Paper,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export default function AdminEditEvent() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    eventDate: dayjs(),
    eventTime: dayjs(), 
    location: "",
    description: "", 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/events/${id}`);
        const data = res.data;

        setEvent({
          title: data.title || "",
          eventDate: dayjs(data.eventDate),
          eventTime: dayjs(data.eventTime, "HH:mm"),
          location: data.location || "",
          description: "", 
        });
      } catch (err) {
        console.error("Error loading event:", err);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setError("");
    if (!event.title || !event.eventDate || !event.eventTime || !event.location) {
      setError("Please complete all required fields.");
      return;
    }

    const payload = {
      title: event.title,
      eventDate: dayjs(event.eventDate).format("YYYY-MM-DD"),
      eventTime: dayjs(event.eventTime).format("HH:mm"),
      location: event.location,
    };

    try {
      await axios.put(`${BASE_URL}/api/events/${id}`, payload);
      navigate("/admin");
    } catch (err) {
      console.error("Error saving event:", err);
      setError("Failed to update event.");
    }
  };

  const handleCancel = () => {
    navigate("/admin");
  };

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
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={handleCancel} sx={{ color: "#FFC629", mr: 1 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Edit Event #{id}
            </Typography>
          </Box>

          {/* Error */}
          {error && (
            <Typography sx={{ color: "#ff6b6b", mb: 2, fontSize: 14 }}>
              {error}
            </Typography>
          )}

          {/* Title */}
          <Typography sx={{ mb: 1.25 }}>Event Name:</Typography>
          <TextField
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

          {/* Time */}
          <Typography sx={{ mb: 1.25 }}>Event Time:</Typography>
          <Paper sx={{ p: 1, mb: 2, backgroundColor: "white", borderRadius: 2 }}>
            <TimePicker
              value={event.eventTime}
              onChange={(newValue) => setEvent((prev) => ({ ...prev, eventTime: newValue }))}
            />
          </Paper>

          {/* Location */}
          <Typography sx={{ mb: 1.25 }}>Location:</Typography>
          <TextField
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
            onClick={handleSave}
            disabled={loading}
          >
            SAVE
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
        </Box>
      </Box>
    </LocalizationProvider>
  );
}
