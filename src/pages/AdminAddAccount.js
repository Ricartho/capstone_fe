import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export default function AdminAddAccount() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Student",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      admin: formData.role === "Admin",
      active: true,
    };

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, payload);
      navigate("/admin/view-accounts");
    } catch (err) {
      console.error("Error creating account:", err);
      setError("Failed to create account. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/view-accounts");
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
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Add New Account
        </Typography>
      </Box>

      {/* ===== Form Section ===== */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
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

        {/* Error Message */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", fontSize: 14 }}>
            {error}
          </Typography>
        )}

        {/* First Name */}
        <Typography sx={{ fontSize: 14 }}>First Name</Typography>
        <TextField
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter first name"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
        />

        {/* Last Name */}
        <Typography sx={{ fontSize: 14 }}>Last Name</Typography>
        <TextField
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter last name"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
        />

        {/* Email */}
        <Typography sx={{ fontSize: 14 }}>KSU Email</Typography>
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="example@student.kennesaw.edu"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
        />

        {/* Role */}
        <Typography sx={{ fontSize: 14 }}>Role:</Typography>
        <TextField
          select
          name="role"
          value={formData.role}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Faculty">Faculty</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>

        {/* Password */}
        <Typography sx={{ fontSize: 14 }}>Password</Typography>
        <TextField
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Enter password"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
        />

        {/* Confirm Password */}
        <Typography sx={{ fontSize: 14 }}>Confirm Password</Typography>
        <TextField
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          placeholder="Re-enter password"
          InputProps={{ sx: { backgroundColor: "white", borderRadius: 1 } }}
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
          onClick={handleAdd}
        >
          ADD ACCOUNT
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
