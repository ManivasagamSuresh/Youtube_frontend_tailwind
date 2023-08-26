import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Config } from '../../Config';
import load from "../../loading.gif"

function Signup() {
    const navigate = useNavigate();
    const [loading , setLoading] = useState(false)

    const formik = useFormik({
      initialValues :{
        name:"",
        email : "",
        password : "",
      },
      validate:(values)=>{
        let error = {};
        if(!values.name){
          error.name = "Please enter your name"
        }
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
          setLoading(true);
            let user = await axios.post(`${Config.api}/signup`,values)
          console.log("registered")
          setLoading(false);
          navigate('/login')
        
          
          
        } catch (error) {
          console.log(error)
        }
          
      }
    })
    
    


  return (
    <div className='Signup-Container h-screen bg-zinc-900 flex items-center justify-center'>
      <form onSubmit={formik.handleSubmit}>
        <div className='Signup-Wrapper text-gray-400 flex items-center flex-col bg-zinc-800 px-14 py-5 gap-3'>
        <h1 className='Signup-Title text-2xl'>Welcome..!</h1>
        <div className='Signup-SubTitle text-sm font-light mb-8'>Signup with Email</div>
        <input className='Signup-Input text-gray-400 rounded-sm bg-transparent h-8 outline-none border border-zinc-600 px-2' placeholder="User Name" name='name'  
                                                             onChange={formik.handleChange} 
                                                             onBlur={formik.handleBlur} 
                                                             value={formik.values.name}/>
                {formik.touched.name && formik.errors.name 
               ? <span style={{color:"#aaaaaa",fontSize:"12px",marginBottom:"15px"}}>{formik.errors.name}</span>
               : null
               }
        <input className='Signup-Input text-gray-400 rounded-sm bg-transparent h-8 outline-none border border-zinc-600 px-2' placeholder="E-mail"  name='email'  
                                                            onChange={formik.handleChange} 
                                                            onBlur={formik.handleBlur} 
                                                            value={formik.values.email}/>
               {formik.touched.email && formik.errors.email 
               ? <span style={{color:"#aaaaaa",fontSize:"12px",marginBottom:"15px"}}>{formik.errors.email}</span>
               : null
               }                                               
        <input className='Signup-Input text-gray-400 rounded-sm bg-transparent h-8 outline-none border border-zinc-600 px-2' type={"password"} placeholder="Password"name='password'  
                                                             onChange={formik.handleChange} 
                                                             onBlur={formik.handleBlur} 
                                                             value={formik.values.password}/>
                {formik.touched.password && formik.errors.password 
               ? <span style={{color:"#aaaaaa",fontSize:"12px",marginBottom:"15px"}}>{formik.errors.password}</span>
               : null
               }
        {
          !loading ?<button type='submit' className='Signup-Button bg-red-600 font-medium text-white border-none rounded-md px-5 py-1  cursor-pointer'>Register</button>
          :<button type={"submit"} className='Login-Button bg-red-600 font-medium text-white border-none rounded-md px-5 py-1  cursor-pointer flex gap-2 items-center'><span>Signing up</span> <img src={load} alt="" className={`h-4 w-4`}/></button>
        }
        
        <div>Already have an account ?</div><span className='Signup-Login text-red-600 cursor-pointer' onClick={()=>{navigate('/login')}}>Login..</span>
        </div>
        </form>
        </div>
  )
}

export default Signup