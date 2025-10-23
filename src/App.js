import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import EventsPage from "./pages/EventsPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <CssBaseline />
      <Box
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;



