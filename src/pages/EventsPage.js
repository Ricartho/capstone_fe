import React,{useState,useEffect} from "react";
import { format } from 'date-fns';
import { getEvents } from "../services/api";
import {
  Alert,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import KSUBanner from "../assets/ksubanner2.jpg";

export default function EventsPage({eventsList}) {

   //save events from DB into a state arrays
  const [eventsD, setEventsD] = useState([]);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  console.log(eventsList);

  const events = [
    {
      id: 1,
      title: "Welcome Fair",
      eventDate: "Sept 10, 2025",
      eventTime: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 2,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 3,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 4,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 5,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 6,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
     {
      id: 7,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
    {
      id: 8,
      title: "Welcome Fair",
      date: "Sept 10, 2025",
      time: "11:00 AM – 2:00 PM",
      location: "Student Center",
    },
  ];
  // useEffect(()=>{
  //   const ar = getEvents();
  // console.log(ar);


  // },[]);
    const handleShow = (id) =>{
      console.log(id); 
      navigate(`/eventdetails/${id}`);
    };

    // if(eventsList.length ===0){
    //   return(<>
    //       <Alert variant="outlined" severity="error">
    //           Ooops! Seems like there's no data to display
    //       </Alert>
    //   </>);
    // }


    // const apiDate = "2025-11-27T18:30:00.000Z";
    // const date = new Date(apiDate);

    // const formattedDate = format(new Date("2025-11-27T18:30:00.000Z"), 'MMM d, yyyy');
    // console.log(formattedDate);
  return (
    <>
      {/* =====  Header Bar ===== */}
      {/* <Box
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
        <IconButton onClick={() => navigate("/")} size="small">
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>

        <IconButton onClick={() => navigate("/signup")} size="small">
          <AccountCircleIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
      </Box> */}

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
          EVENTS
        </Typography>
      </Box>

      

      {/* ===== Event Cards ===== */}
      <Box
        sx={{
          width: "100%",
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {eventsList.map((event) => (
          <Card
            key={event._id}
            sx={{
              width: "90%",
              maxWidth: 800,
              backgroundColor: "#111",
              color: "white",
              mb: 3,
              borderRadius: "16px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
              },
            }}
            //onClick={() => navigate("/event-details")}
            onClick = {() => handleShow(event._id)}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <Typography
                variant="h6"
                sx={{ color: "#FFC629", fontWeight: "bold", mb: 1 }}
              >
                {event.title.toUpperCase()}
              </Typography>
              <Typography sx={{ color: "#ddd" }}>
                {format(new Date(event.eventDate), 'MMM d, yyyy')} | {event.eventTimeStart} - {event.eventTimeEnd}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "#aaa" }}>
                {event.location}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
  </>
  );
}
