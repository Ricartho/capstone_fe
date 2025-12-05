import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Fade,
    useMediaQuery,
  Divider
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from '@mui/icons-material/Logout';



export default function AdminViewMilestones({milestonesList,onDelete}) {
    console.log(milestonesList);
   const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [fadeIn] = useState(true);

 
  const filteredMilestones = milestonesList.filter((u) =>
    u.title.toLowerCase().includes(search.toLowerCase())
  );
 
  const handleEdit = (id) => {
    navigate(`/admin/edit-milestone/${id}`);
  };
  const handleDelete = (id) => {
    onDelete(id);
    window.location.reload();
  };

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
      {/* ===== Header ===== */}
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

      {/* ===== Title ===== */}
      <Fade in={fadeIn} timeout={800}>
        <Box sx={{ textAlign: "center", mt: 4, mb: 3 }}>
          <LockIcon sx={{ fontSize: 40, color: "#FFC629", mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            View Milestones
          </Typography>
        </Box>
      </Fade>

      {/* ===== Search & Add Button ===== */}
      <Box sx={{ width: "90%", maxWidth: 600, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          InputProps={{
            sx: {
              backgroundColor: "#e5e5e5",
              borderRadius: "20px",
              px: 2,
              height: 45,
              color: "black",
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#FFC629",
            color: "black",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": { backgroundColor: "#e6b400" },
          }}
          onClick={() => navigate("/admin/new-milestone")}
        >
          ADD Milestone
        </Button>
      </Box>

      {/* ===== Category Cards ===== */}
      <Paper
        sx={{
          width: "90%",
          maxWidth: 800,
          backgroundColor: "#333",
          borderRadius: "10px",
          maxHeight: 600,
          overflowY: "auto",
          p: 2,
          mb: 5,
        }}
      >
        {filteredMilestones.map((milestone) => (
          <Box
            key={milestone._id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#555",
              borderRadius: "30px",
              p: "6px 12px",
              mb: 1.5,
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#777",
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                flexGrow: 1,
                textAlign: "center",
              }}
            >
              {milestone.title.toUpperCase()} 
            </Typography>

            <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => handleEdit(milestone._id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>

              

              <IconButton
                size="small"
                sx={{ color: "#FFC629" }}
                onClick={() => handleDelete(milestone._id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Paper>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#FFC629",
          color: "black",
          fontWeight: "bold",
          px: 3,
          mb: 4,
          "&:hover": { backgroundColor: "#e6b400" },
        }}
        onClick={() => navigate("/admin")}
      >
        ← Back to Dashboard
      </Button>
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
          Total Users: {milestonesList.length}
        </Typography>
        <Typography variant="body1" sx={{ color: "#FFC629" }}>
          Total Check-ins: 52(Static)
        </Typography>
      </Box>
    </>
  );
}