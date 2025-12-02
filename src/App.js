import React,{useState,useEffect, use, act} from 'react';
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
  
    //The states of the system
    const [events,setEvents] = useState([]);
    const [users,setUsers] = useState([]);
    const [milestones,setMilestones] = useState([]);

    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [eventsAttentedCount,setEventsAttentedCount] = useState("");
    const [attentedList,setAttentedList] = useState([]);


    //The data load of the system//
    //load all event from db via axios
    const loadEvents = async () => {
        try{
          const data = await getEvents();
          setEvents(data);
          
        }catch(err){
          setError(err);
        }
      };
      

      //load all user from db via axios
    const loadUsers = async() =>{
        try{
          const data = await getUsers();
          setUsers(data)
          
          
        }catch(err){
          setError(err);
        }
      };

      //load student progress from db to update the local state
      const loadProgress = async()=>{
        const user = sessionStorage.getItem('userId');
        try{
          const data = await progressList(user);
          setAttentedList(data);
        }catch(err){
          setError(err);
        }
      };

    //The actions of the system
    //add a new event attented
    const handleNewAttended = async (userId,eventId,eventTitle)=>{
      try{
        const action = await newProgress(userId,eventId,eventTitle);
        console.log(action);
        const updatedProgress = [...attentedList,action];
        setAttentedList(updatedProgress);
      }catch(err){
          setError(err);
        }
    };
   
   
    console.log(loading);
    useEffect(()=>{
      
        document.title = 'Student Engagement Web Portal';
        let isMounted = true;

        loadEvents();
        loadUsers();
        loadProgress();
        setLoading(false)
        
        console.log("data fetching completed!")
      
        return () => {
        isMounted = false; 
    }

    },[]);

    console.log(events);
    console.log(users);
    console.log(attentedList);
 
    console.log(loading);


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
          element:<EventDetails onAttended={handleNewAttended} attentedList={attentedList} />,
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
          element: <Progress totalEvents={events.length} progressCount={attentedList.length} attentedList={attentedList}/>,
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

