import React, { useContext } from 'react'
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Menu() {
   const navigate = useNavigate()
   
   const {currentUser} = useSelector(state => state.user)
  return (
   <>
   <div className='Menu-Container hidden  bg-red-600 text-black md:flex flex-col flex-1 h-screen sticky top-14 z-0' >
     
      <div className='Menu-Wrapper py-5 px-8'>
      {currentUser?<>
      
        <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/random")}}>
           <AiFillHome size={"1.5em"}/> Home
        </div>
        <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/trendvideo")}}>
           <MdOutlineExplore size={"1.5em"}/> Explore
        </div>
        <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/subscribedVideo")}}>
           <MdOutlineSubscriptions size={"1.5em"}/> Subscription
        </div>
        
        
            { !currentUser && 
            <>
            <hr className='Menu-Hr mx-4 border border-solid border-opacity-50 border-gray-700'/>
            <div className="Login">
            Sign In to Like , comment and Subscribe .
            <br/>
            <button onClick={()=>{navigate('/')}} className='Menu-Button'><RiAccountCircleLine size={"1.3em"}/> Sign In</button>
            </div>
            </>  }
            
        
        <hr className='Menu-Hr mx-4 my-8 border border-solid border-opacity-50 border-gray-700'/></>:null}        

      </div>
        
      
    
   </div>
   </>
  )
}

export default Menu