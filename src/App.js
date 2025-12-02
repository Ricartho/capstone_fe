import React,{useState,useEffect, use} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


//API methiods
import { registerUser,
  loginUser,
  getEvents,
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
  addUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
  newProgress,
  progressCount,
  progressList
} from './services/api';

//React components
import Root from './root';
import ErrorPage from './errorPage';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import EventsPage from "./pages/EventsPage";
import EventDetails from "./pages/EventDetails"; 
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewEvent from './pages/AdminNewEvent';
import AdminEditEvent from './pages/AdminEditEvent';
import Progress from './pages/Progress';
import AdminAddAccount from './pages/AdminAddAcount';
import AdminViewAccounts from './pages/AdminViewAccount';
import AdminEditAccount from './pages/AdminEditAccount';




 function App() {
   
    const [events,setEvents] = useState([]);
    const [eventsAttentedCount,setEventsAttentedCount] = useState("");
    const [attentedList,setAttentedList] = useState([]);
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(()=>{
      
      document.title = 'Student Engagement Web Portal';
      let isMounted = true;

      const loadEvents = async () => {
        try{
          const data = await getEvents();
          if (isMounted){ 
            setEvents(data);
          }
        }catch(err){
          if (isMounted){setError(err);}
          }finally{
            setLoading(false);
          }
      };
      
      const loadUsers = async() =>{
        try{
          if(isMounted){
            const data = await getUsers();
            setUsers(data)
          }
          
        }catch(err){
           if (isMounted){setError(err);}
        }
      };

      const loadCountAttented = async() => {
        const currentUserId = localStorage.getItem('userId');
        try{
          if(isMounted){
            const res = await progressCount(currentUserId);
            setEventsAttentedCount(res);
          }
        }catch(err){
           if (isMounted){setError(err);}
        }
      };

      const loadListAttented = async() => {
        const currentUserId = localStorage.getItem('userId');
        try{
          if(isMounted){
            const res = await progressList(currentUserId);
            setAttentedList(res);
          }
        }catch(err){
           if (isMounted){setError(err);}
        }
      };

      loadEvents();
      loadUsers();
      loadListAttented();
      loadCountAttented();

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
          element:<EventDetails onAttended={newProgress}/>,
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
        },
        {
          path: "my-progress",
          element: <Progress newLoading={loading} totalEvents={events.length} progressCount={eventsAttentedCount} attentedList={attentedList}/>,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/add-account",
          element: <AdminAddAccount onAddUser={addUser} />,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/view-accounts",
          element: <AdminViewAccounts usersList={users} onDelete={deleteUser} />,
          errorElement: <ErrorPage />
        },
        {
            path:"/admin/edit-account/:id",
            element:< AdminEditAccount onEdit={updateUser}/>,
            loader: async({params})=>{

            if(!params){
              throw new Response("", { status: 400 });
            }

            const resp = await getUser(params.id);

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
          path:"/logout",
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


 }
  export default App;

