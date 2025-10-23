import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getEvents } from "../services/api"; 

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      const data = await getEvents();
      setEvents(data || []);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

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
      {/* ===== HEADER BAR ===== */}
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
        <IconButton>
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          EVENTS
        </Typography>
        <IconButton>
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>

      {/* ===== BANNER IMAGE ===== */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          component="img"
          src={require("../assets/ksubanner1.jpg")}
          alt="KSU Banner"
          sx={{
            width: "100%",
            height: isMobile ? "150px" : "250px",
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "80px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, black 100%)",
          }}
        />
      </Box>

      {/* ===== SEARCH BAR ===== */}
      <TextField
        placeholder="Search events..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          marginTop: "20px",
          width: isMobile ? "85%" : "50%",
          "& .MuiOutlinedInput-root": { borderRadius: "10px" },
        }}
      />

      {/* ===== EVENT LIST ===== */}
      <Box
        sx={{
          width: isMobile ? "90%" : "70%",
          marginTop: "25px",
          marginBottom: "40px",
        }}
      >
        {loading ? (
          // 🔄 Loading spinner while waiting for backend
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <CircularProgress sx={{ color: "#FFC629" }} />
          </Box>
        ) : filteredEvents.length > 0 ? (
          // ✅ Event cards
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              sx={{
                borderRadius: "20px",
                backgroundColor: "white",
                color: "black",
                marginBottom: "18px",
                textAlign: "center",
                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {event.title}
                </Typography>
                <Typography>
                  {event.eventDate} – {event.eventTime}
                </Typography>
                <Typography>{event.location}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          // ⚠️ If no events found
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              marginTop: "40px",
              fontStyle: "italic",
            }}
          >
            No events found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}


