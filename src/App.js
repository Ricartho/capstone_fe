// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React,{useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';


//React elements 45
import { registerUser,loginUser,getEvents,getEvent} from './services/api';
import ErrorPage from './errorPage';
import EventsPage from "./pages/eventsPage";
import AdminDashboard from "./pages/adminDashboard";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import EventDetails from "./pages/eventDetails"; 
import Root from './root';




 function App() {
  
    const [events,setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(()=>{

      let isMounted = true;

      const loadEvents = async () => {
        try{
          const data = await getEvents();
          if (isMounted){ setEvents(data);}
        }catch(err){
          if (isMounted){setError(err);}
          }
      };

      loadEvents();

      return () => {
      isMounted = false; 
    }

    },[]);


    const myRouter = createBrowserRouter([
     {
      path:'/',
      element: <Root />,
      children: [
        {
          index: true,
          element: <Login onSignIn={loginUser}/>,
          errorElement: <ErrorPage />,
        },
        {
          path:'/signup',
          element: <SignUp onSignUp={registerUser}/>,
          errorElement: <ErrorPage />,
        },
        {
          path:'/events',
          element: <EventsPage eventsList={events}/>,
          errorElement: <ErrorPage />
        },
        {
          path:'/eventdetails/:id',
          element:<EventDetails />,
          loader:async({params})=>{
            
            if(!params){
              throw new Response("", { status: 400 });
            }

            const resp = await getEvent(params.id);
            console.log(resp);
            if(resp.status === 400){
              throw new Response("", { status: 400 });
            }
            if(resp.status === 404){
              throw new Response("", { status: 404 });
            }
            if(resp.status === 500){
              throw new Response("", { status: 500 });
            }
            if(resp.status === 503){
              throw new Response("", { status: 503 });
            }

            return resp;
          },
          errorElement: <ErrorPage />
        },
        {
          path:'/admin',
          element: <AdminDashboard />,
          errorElement: <ErrorPage />
        }
       
      ],
      errorElement: <ErrorPage />,
    }
  ]);

  return(
    <RouterProvider router={myRouter } />
  );


  // return (
  //   <Router>
  //     {/* ===== TEMPORARY NAVIGATION BAR FOR DEMO ===== */}
  //     <Box
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         gap: 2,
  //         backgroundColor: "#FFC629",
  //         padding: "10px 0",
  //         position: "sticky",
  //         top: 0,
  //         zIndex: 1000,
  //       }}
  //     >
  //       <Button
  //         component={Link}
  //         to="/"
  //         variant="contained"
  //         sx={{
  //           backgroundColor: "black",
  //           color: "white",
  //           "&:hover": { backgroundColor: "#333" },
  //         }}
  //       >
  //         Login
  //       </Button>

  //       <Button
  //         component={Link}
  //         to="/signup"
  //         variant="contained"
  //         sx={{
  //           backgroundColor: "black",
  //           color: "white",
  //           "&:hover": { backgroundColor: "#333" },
  //         }}
  //       >
  //         Sign Up
  //       </Button>

  //       <Button
  //         component={Link}
  //         to="/events"
  //         variant="contained"
  //         sx={{
  //           backgroundColor: "black",
  //           color: "white",
  //           "&:hover": { backgroundColor: "#333" },
  //         }}
  //       >
  //         Events
  //       </Button>

  //       <Button
  //         component={Link}
  //         to="/admin"
  //         variant="contained"
  //         sx={{
  //           backgroundColor: "black",
  //           color: "white",
  //           "&:hover": { backgroundColor: "#333" },
  //         }}
  //       >
  //         Admin
  //       </Button>
  //     </Box>

  //     {/* ===== PAGE ROUTES ===== */}
  //     <Routes>
  //       <Route path="/" element={<Login />} />
  //       <Route path="/signup" element={<SignUp />} />
  //       <Route path="/events" element={<EventsPage />} />
  //       <Route path="/event-details" element={<EventDetails />} /> {/* 👈 NEW */}
  //       <Route path="/admin" element={<AdminDashboard />} />
  //     </Routes>
  //   </Router>
  // );

 }
  export default App;

