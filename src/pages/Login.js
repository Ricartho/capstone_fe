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
  Alert
} from "@mui/material";
import KSUBanner from "../assets/ksubanner2.jpg";
import axios from "axios";



export default function Login({onSignIn}) {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

 
  const handleSubmit = async(e) => {

    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("All fields are required.");
      return;
     }

    const response = await onSignIn(email,password);

    if(!response.access_token){
        setError("Email or/and password is incorrect");
        return;
    }else{
        setEmail("");
        setPassword("");
        if(response.user_admin){
          navigate("/admin")
        }else{
          navigate("/events");
        }
        
    }
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
            LOGIN
          </Typography>
        </Box>
      </Fade>

      {/* ===== Login Card ===== */}
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
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-3px)" },
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFC629",
                  fontWeight: 800,
                  letterSpacing: "0.05em",
                  mb: 3,
                  textAlign: "center",
                }}
              >
                Sign In
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  label="Password"
                  variant="standard"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{
                    mb: 4,
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
                  Log In
                </Button>
              </form>
               {error && (
                  <Alert severity="error" sx={{ mt: 3, backgroundColor: "#2a0000", color: "#ff8080" }}>
                      {error}
                  </Alert>
                )}

              <Typography
                variant="body2"
                sx={{ mt: 3, textAlign: "center", color: "#ccc" }}
              >
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  style={{
                    color: "#FFC629",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Sign up
                </span>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Fade>
      </>
    
  );
}

