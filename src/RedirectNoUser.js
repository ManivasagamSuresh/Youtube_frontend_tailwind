import axios from 'axios';
import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Config } from './Config';
import { useSelector } from 'react-redux';
import Home from './Components/Home/Home';

const RedirectIfNoUserData = ({ children }) => {
 
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)
  useEffect(() => {
    const verify = async()=>{

        
        
        if(currentUser){
            const user = localStorage.getItem("accessToken");
            const verifyUser = await axios.get(`${Config.api}/verifylogin`,{headers :{
                "authorization":localStorage.getItem("accessToken")
            }})
            console.log(verifyUser)
            if(verifyUser.data = "Verified"){
                console.log("redirecting")
            }else{
                navigate('/login');
            }

        }
        else{
            navigate('/login');
        }
        
    } 

    verify();
  }, [currentUser]);

  return <>{children}</>;
};

export default RedirectIfNoUserData;
