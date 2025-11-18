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
import EmailIcon from "@mui/icons-material/Email";

export default function AdminPasswordChange() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("jallen@student.kennesaw.edu");
  const [status, setStatus] = useState("");

  const handleSendLink = () => {
    setStatus(`A password reset link has been sent to ${email}`);
    setTimeout(() => navigate("/admin/view-accounts"), 2000);
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
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
          ADMIN
        </Typography>
        <IconButton size="small">
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Box>

      <Box sx={{ textAlign: "center", mt: 4, mb: 2 }}>
        <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Change Student Password
        </Typography>
      </Box>

      <IconButton
        onClick={() => navigate("/admin/view-accounts")}
        sx={{
          backgroundColor: "#FFC629",
          color: "black",
          width: 35,
          height: 35,
          alignSelf: "flex-start",
          ml: "5%",
          "&:hover": { backgroundColor: "#e6b400" },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 3,
        }}
      >
        <Typography sx={{ fontSize: 14 }}>KSU Email</Typography>
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          InputProps={{
            startAdornment: <EmailIcon sx={{ mr: 1, color: "gray" }} />,
            sx: { backgroundColor: "white", borderRadius: 1 },
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={handleSendLink}
        >
          SEND RESET LINK
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
          onClick={() => navigate("/admin/view-accounts")}
        >
          CANCEL
        </Button>

        {status && (
          <Typography
            sx={{
              textAlign: "center",
              color: "#FFC629",
              fontWeight: "bold",
              mt: 2,
            }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
