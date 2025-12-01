import React, { useEffect, useState } from "react";
import { useNavigate, useParams ,useLoaderData} from "react-router-dom";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";

const BASE_URL = process.env.REACT_APP_API_URL || "";

export default function AdminEditAccount({onEdit}) {

  const isMobile = useMediaQuery("(max-width:600px)");

  //The event from the API, served by the loader on App.js
  const userToEdit = useLoaderData();
  console.log(userToEdit);

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fName: userToEdit.fName,
    lName: userToEdit.lName,
    email: userToEdit.email,
    admin: userToEdit.admin,
  });

const handleCancel = () => {
    navigate("/admin/view-accounts");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(`${BASE_URL}/api/users/${id}`);

  //       const user = res.data;
  //       const splitName = user.name?.split(" ") || ["", ""];
  //       const f = splitName[0];
  //       const l = splitName.slice(1).join(" ");

  //       setFormData({
  //         firstName: f,
  //         lastName: l,
  //         email: user.email || "",
  //         role: user.admin ? "Admin" : "Student",
  //       });
  //     } catch (err) {
  //       console.error("Error loading user:", err);
  //       setError("Failed to load user details.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadUser();
  // }, [id]);

  const handleSubmit = async (e) => {
    // e.preventDefault()
    setError("");
      console.log('user to updatet',formData);
    if (!formData.fName || !formData.lName || !formData.email) {
      setError("Please fill out all required fields.");
      return;
    }

    const payload = {
      fName: formData.fName,
      lName: formData.lName,
      email: formData.email,
      admin: formData.admin,
    };

    // try {
    //   await axios.put(`${BASE_URL}/api/users/${id}`, payload);
    //   navigate("/admin/view-accounts");
    // } catch (err) {
    //   console.error("Error updating account:", err);
    //   setError("Failed to update account.");
    // }
    onEdit(userToEdit.id,payload);
    navigate("/admin/view-accounts");
  };

  

  return (
    <>

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
        <IconButton onClick={()=>navigate("/admin")}>
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          ADMIN DASHBOARD
        </Typography>
        <IconButton>
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>
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
          maxWidth: 450,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
          backgroundColor: "#111",
            p: 4,
            borderRadius: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.4)",
        }}
      >
        <form autoComplete="off" onSubmit={handleSubmit}>
          
        {/* Back Button */}
        <IconButton
          onClick={handleCancel}
          sx={{
            mb:3,
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
        <Typography sx={{ fontSize: 14,mb: 1 }}>First Name</Typography>
        <TextField
          required
          name="fName"
          value={formData.fName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          sx={{ mb: 3,}}
        />

        {/* Last Name */}
        <Typography sx={{ fontSize: 14,mb: 1  }}>Last Name</Typography>
        <TextField
          required
          name="lName"
          value={formData.lName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          sx={{ mb: 3,}}
        />

        {/* Email */}
        <Typography sx={{ fontSize: 14,mb: 1 }}>KSU Email</Typography>
        <TextField
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
           sx={{ mb: 3,}}
        />

        {/* Role */}
        <Typography sx={{ fontSize: 14,mb: 1  }}>Role:</Typography>
        <TextField
          required
          select
          name="admin"
          value={formData.admin}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          InputProps={{
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
          sx={{ mb: 3,}}
        >
         <MenuItem value="false">Student</MenuItem>
         <MenuItem value="true">Faculty/Admin</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          sx={{
                backgroundColor: "#FFC629",
                color: "black",
                fontWeight: "bold",
                mb: 2,
          }}
          type="submit"
          disabled={loading}
          >
            UPDATE
          </Button>
          
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#333", color: "white", fontWeight: "bold" }}
            onClick={handleCancel}
            disabled={loading}
            >
            CANCEL
          </Button>
        {/* Save Button */}
        {/* <Button
          variant="contained"
          sx={{
            mb: 2,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          type="submit"
          disabled={loading}
        >
          SAVE
        </Button> */}

        {/* Cancel Button */}
        {/* <Button
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
        </Button> */}
        </form>
      </Box>
    </>
  );
}