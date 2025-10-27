import React,{useState,useEffect} from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';

//react pages
import Root from './root';
import Login from './users/pages/login';
import Signup from './users/pages/signup';
import EventPage from './events/pages/eventPage';
//custom CSS file
import './App.css';
import { Password } from '@mui/icons-material';
import axios from 'axios';


function App() {

  //save events from DB into a state arrays
  const [events, setEvents] = useState([]);

  let api = 'http://localhost:3000/api/';

  //fetch all events from DB and save into events array
  const fetchEvents = async() => {
    await axios.get('http://localhost:3000/api/events')
    .then(function(response){
      console.log(response.data);
      setEvents(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
  };

  //allow users to LogIn the System
 const logInAction = async(email,password) =>{
    await axios.post('http://localhost:3000/api/users/login',{
      email,
      password
    })
    .then(function(response){
        console.log(response.data);
      })
    .catch(function (error) {
        console.log(error);
      });
  
 };

 //Allow users to register on the system
 const signUpAction = async(studentNB,email,password) => {
  await axios.post('http://localhost:3000/api/users/signup',{
    studentNB,
    email,
    password
  })
  .then(function(response){
        console.log(response.data);
      })
  .catch(function (error) {
        console.log(error);
      });

 };

 useEffect(()=>{
  fetchEvents();
 },[]);
 
  const myRouter = createBrowserRouter([
    {
      path:'/',
      element: <Root />,
      children:[
        {
          index: true,
          element: <EventPage events={events} />
        }
        // {
        //   index:true,
        //   element: <Login onLogIn={logInAction}/>,
        // },
        // {
        //   index:true,
        //   // path:'/register',
        //   element: <Signup onSignUp={signUpAction}/>,
        // },
      ],
    }
  ]);

  return(<RouterProvider router={myRouter} />);

}

export default App;
