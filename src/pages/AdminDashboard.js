
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Fade,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";
import { BASE_URL } from "../config";
import KSUBanner from "../assets/ksubanner2.jpg";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [fadeIn, setFadeIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, milestonesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/events`),
          axios.get(`${BASE_URL}/api/admin/milestones`),
        ]);

        setEvents(eventsRes.data || []);
        setMilestones(milestonesRes.data || []);
      } catch (err) {
        console.error("Error loading admin dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNewEvent = () => navigate("/admin/new-event");
  const handleNewMilestone = () => navigate("/admin/new-milestone");
  const handleViewAccounts = () => navigate("/admin/view-accounts");

  const handleEditEvent = (id) => {
    navigate(`/admin/edit-event/${id}`);
  };

  const handleDownloadAttendance = (id) => {
    console.log("Download attendance for event:", id);
  };

  const handleDeleteEvent = (id) => {
    console.log("Delete event:", id);
  };

  const handleEditMilestone = (id) => {
    console.log("Edit milestone:", id);
  };

  const handleDeleteMilestone = (id) => {
    console.log("Delete milestone:", id);
  };

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Header banner */}
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
            ADMIN DASHBOARD
          </Typography>
        </Box>
      </Fade>

      {/* Main content */}
      <Fade in={fadeIn} timeout={1200}>
        <Box
          sx={{
            width: "100%",
            maxWidth: 1200,
            mt: 5,
            px: 3,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          {/* Events column */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#FFC629", fontWeight: 700 }}
              >
                Events
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  backgroundColor: "#FFC629",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 2.5,
                  "&:hover": { backgroundColor: "#e6b400" },
                }}
                onClick={handleNewEvent}
              >
                New Event
              </Button>
            </Box>

            {loading ? (
              <Typography sx={{ color: "#bbb" }}>Loading events…</Typography>
            ) : events.length === 0 ? (
              <Typography sx={{ color: "#777" }}>
                No events created yet.
              </Typography>
            ) : (
              events.map((event) => {
                const dateTime = [event.date, event.time]
                  .filter(Boolean)
                  .join(" | ");
                return (
                  <Card
                    key={event.id}
                    sx={{
                      backgroundColor: "#151515",
                      borderRadius: "18px",
                      mb: 2,
                      boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{ color: "#FFC629", fontWeight: "bold", mb: 0.5 }}
                        >
                          {event.title}
                        </Typography>
                        {dateTime && (
                          <Typography
                            sx={{ color: "#ddd", fontSize: "0.9rem" }}
                          >
                            {dateTime}
                          </Typography>
                        )}
                        {event.location && (
                          <Typography
                            sx={{ color: "#999", fontSize: "0.85rem" }}
                          >
                            {event.location}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          sx={{ color: "#FFC629" }}
                          onClick={() => handleEditEvent(event.id)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "#FFC629" }}
                          onClick={() => handleDownloadAttendance(event.id)}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ color: "#FFC629" }}
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Box>

          {/* Milestones column */}
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "#FFC629", fontWeight: 700 }}
              >
                Milestones
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{
                  backgroundColor: "#FFC629",
                  color: "black",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  px: 2.5,
                  "&:hover": { backgroundColor: "#e6b400" },
                }}
                onClick={handleNewMilestone}
              >
                New Milestone
              </Button>
            </Box>

            {loading ? (
              <Typography sx={{ color: "#bbb" }}>Loading milestones…</Typography>
            ) : milestones.length === 0 ? (
              <Typography sx={{ color: "#777" }}>
                No milestones created yet.
              </Typography>
            ) : (
              milestones.map((m) => (
                <Card
                  key={m.id}
                  sx={{
                    backgroundColor: "#151515",
                    borderRadius: "18px",
                    mb: 2,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ textAlign: "left" }}>
                      <Typography
                        sx={{
                          color: "#FFC629",
                          fontWeight: "bold",
                          mb: 0.5,
                        }}
                      >
                        {m.title}
                      </Typography>
                      {m.description && (
                        <Typography
                          sx={{ color: "#ddd", fontSize: "0.9rem" }}
                        >
                          {m.description}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        sx={{ color: "#FFC629" }}
                        onClick={() => handleEditMilestone(m.id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ color: "#FFC629" }}
                        onClick={() => handleDeleteMilestone(m.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Fade>

      {/* View Accounts button */}
      <Fade in={fadeIn} timeout={1400}>
        <Box sx={{ mt: 6, mb: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FFC629",
              color: "black",
              fontWeight: "bold",
              px: 4,
              borderRadius: "999px",
              "&:hover": { backgroundColor: "#e6b400" },
            }}
            onClick={handleViewAccounts}
          >
            View Accounts
          </Button>
        </Box>
      </Fade>
    </Box>
  );
}
