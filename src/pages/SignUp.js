import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, TextField, Button, Alert, Fade } from "@mui/material";
import KSUBanner from "../assets/ksubanner2.jpg";



export default function SignUp({onSignUp}) {

  const navigate = useNavigate();
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    
    onSignUp(fName,lName,email,password);
    setSubmitted(true);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    // navigate("/events");
    
  };

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ===== Banner ===== */}
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
              objectPosition: "center 58%",
              display: "block",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.45))",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: 800,
              letterSpacing: "0.05em",
              textAlign: "center",
              textShadow: "0 3px 10px rgba(0,0,0,0.7)",
            }}
          >
            CREATE ACCOUNT
          </Typography>
        </Box>
      </Fade>

      {/* ===== Signup Box ===== */}
      <Fade in={fadeIn} timeout={1600}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: "#111",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            width: "90%",
            maxWidth: 420,
            p: 4,
            textAlign: "center",
            mt: { xs: 3, sm: 5 },
            mb: { xs: 4, sm: 6 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#FFC629",
              fontWeight: "bold",
              mb: 2,
              letterSpacing: "0.05em",
            }}
          >
            Sign Up with KSU Email
          </Typography>

          <TextField
            fullWidth
            type="string"
            label="First name"
            variant="standard"
            value={fName}
            onChange={(e) => setfName(e.target.value)}
            required
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "#bbb" },
              "& .MuiInput-underline:before": { borderBottomColor: "#444" },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#777",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FFC629" },
            }}
          />
          <TextField
            fullWidth
            type="string"
            label="Last name"
            variant="standard"
            value={lName}
            onChange={(e) => setlName(e.target.value)}
            required
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "#bbb" },
              "& .MuiInput-underline:before": { borderBottomColor: "#444" },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#777",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FFC629" },
            }}
          />
          <TextField
            fullWidth
            type="email"
            label="KSU Email Address"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "#bbb" },
              "& .MuiInput-underline:before": { borderBottomColor: "#444" },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#777",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FFC629" },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              mb: 3,
              input: { color: "white" },
              label: { color: "#bbb" },
              "& .MuiInput-underline:before": { borderBottomColor: "#444" },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#777",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FFC629" },
            }}
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm Password"
            variant="standard"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{
              mb: 4,
              input: { color: "white" },
              label: { color: "#bbb" },
              "& .MuiInput-underline:before": { borderBottomColor: "#444" },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "#777",
              },
              "& .MuiInput-underline:after": { borderBottomColor: "#FFC629" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#e6b400" },
            }}
          >
            Create Account
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 3, backgroundColor: "#2a0000", color: "#ff8080" }}>
              {error}
            </Alert>
          )}

          {submitted && (
            <Alert
              severity="success"
              sx={{
                mt: 3,
                backgroundColor: "#1e1e1e",
                color: "#FFC629",
                fontWeight: "bold",
              }}
            >
              Account created successfully! Please return to log in.
            </Alert>
          )}

          <Typography variant="body2" sx={{ mt: 3 }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#FFC629",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Log In
            </span>
          </Typography>
        </Box>
      </Fade>
    </>
  );
}
