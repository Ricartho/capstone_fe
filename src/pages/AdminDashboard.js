import React from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

export default function AdminDashboard() {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Mock event data
  const events = [
    {
      id: 1,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 2,
      title: "Game Night",
      date: "Sample Date/Time",
      location: "Sample Location",
    },
    {
      id: 3,
      title: "Career Fair",
      date: "Sample Date/Time",
      location: "Sample Location",
    },
    {
      id: 4,
      title: "Owl Fun Run",
      date: "Sample Date/Time",
      location: "Sample Location",
    },
  ];

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
        <IconButton>
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          ADMIN
        </Typography>
        <IconButton>
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>

      {/* ===== Lock Icon ===== */}
      <Box sx={{ mt: 4 }}>
        <LockIcon sx={{ fontSize: 60, color: "#FFC629" }} />
      </Box>

      {/* ===== Search Bar ===== */}
      <Box sx={{ mt: 4, width: "90%", maxWidth: 500 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
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
        {events.map((event) => (
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
                {event.date} {event.time && `| ${event.time}`}
              </Typography>
              <Typography sx={{ color: "#aaa", fontSize: "0.85rem" }}>
                {event.location}
              </Typography>
            </Box>

            <Box>
              <IconButton sx={{ color: "#FFC629" }}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: "#FFC629" }}>
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
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
          Total Check-ins: 52
        </Typography>
      </Box>
    </Box>
  );
}
