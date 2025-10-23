import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";

export default function AdminDashboard() {
  const isMobile = useMediaQuery("(max-width:600px)");

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
          ADMIN DASHBOARD
        </Typography>
        <IconButton>
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 24 : 28 }} />
        </IconButton>
      </Box>

      <Box sx={{ mt: 4 }}>
        <LockIcon sx={{ fontSize: 60, color: "#FFC629" }} />
      </Box>

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

      <Button
        variant="contained"
        sx={{
          mt: 4,
          backgroundColor: "#FFC629",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#e6b400" },
          borderRadius: "8px",
          px: 4,
        }}
      >
        New Event
      </Button>

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
          height: "300px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#1a1a1a",
            borderRadius: 2,
            p: 2,
            mb: 2,
          }}
        >
          <Typography sx={{ color: "#FFC629" }}>Example Event Title</Typography>
          <Box>
            <IconButton sx={{ color: "#FFC629" }}>
              <EditIcon />
            </IconButton>
            <IconButton sx={{ color: "#FFC629" }}>
              <DownloadIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography
          sx={{
            color: "#777",
            textAlign: "center",
            mt: 2,
            fontStyle: "italic",
          }}
        >
          No events yet. Add a new event to get started.
        </Typography>
      </Box>

      <Box sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 2 }}>
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
          Download Attendance
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
          View Accounts
        </Button>
      </Box>

      <Box
        sx={{
          width: "90%",
          maxWidth: 500,
          display: "flex",
          justifyContent: "space-around",
          mt: 2,
          mb: 4,
        }}
      >
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Events: 0
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Check-ins: 0
        </Typography>
      </Box>
    </Box>
  );
}


