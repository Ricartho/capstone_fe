import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export default function AdminDashboard() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/events`);
        setEvents(res.data.events || []);
      } catch (err) {
        console.error("Error loading events:", err);
        setEvents([]);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = search
    ? events.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    : events;

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleViewAccounts = () => {
    navigate("/admin/view-accounts");
  };

  const handleNewEvent = () => {
    navigate("/admin/new-event");
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowX: "hidden",
      }}
    >
      {/* ===== Page Title ===== */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <LockIcon sx={{ fontSize: 60, color: "#FFC629" }} />
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", mt: 1 }}
        >
          ADMIN DASHBOARD
        </Typography>
      </Box>

      {/* ===== Search Bar ===== */}
      <Box sx={{ mt: 4, width: "90%", maxWidth: 500 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            sx: { backgroundColor: "#fff", borderRadius: 2 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* ===== New Event Button ===== */}
      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#FFC629",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#e6b400" },
          borderRadius: "8px",
          px: 4,
        }}
        onClick={handleNewEvent}
      >
        NEW EVENT
      </Button>

      {/* ===== Event List ===== */}
      <Box
        sx={{
          mt: 4,
          width: "90%",
          maxWidth: 700,
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #444",
          borderRadius: 2,
          p: 2,
          backgroundColor: "#111",
          height: "320px",
        }}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Box
              key={event.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#1a1a1a",
                borderRadius: 3,
                p: 2,
                mb: 2,
              }}
            >
              <Box sx={{ textAlign: "left" }}>
                <Typography sx={{ color: "#FFC629", fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>
                  {event.eventDate} {event.eventTime && `| ${event.eventTime}`}
                </Typography>
                <Typography sx={{ color: "#aaa", fontSize: "0.85rem" }}>
                  {event.location}
                </Typography>
              </Box>

              <Box>
                <IconButton
                  sx={{ color: "#FFC629" }}
                  onClick={() => handleEdit(event.id)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton sx={{ color: "#FFC629" }}>
                  <DownloadIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", mt: 10 }}>
            No events found.
          </Typography>
        )}
      </Box>

      {/* ===== Bottom Buttons ===== */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFC629",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6b400" },
            borderRadius: "8px",
            px: 4,
          }}
        >
          DOWNLOAD ALL ATTENDANCE
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFC629",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6b400" },
            borderRadius: "8px",
            px: 4,
          }}
          onClick={handleViewAccounts}
        >
          VIEW ACCOUNTS
        </Button>
      </Box>

      {/* ===== Stats Section ===== */}
      <Divider sx={{ backgroundColor: "#333", width: "80%", mb: 2 }} />
      <Box
        sx={{
          width: "90%",
          maxWidth: 500,
          display: "flex",
          justifyContent: "space-around",
          mb: 4,
        }}
      >
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Events: {events.length}
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Check-ins: 
        </Typography>
      </Box>
    </Box>
  );
}
