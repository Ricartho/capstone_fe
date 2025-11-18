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
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";



console.log("🟡 AdminViewAccounts component loaded");

export default function AdminViewAccounts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fadeIn] = useState(true);

  
  const users = [
    { id: 1, name: "Jane Allen" },
    { id: 2, name: "Joe Carl" },
    { id: 3, name: "Sam Denton" },
    { id: 4, name: "Mary Evans" },
  ];

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
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
        <IconButton onClick={() => navigate("/")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "black", letterSpacing: "0.05em" }}
        >
          ADMIN
        </Typography>
        <IconButton size="small">
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
      <Box sx={{ width: "90%", maxWidth: 400, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search students..."
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
          maxWidth: 420,
          backgroundColor: "#333",
          borderRadius: "10px",
          maxHeight: 400,
          overflowY: "auto",
          p: 2,
          mb: 5,
        }}
      >
        {filteredUsers.map((user) => (
          <Box
            key={user.id}
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
              {user.name}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => navigate(`/admin/edit-account/${user.id}`)}
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
                onClick={() => alert(`Delete ${user.name} (demo only)`)}
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
    </Box>
  );
}
