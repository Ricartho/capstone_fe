import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

// ===== Page Imports =====
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEditEvent from "./pages/AdminEditEvent"; 
import Progress from "./pages/Progress";
import AdminViewAccounts from "./pages/AdminViewAccounts";
import AdminEditAccount from "./pages/AdminEditAccount";
import AdminPasswordChange from "./pages/AdminPasswordChange";
import AdminNewEvent from "./pages/AdminNewEvent";
import AdminAddAccount from "./pages/AdminAddAccount";
import ForgotPassword from "./pages/ForgotPassword";

export default function App() {
  return (
    <Router>
      {/* ===== DEMO NAVIGATION BAR ===== */}
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
        <Button component={Link} to="/" variant="contained" sx={navBtnStyle}>
          LOGIN
        </Button>
        <Button component={Link} to="/signup" variant="contained" sx={navBtnStyle}>
          SIGN UP
        </Button>
        <Button component={Link} to="/events" variant="contained" sx={navBtnStyle}>
          EVENTS
        </Button>
        <Button component={Link} to="/admin" variant="contained" sx={navBtnStyle}>
          ADMIN
        </Button>
        <Button component={Link} to="/progress" variant="contained" sx={navBtnStyle}>
          PROGRESS
        </Button>
      </Box>

      {/* ===== ROUTES ===== */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/event-details" element={<EventDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/edit-event/:id" element={<AdminEditEvent />} /> {/* ✅ fixed route */}
        <Route path="/admin/new-event" element={<AdminNewEvent />} />
        <Route path="/admin/view-accounts" element={<AdminViewAccounts />} />
        <Route path="/admin/add-account" element={<AdminAddAccount />} />
        <Route path="/admin/edit-account/:id" element={<AdminEditAccount />} />
        <Route
          path="/admin/password-change/:id"
          element={<AdminPasswordChange />}
        />

        {/* Progress Page */}
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

const navBtnStyle = {
  backgroundColor: "black",
  color: "white",
  fontWeight: "bold",
  px: 3,
  "&:hover": { backgroundColor: "#222" },
};
