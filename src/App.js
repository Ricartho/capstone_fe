import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventDetails from "./pages/EventDetails"; 
import { Box, Button } from "@mui/material";

export default function App() {
  return (
    <Router>
      {/* ===== TEMPORARY NAVIGATION BAR FOR DEMO ===== */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          backgroundColor: "#FFC629",
          padding: "10px 0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Login
        </Button>

        <Button
          component={Link}
          to="/signup"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Sign Up
        </Button>

        <Button
          component={Link}
          to="/events"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Events
        </Button>

        <Button
          component={Link}
          to="/admin"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Admin
        </Button>
      </Box>

      {/* ===== PAGE ROUTES ===== */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event-details" element={<EventDetails />} /> {/* 👈 NEW */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}
