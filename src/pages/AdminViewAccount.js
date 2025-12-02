import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Fade,
  Divider
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";



// console.log("🟡 AdminViewAccounts component loaded");

export default function AdminViewAccounts({usersList,onDelete}) {

  
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fadeIn] = useState(true);

  const handleLogout = () =>{
      localStorage.removeItem('userToken');
      localStorage.removeItem('userId');
      navigate("/");
    }
  const filteredUsers = usersList.filter((u) =>
    u.lName.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleEdit = (id) => {
    navigate(`/admin/edit-account/${id}`);
  };
  const handleDelete = (id) => {
    onDelete(id);
    window.location.reload();
  };


  return (
    <>
      {/* ===== Header ===== */}
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
        <IconButton onClick={() => navigate("/admin")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "black", letterSpacing: "0.05em" }}
        >
          ADMIN
        </Typography>
        <IconButton size="small" onClick={()=>handleLogout()} >
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* ===== Title ===== */}
      <Fade in={fadeIn} timeout={800}>
        <Box sx={{ textAlign: "center", mt: 4, mb: 3 }}>
          <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            View Accounts
          </Typography>
        </Box>
      </Fade>

      {/* ===== Search & Add Button ===== */}
      <Box sx={{ width: "90%", maxWidth: 600, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "#e5e5e5",
              borderRadius: "20px",
              px: 2,
              height: 45,
              color: "black",
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={() => navigate("/admin/add-account")}
        >
          ADD ACCOUNT
        </Button>
      </Box>

      {/* ===== Account Cards ===== */}
      <Paper
        sx={{
          width: "90%",
          maxWidth: 800,
          backgroundColor: "#333",
          borderRadius: "10px",
          maxHeight: 600,
          overflowY: "auto",
          p: 2,
          mb: 5,
        }}
      >
        {filteredUsers.map((user) => (
          <Box
            key={user._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#555",
              borderRadius: "30px",
              p: "6px 12px",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#777",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {user.lName.toUpperCase()} {user.fName.toUpperCase()}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => handleEdit(user._id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => navigate(`/admin/password-change/${user.id}`)}
              >
                <VpnKeyIcon fontSize="small" />
              </IconButton>

              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => handleDelete(user._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Paper>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FFC629",
          color: "black",
          fontWeight: "bold",
          px: 3,
          mb: 4,
          "&:hover": { backgroundColor: "#e6b400" },
        }}
        onClick={() => navigate("/admin")}
      >
        ← Back to Dashboard
      </Button>
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
          Total Users: {usersList.length}
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Check-ins: 52(Static)
        </Typography>
      </Box>
    </>
  );
}