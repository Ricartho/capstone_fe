import React,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";

import { format } from 'date-fns';


//MUI

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Divider,
} from "@mui/material";



export default function AdminDashboard({eventsList,onDelete,onRss,onReport}) {

    console.log(eventsList);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const isMobile = useMediaQuery("(max-width:600px)");

   
  const filteredEvents = search
    ? eventsList.filter((e) =>
        e.title.toLowerCase().includes(search.toLowerCase())
      )
    : eventsList;

  const handleNewEvent = () => {
    navigate("/admin/new-event");
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleDelete = (id) => {
    onDelete(id);
    window.location.reload();
  };

  const handleRss = () =>{
    onRss();
    window.location.reload();
  }

  const handleReport=()=>{
    onReport();
    // window.location.reload();
  }

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
    //
     //make sure the user is logged in
    const checkLogin = () => {
        if(!sessionStorage.getItem('userToken')){navigate("/");}
    };
    
     useEffect(()=>{
        //  checkLogin();
       },[]);
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
          padding: isMobile ? "8px 15px" : "12px 25px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >

        <IconButton onClick={() => handleHomepage("/admin")} size="small">
          <HomeIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>

        <Typography variant={isMobile ? "h6" : "h5"}sx={{ fontWeight: "bold", color: "white", letterSpacing: "1px" }}
        >
          ADMIN DASHBOARD
        </Typography>

       <Box>
        {/* <IconButton onClick={() => handleProgressPage("/my-progress")} size="small">
          <TuneIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton> */}
        <IconButton onClick={()=>handleLogout("/")} size="small">
          <LogoutIcon sx={{ color: "white", fontSize: isMobile ? 22 : 26 }} />
        </IconButton>
        </Box>
        
      </Box>

      {/* ===== Lock Icon ===== */}
      <Box sx={{ mt: 4 }}>
        <LockIcon sx={{ fontSize: 60, color: "#FFC629" }} />
      </Box>

      {/* ===== Search Bar ===== */}
      <Box sx={{ mt: 4, width: "90%", maxWidth: 700 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
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

      {/* ===== New Event Button ===== */}
      <Box
      sx={{
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        maxWidth:"300px",
        width:"100%",
        mt:2,
      }}
      >
        <Box>
          <Button
        onClick={handleNewEvent}
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#FFC629",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#e6b400" },
          borderRadius: "8px",
          px: 4,
        }}
      >
        NEW EVENT
      </Button>
        </Box>
        <Box>
           <Button
        onClick={handleRss}
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#FFC629",
          color: "#000",
          fontWeight: "bold",
          "&:hover": { backgroundColor: "#e6b400" },
          borderRadius: "8px",
          px: 4,
        }}
      >
        RSS
      </Button>
        </Box>
      
        
     
      </Box>
     

      {/* ===== Event List ===== */}
      <Box
        sx={{
          mt: 4,
          width: "90%",
          maxWidth: 900,
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #444",
          borderRadius: 2,
          p: 2,
          backgroundColor: "#111",
          height: "320px",
        }}
      >
       {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
           <Box
            key={event._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1a1a1a",
              borderRadius: 3,
              p: 2,
              mb: 2,
            }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography sx={{ color: "#FFC629", fontWeight: "bold" }}>
                {event.title.toUpperCase()}
              </Typography>
              <Typography sx={{ color: "#ccc", fontSize: "0.9rem" }}>
                {format(new Date(event.eventDate), 'MMM d, yyyy')} | {format(new Date(event.eventTimeStart), 'hh:mm a')} - {format(new Date(event.eventTimeEnd), 'hh:mm a')}
                {/* {event.date} {event.time && `| ${event.time}`} */}
              </Typography>
              <Typography sx={{ color: "#aaa", fontSize: "0.85rem" }}>
                {event.location}
              </Typography>
            </Box>

            <Box>
              <IconButton sx={{ color: "#FFC629" }} onClick={()=>handleEdit(event._id)}>
                <EditIcon />
              </IconButton>
              <IconButton sx={{ color: "#FFC629" }} onClick={()=>handleDelete(event._id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton sx={{ color: "#FFC629" }} onClick={()=>handleReport(event._id)}>
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>
        ))) : (
         <Typography sx={{ textAlign: "center", mt: 10 }}>
            No events found.
          </Typography>
       )}
      </Box>

      {/* ===== Bottom Buttons ===== */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
         onClick={()=>navigate("/admin/view-accounts")}
          sx={{
            backgroundColor: "#FFC629",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6b400" },
            borderRadius: "8px",
            px: 4,
          }}
        >
          MANAGE ACCOUNTS
        </Button>
        <Button
          variant="contained"
         onClick={()=>navigate("/admin/view-category")}
          sx={{
            backgroundColor: "#FFC629",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6b400" },
            borderRadius: "8px",
            px: 4,
          }}
        >
          MANAGE CATEGORIES
        </Button>
        <Button
        onClick={()=>navigate("/admin/view-milestones")}
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
          MANAGE MILESTONES
        </Button>

        
      </Box>

      {/* ===== Stats Section ===== */}
      <Divider sx={{ backgroundColor: "#333", width: "80%", mb: 2 }} />
      <Box
        sx={{
          width: "90%",
          maxWidth: 500,
          display: "flex",
          justifyContent: "space-around",
          mb: 4,
        }}
      >
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Events: {eventsList.length}
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Check-ins: 52(Static)
        </Typography>
      </Box>
    </>
  );
}
