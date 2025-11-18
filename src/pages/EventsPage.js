import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import KSUBanner from "../assets/ksubanner2.jpg";

export default function EventsPage() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);
        setEvents(response.data);
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (id) => {
    navigate(`/event-details?id=${id}`);
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
      }}
    >
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#FFC629",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "4px 12px" : "6px 20px",
          height: isMobile ? "44px" : "52px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.25)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={() => navigate("/")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={() => navigate("/signup")} size="small">
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          component="img"
          src={KSUBanner}
          alt="KSU Banner"
          sx={{
            width: "100%",
            height: { xs: 200, sm: 250, md: 300 },
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontWeight: 800,
          }}
        >
          EVENTS
        </Typography>
      </Box>

      <Box sx={{ width: "100%", mt: 4, textAlign: "center" }}>
        {loading ? (
          <Typography>Loading events...</Typography>
        ) : events.length === 0 ? (
          <Typography sx={{ color: "#aaa" }}>
            No events available.
          </Typography>
        ) : (
          events.map((event) => (
            <Card
              key={event.id}
              sx={{
                width: "90%",
                maxWidth: 500,
                backgroundColor: "#111",
                color: "white",
                mb: 3,
                borderRadius: "16px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                cursor: "pointer",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
              onClick={() => handleEventClick(event.id)}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#FFC629", fontWeight: "bold", mb: 1 }}
                >
                  {event.title}
                </Typography>
                <Typography sx={{ color: "#ddd" }}>
                  {event.eventDate} | {event.eventTime}
                </Typography>
                <Typography sx={{ mt: 0.5, color: "#aaa" }}>
                  {event.location}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
