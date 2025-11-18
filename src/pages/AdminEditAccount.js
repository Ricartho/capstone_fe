import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function AdminEditAccount() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Student",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/users/${id}`);

        const user = res.data;
        const splitName = user.name?.split(" ") || ["", ""];
        const f = splitName[0];
        const l = splitName.slice(1).join(" ");

        setFormData({
          firstName: f,
          lastName: l,
          email: user.email || "",
          role: user.admin ? "Admin" : "Student",
        });
      } catch (err) {
        console.error("Error loading user:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  const handleSave = async () => {
    setError("");

    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      admin: formData.role === "Admin",
      active: true,
    };

    try {
      await axios.put(`${BASE_URL}/api/users/${id}`, payload);
      navigate("/admin/view-accounts");
    } catch (err) {
      console.error("Error updating account:", err);
      setError("Failed to update account.");
    }
  };

  const handleCancel = () => {
    navigate("/admin/view-accounts");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      {/* ===== Page Title ===== */}
      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Edit Account
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

        {/* Errors */}
        {error && (
          <Typography sx={{ color: "#ff6b6b", fontSize: 14 }}>
            {error}
          </Typography>
        )}

        {/* First Name */}
        <Typography sx={{ fontSize: 14, mt: 2 }}>First Name</Typography>
        <TextField
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
        />

        {/* Last Name */}
        <Typography sx={{ fontSize: 14 }}>Last Name</Typography>
        <TextField
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
        />

        {/* Email */}
        <Typography sx={{ fontSize: 14 }}>KSU Email</Typography>
        <TextField
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
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
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
        >
          <MenuItem value="Student">Student</MenuItem>
          <MenuItem value="Faculty">Faculty</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </TextField>

        {/* Save Button */}
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
          disabled={loading}
        >
          SAVE
        </Button>

        {/* Cancel Button */}
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
          disabled={loading}
        >
          CANCEL
        </Button>
      </Box>
    </Box>
  );
}
