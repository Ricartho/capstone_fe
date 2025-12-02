
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

export default function AdminNewMilestone() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventsNeeded: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
  
    alert("Milestone saved (demo only).");
    navigate("/admin");
  };

  const handleCancel = () => {
    navigate("/admin");
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
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#FFC629",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
          width: "100%",
        }}
      >
        <IconButton onClick={() => navigate("/events")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
            letterSpacing: "0.05em",
          }}
        >
          ADMIN
        </Typography>
        <IconButton size="small">
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Lock + Title */}
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          New Milestone
        </Typography>
      </Box>

      {/* Form */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 420,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 1,
        }}
      >
        {/* Back Button */}
        <IconButton
          onClick={handleCancel}
          sx={{
            backgroundColor: "#FFC629",
            color: "black",
            width: 35,
            height: 35,
            alignSelf: "flex-start",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        {/* Title */}
        <Typography sx={{ fontSize: 14, mt: 2 }}>Milestone Title</Typography>
        <TextField
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          placeholder="e.g., Attend 5 Events"
        />

        {/* Goal / Description */}
        <Typography sx={{ fontSize: 14 }}>Goal / Description</Typography>
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          placeholder="Describe what is required to complete this milestone."
        />

        {/* Events Needed (int) */}
        <Typography sx={{ fontSize: 14 }}>Events Needed to Attend</Typography>
        <TextField
          name="eventsNeeded"
          type="number"
          value={formData.eventsNeeded}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          inputProps={{ min: 0 }}
          placeholder="e.g., 5"
        />

        {/* Buttons */}
        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={handleSave}
        >
          SAVE
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            mb: 4,
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={handleCancel}
        >
          CANCEL
        </Button>
      </Box>
    </Box>
  );
}
