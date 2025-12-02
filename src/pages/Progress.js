import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//MUI
import HomeIcon from "@mui/icons-material/Home";
import TuneIcon from '@mui/icons-material/Tune';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Button,
  Fade,
  Grid,
   useMediaQuery,
    IconButton,
} from "@mui/material";

import axios from "axios";
// import { BASE_URL } from "../config";
import KSUBanner from "../assets/ksubanner2.jpg";
import { set } from "date-fns";

export default function Progress({totalEvents,progressCount,attentedList}) {
  console.log(totalEvents);
  console.log(progressCount);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);

  //The menu bar actions
  const handleHomepage = (path) =>{
      navigate(path);
      window.location.reload(); 
    }
  const handleProgressPage = (path) =>{
      navigate(path);
      window.location.reload(); 
    }
   const handleLogout = (path) =>{
      sessionStorage.removeItem('userToken');
      sessionStorage.removeItem('userId');
      navigate(path);
      window.location.reload(); 
    }
    
    //make sure the user is logged in
    const checkLogin = () => {
      if(!sessionStorage.getItem('userToken')){navigate("/");}
    };

 
  const [milestones,setMileStones] =useState([{title:"Bronze Milestone",description:"Attend 3 events", achieved: progressCount>=3 ? (true):(false)},
      {title:"Silver Milestone",description:"Attend 5 events", achieved: progressCount>=5 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      {title:"Gold Milestone",description:"Attend 10 events", achieved:progressCount>=10 ? (true):(false)},
      
    
    ]);

  

  useEffect(() => {
    checkLogin();
    setLoading(false);
   
    const timer = setTimeout(() => setFadeIn(true), 150);
    return () => clearTimeout(timer);
  }, []);


  const progress =
    totalEvents> 0
      ? (progressCount / totalEvents) * 100
      : 0;

  return (
    <>
          {/* =====  Header Bar ===== */}
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
        <IconButton onClick={() => handleHomepage("/events")} size="small">
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
        <Box>
          <IconButton onClick={() => handleProgressPage("/my-progress")} size="small">
          <TuneIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
              </IconButton>
          <IconButton onClick={()=>handleLogout("/")} size="small">
          <LogoutIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
        </Box>
        
      </Box>


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
            STUDENT PROGRESS
          </Typography>
        </Box>
      </Fade>

      {/* Progress Section */}
      <Fade in={fadeIn} timeout={1400}>
        <Box sx={{ textAlign: "center", mt: 5, px: 3, width: "100%", maxWidth: 800 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Your Event Attendance
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 15,
              borderRadius: 10,
              backgroundColor: "#333",
              "& .MuiLinearProgress-bar": { backgroundColor: "#FFC629" },
            }}
          />
          <Typography sx={{ mt: 1, color: "#FFC629" }}>
            {loading
              ? "Loading..."
              : `${progressCount} of ${totalEvents} events attended`}
          </Typography>
        </Box>
      </Fade>

      {/* Milestones */}
      <Fade in={fadeIn} timeout={1800}>
        <Box sx={{ mt: 6, px: 3, width: "100%", maxWidth: 1000 }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFC629", mb: 3, textAlign: "center", fontWeight: 700 }}
          >
            Milestones
          </Typography>
          <Grid container spacing={2}>
            {milestones.map((m, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Card
                  sx={{
                    backgroundColor: m.achieved ? "#1e1e1e" : "#111",
                    border: `2px solid ${m.achieved ? m.color : "#444"}`,
                    color: m.achieved ? "white" : "#888",
                    textAlign: "center",
                    borderRadius: "14px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{
                        color: m.achieved ? m.color : "#888",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {m.title} Milestone
                    </Typography>
                    <Typography variant="body2">{m.description}</Typography>
                    <Typography sx={{ mt: 1 }}>
                      {m.achieved ? "✔️ Achieved!" : "In Progress..."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fade>

      {/* Attended Events */}
      <Fade in={fadeIn} timeout={2200}>
        <Box sx={{ mt: 6, px: 3, width: "100%", maxWidth: 800 }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFC629", mb: 2, textAlign: "center", fontWeight: 700 }}
          >
            Attended Events
          </Typography>

          {loading ? (
            <Typography sx={{ color: "#bbb", textAlign: "center" }}>
              Loading events...
            </Typography>
          ) : attentedList.length === 0 ? (
            <Typography sx={{ color: "#bbb", textAlign: "center" }}>
              No events attended yet.
            </Typography>
          ) : (
            attentedList.map((event, idx) => (
              <Box
                key={idx}
                sx={{
                  border: "1px solid #FFC629",
                  borderRadius: "10px",
                  p: 2,
                  mb: 2,
                  backgroundColor: "#111",
                  textAlign: "center",
                }}
              >
                <Typography sx={{ fontWeight: "bold", color: "#FFC629" }}>
                  {event.event_title.toUpperCase()}
                </Typography>
              </Box>
            ))
          )}
        </Box>
      </Fade>

      <Fade in={fadeIn} timeout={2400}>
        <Box sx={{ textAlign: "center", mt: 5, mb: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={() => navigate("/events")}
          >
            ← Back to Events
          </Button>
        </Box>
      </Fade>
    </>
  );
}