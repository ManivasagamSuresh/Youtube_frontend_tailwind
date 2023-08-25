import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import "./Login.css"
import { Config } from '../../Config'
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../Redux/userSlice';
import { UserContext } from '../Context/userContext';

function Login() {
    const navigate = useNavigate();
  const dispatch = useDispatch();

const formik = useFormik({
  initialValues :{
    email : "",
    password : "",
  },
  validate:(values)=>{
    let error = {};
    if(!values.email){
      error.email = "Please enter Your Email"
    }
    if((values.email)&&(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email))){
      error.email =  "Please enter valid Email"
    }
    if(!values.password){
      error.password = "Please enter your Password"
    }
    return error;
  },
  onSubmit : async(values)=>{
    try {
      
      dispatch(loginStart());
      let user = await axios.post(`${Config.api}/signin`,values)
      localStorage.setItem("accessToken",user.data.token)
      dispatch(loginSuccess(user.data));
      
      navigate('/')
      console.log("signed in");      
    } catch (error) {
      console.log(error)
      dispatch(loginFailure());
    }
    
  }
})



  return (
    <div className='Login-Container h-screen bg-zinc-900 flex items-center justify-center '>
      <form onSubmit={formik.handleSubmit}>
        <div className='Login-Wrapper text-gray-400 flex items-center flex-col bg-zinc-800 px-14 py-5 gap-3'>
        <h1 className='Login-Title text-2xl'>Login with Email</h1>
        <div className='Login-SubTitle text-sm font-light mb-8'>to continue to MBTube</div>
        <input className='Login-Input text-gray-400 rounded-sm bg-transparent h-8 outline-none border border-zinc-600 px-2' placeholder="E-mail" name='email'  
                                                            onChange={formik.handleChange} 
                                                            onBlur={formik.handleBlur} 
                                                            value={formik.values.email} />
               {formik.touched.email && formik.errors.email 
               ? <span style={{color:"#aaaaaa",fontSize:"12px",marginBottom:"15px"}}>{formik.errors.email}</span>
               : null
               }                                             
        <input className='Login-Input text-gray-400 rounded-sm bg-transparent h-8 outline-none border border-zinc-600 px-2' type={"password"} placeholder="Password"
                                                             name='password'  
                                                             onChange={formik.handleChange} 
                                                             onBlur={formik.handleBlur} 
                                                             value={formik.values.password}/>
                {formik.touched.password && formik.errors.password 
               ? <span style={{color:"#aaaaaa",fontSize:"12px",marginBottom:"15px"}}>{formik.errors.password}</span>
               : null
               }
        <button type={"submit"} className='Login-Button bg-red-600 font-medium text-white border-none rounded-sm px-5 py-1  cursor-pointer'>Login</button>
        <div>Don't have an account ?</div><span className='Login-Signup text-red-600 cursor-pointer' onClick={()=>{navigate('/Signup')}}>Sign up..</span>
        </div>
        </form>
        </div>
  )
}

export default Login