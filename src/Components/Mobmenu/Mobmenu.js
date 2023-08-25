import React, { useState } from 'react'
import { AiOutlineHome } from 'react-icons/ai';
import { MdExplore } from 'react-icons/md';
import { MdSubscriptions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiVideoPlus } from "react-icons/bi";
import Uploadvdo from '../UploadVdo/Uploadvdo';




function Mobmenu() {
    const navigate = useNavigate()
    const [Open,setOpen]=useState(false)
   
    const {currentUser} = useSelector(state => state.user)
    console.log(currentUser);
  return (
    <>
    
    <div className='h-14 w-screen md:hidden fixed  bottom-0 bg-[#202020] text-white py-2 z-50'>
       {
        
        !currentUser?
        <div className='flex items-center justify-around h-full'>
            <div className='text-center '>Sign In now to like, 
            <br/>comment and upload videos</div>
            <button onClick={()=>{navigate('/login')}} className='bg-red-600 p-2 rounded'> Sign In</button>
        </div>
        :
        <>
        <div className='flex items-center justify-around h-full'>
        <div onClick={()=>{navigate("/random")}}>
            <AiOutlineHome size={"25px"}/>
        </div>
        <div onClick={()=>{navigate("/trendvideo")}}>
            <MdExplore size={"25px"}/>
        </div>
        <div onClick={()=>{navigate("/subscribedVideo")}}>
            <MdSubscriptions size={"25px"}/>
        </div>
        <div onClick={()=>{navigate("/vdoupload")}}>
            <BiVideoPlus size={"25px"}/>
        </div>
     </div>
     
     </>
       }
       
     
    </div>
    {/* {Open && <Uploadvdo setOpen={setOpen} mob={true}/>} */}
    </>
  )
}

export default Mobmenu