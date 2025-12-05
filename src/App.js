import React,{useState,useEffect, use, act} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


//API methiods
import { 
  registerUser,
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
  progressList,
  rssCall,
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getMilestone,
  getMilestones,
  updateMilestone,
  addMilestone,
  deleteMilestone,
  getAllReport,
  getReport,
  getResetPasswordLink,
  updatePassowrd
} from './services/api';

//React components
import Root from './root';
import ErrorPage from './errorPage';
import Login from "./pages/Login";
import KSUStudentPortal from './pages/StudentDashboard';
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
import AdminAddCategory from './pages/AdminAddCategory';
import AdminViewCategories from './pages/AdminViewCategories';
import AdminEditCategory from './pages/AdminEditCategory';
import AdminNewMilestone from './pages/AdminNewMilestone';
import AdminViewMilestones from './pages/AdminViewMilestone';
import AdminEditMilestone from './pages/AdminEditMilestone';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import AdminPasswordChange from './pages/AdminPasswordChange';




 function App() {
  
    //The states of the system
    const [events,setEvents] = useState([]);
    const [users,setUsers] = useState([]);
    const [milestones,setMilestones] = useState([]);
    const [categories,setCategories] = useState([]);

    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [eventsAttentedCount,setEventsAttentedCount] = useState("");
    const [attentedList,setAttentedList] = useState([]);


    //The data load of the system//
    //load all event from db via axios
    const loadMilestones = async() =>{
      try{
        const data = await getMilestones();
        setMilestones(data);
      }catch(err){
          setError(err);
        }
    };
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

      const loadCategories = async()=>{
        try{
          const data = await getCategories();
          setCategories(data);
        }catch(err){
          setError(err);
        }
      };


    //The actions of the system
      const handleUpdatePassword = async(token,password)=>{
        try{
          const action = await updatePassowrd(token,password);
          return action;
        }catch(err){
          setError(err);
        }
      };
    const handleResetPasswordLink = async(email)=>{
      try{
        const action = await getResetPasswordLink(email);
        return action;
      }catch(err){
          setError(err);
        }
    };
    //add a new event attented
    const handleNewAttended = async (userId,eventId,eventCategory,eventTitle)=>{
      try{
        const action = await newProgress(userId,eventId,eventCategory,eventTitle);
        console.log(action);
        const updatedProgress = [...attentedList,action];
        setAttentedList(updatedProgress);
      }catch(err){
          setError(err);
        }
    };

    const handleNewCategory = async(category) =>{
      try{
        const action = await addCategory(category);
        const updatedCategory = [...categories,action];
        setCategories(updatedCategory);
        return action;
      }catch(err){
          setError(err);
        }
    };

    //delete an event from list
    const handleDeleteEvent = async (eventId)=>{
      try{
        const action = await deleteEvent(eventId);
        const updatedEvents = events.filter((event) =>{
          return event._id !== eventId;
        });
        setEvents(updatedEvents);
      }catch(err){
          setError(err);
        }
    };

    const handleDeleteUser = async(userId) =>{
      try{
        const action = await deleteUser(userId);
        const updatedUsers = users.filter((user)=>{
          return user._id !== userId;
        });
        setUsers(updatedUsers);
      }catch(err){
          setError(err);
        }
    };
    const handleDeleteMilestone = async(milestoneId) =>{
      try{
        const action = await deleteMilestone(milestoneId);
        const updatedMilestones = milestones.filter((mil)=>{
          return mil._id !== milestoneId;
        });
       setMilestones(updatedMilestones);
      }catch(err){
          setError(err);
        }
    };
    const handleDeleteCategory = async(categoryId) =>{
      try{
        const action = await deleteCategory(categoryId);
        const updatedCategories = categories.filter((category)=>{
          return category._id !== categoryId;
        });
        setCategories(updatedCategories)
      }catch(err){
          setError(err);
        }
    };

    const handleAddEvent = async(event)=>{
      try{
        const action = await addEvent(event);
        const updatedEvents = [...events,action];
        setEvents(updatedEvents);
      }catch(err){
          setError(err);
        }
    };
    const handleRss = async()=>{
      try{
        const action = await rssCall();
        const updatedEvents = [...events,action];
        setEvents(updatedEvents);
      }catch(err){
          setError(err);
        }
    };
    const handleAddUser = async(user) => {
      try{
        const action = await addUser(user);
        const updatedUsers = [...users,action];
        setUsers(updatedUsers);
        return action;
      }catch(err){
          setError(err);
        }
    };
    const handleAddMilestone = async(milestone) => {
      try{
        const action = await addMilestone(milestone);
        const updatedMilestones = [...milestones,action];
        setMilestones(updatedMilestones);
      }catch(err){
          setError(err);
        }
    };
   
    const handleEditEvent = async(id,eventToedit)=>{
      try{
        const action = await updateEvent(id,eventToedit);
        const updatedEvent = events.map((event)=>{
          if(event._id === id){
            return{...event,action};
          }
          return event;
        });
        setEvents(updatedEvent);
      }catch(err){
          setError(err);
        }
    };
    const handleEditMilestone = async(id,milToedit)=>{
      try{
        const action = await updateMilestone(id,milToedit);
        const updatedMilestone = milestones.map((mil)=>{
          if(mil._id === id){
            return{...mil,action};
          }
          return mil;
        });
        setMilestones(updatedMilestone)
      }catch(err){
          setError(err);
        }
    };

    const handleEditUser = async(id,userToEdit)=>{
      try{
        const action = await updateUser(id,userToEdit);
        const updatedUser = users.map((user)=>{
          if(user._id === id){
            return {...user,action};
          }
        });
        setUsers(updatedUser);
        }catch(err){
          setError(err);
        }
    };

    const handleEditCategory = async(id,CategoryToEdit)=>{
      try{
        const action = await updateCategory(id,CategoryToEdit);
        const updatedCategory = categories.map((cat)=>{
          if(cat._id === id){
            return {...cat,action};
          }
        });
        setUsers(updatedCategory);
        }catch(err){
          setError(err);
        }
    };
    
   const handleReport = async(id)=>{
    if(id != null){
      getReport(id);
    }else{
      getAllReport();
    }
   };
    console.log(loading);
    useEffect(()=>{
      
        // document.title = 'Student Engagement Web Portal';
        document.title = process.env.REACT_APP_APP_NAME;
        let isMounted = true;

        loadEvents();
        loadUsers();
        loadProgress();
        loadCategories();
        loadMilestones();
        setLoading(false)
        
        console.log("data fetching completed!")
      
        return () => {
        isMounted = false; 
    }

    },[]);

    console.log(events);
    console.log(users);
    console.log(attentedList);
    console.log(categories);
    console.log(milestones);
 
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
          path:'home',
          element:<KSUStudentPortal/>,
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
          element: <AdminDashboard eventsList={events} onDelete={handleDeleteEvent} onRss={handleRss} onReport={handleReport}/>,
          errorElement: <ErrorPage />
        },
        {
          path:'/admin/new-event',
          element: <AdminNewEvent categories={categories} onAddEvent={handleAddEvent} />,
          errorElement: <ErrorPage />

        },
        {
          path:'/admin/edit-event/:id',
          element: <AdminEditEvent categories={categories} onEdit={handleEditEvent}/>,
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
          element: <Progress totalEvents={events.length} progressCount={attentedList.length} attentedList={attentedList} milestones={milestones}/>,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/add-account",
          element: <AdminAddAccount onAddUser={handleAddUser} />,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/view-accounts",
          element: <AdminViewAccounts usersList={users} onDelete={handleDeleteUser} />,
          errorElement: <ErrorPage />
        },
        {
            path:"/admin/edit-account/:id",
            element:< AdminEditAccount onEdit={handleEditUser}/>,
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
        },
        {
          path:"/admin/new-category",
          element: <AdminAddCategory onAddCategory={handleNewCategory}/>,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/view-category",
          element: <AdminViewCategories categoriesList={categories} onDelete={handleDeleteCategory}/>,
          errorElement: <ErrorPage />
        },
         {
            path:"/admin/edit-category/:id",
            element: <AdminEditCategory onEdit={handleEditCategory}/>,
            loader: async({params})=>{

            if(!params){
              throw new Response("", { status: 400 });
            }

            const resp = await getCategory(params.id);

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
          path:"/admin/view-milestones",
          element: <AdminViewMilestones milestonesList={milestones} onDelete={handleDeleteMilestone}/>,
          errorElement: <ErrorPage />
        },
        {
          path:"/admin/new-milestone",
          element: <AdminNewMilestone categories={categories}  onAddMilestone={handleAddMilestone}/>,
          errorElement: <ErrorPage />
        },
         {
          path:'/admin/edit-milestone/:id',
          element: <AdminEditMilestone categories={categories} onEdit={handleEditMilestone} />,
          loader: async({params})=>{

            if(!params){
              throw new Response("", { status: 400 });
            }

            const resp = await getMilestone(params.id);

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
          path:"/forgot-password",
          element: <ForgotPassword onResetPass={handleResetPasswordLink}/>,
          errorElement: <ErrorPage />
        },
         {
          path:"/update-password/:token",
          element: <UpdatePassword onUpdatePass={handleUpdatePassword}/>,
          errorElement: <ErrorPage />
        },

       
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

