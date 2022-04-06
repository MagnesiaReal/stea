import {useEffect, useState} from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NewRegister from '../../views/NewRegister/NewRegister'

import { BrowserRouter as Router, Route, Link, Routes, Navigate, useRoutes } from "react-router-dom";

import AXIOS from '../http-axios'

//This component works for make sure user is on Session, if not this components denied the access and return the user to home and perform some operations.



export default function Session(props) {
  const [loading, setLoading] = useState(true);
  const [newRegister, setNewRegister] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(()=>{
  
    AXIOS.put('/checksession', {UUID: props.cookie.get('UUID')})
      .then((res)=>{

        console.log("SESSION>> ", res.data.message);
        const avatarId = props.cookie.get('avatarId');

        if(avatarId === 'null' || avatarId === null) {

          console.log("SESSION>> finishing the new user register");
          setNewRegister(true);
        
        }

      }).catch((err)=> {
        
        if(err.response.status === 401){

          console.log("SESSION>> Session expired or doesn't exist, redirecting to home");
          props.cookie.remove('userId', {path: '/'});
          props.cookie.remove('UUID', {path: '/'});
          props.cookie.remove('name', {path: '/'});
          props.cookie.remove('lastName', {path: '/'});
          props.cookie.remove('email', {path: '/'});
          props.cookie.remove('born', {path: '/'});
          props.cookie.remove('admin', {path: '/'});
          props.cookie.remove('photo', {path: '/'});
          props.cookie.remove('configuration', {path: '/'});
          props.cookie.remove('avatarId', {path: '/'});

          navigation('/home');

        } else {
          
          console.log("SESSION>> Wow unknown error,be carefull");

        }
      });

  }, [location]);

  // If new user is registered then go to NewRegister
  if(newRegister) {
    return(
      <NewRegister {...props} navigation={navigation} setNewRegister={setNewRegister}/>
    );
  }

  // Else go to main system
  return(<>
      <Outlet/>
    </>);

}
