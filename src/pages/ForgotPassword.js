
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
import axios from "axios";
// import { BASE_URL } from "../config";

export default function ForgotPassword({onResetPass}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");


//REGEX to ensure email format
   const myRegex = /[A-Za-z0-9]+@[A-Za-z]+\.kennesaw\.edu/;

  
  const handleReset = async (e) => {
      e.preventDefault();
console.log(email);
    if (!email) {
      setStatus("❗ Please enter your KSU email.");
      return;
    }


    if(!myRegex.test(email)){
     setStatus("Only KSU emails are accepted,make sure the format is kennesaw.edu");
      return;
     }
    const action = onResetPass(email);

    setStatus("Please verify your email, you can close this page");
     
  }

 

  return (
    <>
      {/* <Box>
        <IconButton onClick={() => navigate("/")} size="small">
          <HomeIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "black", letterSpacing: "0.05em" }}
        >
          FORGOT PASSWORD
        </Typography>
        <IconButton onClick={() => navigate("/signup")} size="small">
          <AccountCircleIcon sx={{ color: "white" }} />
        </IconButton>
      </Box> */}

      <Box
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          maxWidth: 400,
        }}
      >
        <form>
        <Typography sx={{ textAlign: "center", mb: 3, color: "#ccc" }}>
          Enter KSU email to reset your password.
        </Typography>

        <TextField
          fullWidth
         
          variant="outlined"
          placeholder="example@student.kennesaw.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            sx: {
              backgroundColor: "white",
              borderRadius: "20px",
              color: "black",
              px: 2,
            },
          }}
        />

        <Button
          variant="contained"
          sx={{
            mt: 3,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            px: 4,
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={handleReset}
        >
          SEND RESET LINK
        </Button>

        {status && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: status.includes("✔️") ? "#FFC629" : "red",
              fontWeight: "bold",
            }}
          >
            {status}
          </Typography>
        )}
        </form>
      </Box>
    </>
  );
}
