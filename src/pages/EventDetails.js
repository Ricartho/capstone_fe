import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import KSUBanner from "../assets/ksubanner2.jpg";
import axios from "axios";
import { BASE_URL } from "../config";

export default function EventDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get("id");

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events/${eventId}`);
        setEvent(response.data);
      } catch (err) {
        console.error("Failed to load event details:", err);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Loading event...</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        sx={{
          backgroundColor: "black",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography>No event data available.</Typography>
        <Button sx={{ mt: 2, color: "#FFC629" }} onClick={() => navigate("/events")}>
          ← Back to Events
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      <Box
        sx={{
          backgroundColor: "#FFC629",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          p: 1,
        }}
      >
        <IconButton onClick={() => navigate("/events")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          component="img"
          src={KSUBanner}
          alt="KSU Banner"
          sx={{ width: "100%", height: 250, objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
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
          EVENT DETAILS
        </Typography>
      </Box>

      <Box sx={{ mt: 3, px: 3, textAlign: "center" }}>
        <Typography variant="h5" sx={{ color: "#FFC629", fontWeight: "bold" }}>
          {event.title}
        </Typography>
        <Divider sx={{ backgroundColor: "#FFC629", my: 2 }} />
        <Typography>Date: {event.eventDate}</Typography>
        <Typography>Time: {event.eventTime}</Typography>
        <Typography>Location: {event.location}</Typography>
        <Typography sx={{ mt: 2, color: "#ddd" }}>
          {event.description || "No description available."}
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={() => alert("RSVP submitted")}
          >
            RSVP
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={() => alert("Attendance marked")}
          >
            MARK ATTENDED
          </Button>
        </Box>

        <Button sx={{ mt: 3, color: "#FFC629" }} onClick={() => navigate("/events")}>
          ← Back to Events
        </Button>
      </Box>
    </Box>
  );
}

