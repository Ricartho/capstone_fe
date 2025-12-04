import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Fade,
} from "@mui/material";
import KSUBanner from "../assets/ksubanner2.jpg";

export default function UpdatePassword() {
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    alert("Password updated successfully. You can now sign in.");
    navigate("/");
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
      {/* Banner */}
      <Fade in={fadeIn} timeout={1000}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <Box
            component="img"
            src={KSUBanner}
            alt="KSU Banner"
            sx={{
              width: "100%",
              height: { xs: 200, sm: 250, md: 300 },
              objectFit: "cover",
              objectPosition: "center 55%",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textShadow: "0 3px 10px rgba(0,0,0,0.7)",
              textAlign: "center",
            }}
          >
            UPDATE PASSWORD
          </Typography>
        </Box>
      </Fade>

      {/* Card */}
      <Fade in={fadeIn} timeout={1600}>
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: { xs: 3, sm: 5 },
            mb: { xs: 4, sm: 6 },
          }}
        >
          <Card
            sx={{
              backgroundColor: "#111",
              color: "white",
              width: "92%",
              maxWidth: 460,
              borderRadius: "20px",
              boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                sx={{
                  color: "#FFC629",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Enter New Password
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: 3,
                    input: { color: "white" },
                    label: { color: "#bbb" },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#444",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "#777",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#FFC629",
                    },
                  }}
                  required
                />

                <TextField
                  fullWidth
                  label="Confirm New Password"
                  variant="standard"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{
                    mb: 3,
                    input: { color: "white" },
                    label: { color: "#bbb" },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#444",
                    },
                    "& .MuiInput-underline:hover:before": {
                      borderBottomColor: "#777",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#FFC629",
                    },
                  }}
                  required
                />

                {error && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#ff6b6b", mb: 2, textAlign: "center" }}
                  >
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC629",
                    color: "black",
                    fontWeight: "bold",
                    py: 1.2,
                    borderRadius: "10px",
                    "&:hover": { backgroundColor: "#e6b400" },
                  }}
                >
                  Save New Password
                </Button>
              </form>

              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: "center",
                  color: "#ccc",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                ← Back to Login
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Fade>
    </Box>
  );
}
