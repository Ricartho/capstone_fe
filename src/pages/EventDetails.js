import React from "react";
import { useLoaderData} from "react-router-dom";
import { format } from 'date-fns';

//MUI
import {
  Box,
  Typography,
  Button,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import KSUBanner from "../assets/ksubanner2.jpg";


export default function EventDetails() {

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");


  //The event from the API, served by the loader on App.js
  const eventToDisplay = useLoaderData();

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
          padding: isMobile ? "4px 12px" : "6px 20px",
          height: isMobile ? "44px" : "52px",
          boxShadow: "0 3px 5px rgba(0,0,0,0.25)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={() => navigate("/events")} size="small">
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>

        <IconButton onClick={() => navigate("/signup")} size="small">
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
      </Box>

      {/* ===== Banner ===== */}
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
          EVENT DETAILS
        </Typography>
      </Box>

      {/* ===== Event Information ===== */}
      <Box
        sx={{
          width: "90%",
          maxWidth: 800,
          mt: 4,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#FFC629",
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {eventToDisplay.title.toUpperCase()}
        </Typography>

        <Divider
          sx={{
            backgroundColor: "#FFC629",
            width: "50%",
            mx: "auto",
            mb: 2,
          }}
        />

        <Typography sx={{ mb: 0.5 }}>
          <strong>Date:</strong> {format(new Date(eventToDisplay.eventDate),'MMM d, yyyy')}
        </Typography>
        <Typography sx={{ mb: 0.5 }}>
          <strong>Time:</strong> {format(new Date(eventToDisplay.eventTimeStart), 'hh:mm a')} - {format(new Date(eventToDisplay.eventTimeEnd), 'hh:mm a')}
        </Typography>
        <Typography sx={{ mb: 3 }}>
          <strong>Location:</strong> {eventToDisplay.location}
        </Typography>

        <Typography
          sx={{
            mb: 4,
            px: 2,
            lineHeight: 1.5,
            color: "#ddd",
          }}
        >
          {eventToDisplay.description}
        </Typography>

        {/* ===== Buttons ===== */}
        <Box sx={{ width: "100%", maxWidth: 350, mx: "auto" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={() => alert("Attendance marked (demo only)!")}
          >
            Mark Attended
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              borderRadius: "20px",
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={() => alert("RSVP confirmed (demo only)!")}
          >
            RSVP
          </Button>

          <Button
            variant="text"
            sx={{
              mt: 2,
              color: "#FFC629",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/events")}
          >
            ← Back to Events
          </Button>
        </Box>
      </Box>
  </>
  );
}
