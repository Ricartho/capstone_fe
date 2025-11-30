import React,{useState,useEffect} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


//React components
import { registerUser,loginUser,getEvents,getEvent,addEvent,updateEvent,deleteEvent} from './services/api';
import Root from './root';
import ErrorPage from './errorPage';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewEvent from './pages/AdminNewEvent';
import AdminEditEvent from './pages/AdminEditEvent';




 function App() {
  
    const [events,setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{

      let isMounted = true;

      const loadEvents = async () => {
        try{
          const data = await getEvents();
          if (isMounted){ 
            console.log(data);
            setEvents(data);
          }
        }catch(err){
          if (isMounted){setError(err);}
          }finally{
            setLoading(false);
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
          element: <EventsPage eventsList={events} loading={loading}/>,
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
          element: <AdminDashboard eventsList={events} onDelete={deleteEvent}/>,
          errorElement: <ErrorPage />
        },
        {
          path:'/admin/new-event',
          element: <AdminNewEvent onAddEvent={addEvent} />,
          errorElement: <ErrorPage />

        },
        {
          path:'/admin/edit-event/:id',
          element: <AdminEditEvent onEdit={updateEvent}/>,
          loader: async({params})=>{

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
        }
       
      ],
      errorElement: <ErrorPage />,
    }
  ]);

  return(
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RouterProvider router={myRouter } />
      </LocalizationProvider>
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

