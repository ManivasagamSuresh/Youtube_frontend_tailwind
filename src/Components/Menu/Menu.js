import React, { useContext } from 'react'
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineExplore } from 'react-icons/md';
import { MdOutlineSubscriptions } from 'react-icons/md';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Menu() {
   const navigate = useNavigate()
   console.log()
   const {currentUser} = useSelector(state => state.user);
   console.log(currentUser)
  return (
   <>
   <div className='Menu-Container hidden  bg-zinc-800 text-gray-400 md:flex flex-col h-calc56vh sticky top-14 ' >
     
      <div className='Menu-Wrapper py-5 px-8'>
      
      
        <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/")}}>
           <AiFillHome size={"1.5em"}/> Home
        </div>
        <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/trendvideo")}}>
           <MdOutlineExplore size={"1.5em"}/> Explore
        </div>
    {currentUser &&     <div className="Menu-Item flex gap-5 items-center cursor-pointer py-2 px-1" onClick={()=>{navigate("/subscribedVideo")}}>
           <MdOutlineSubscriptions size={"1.5em"}/> Subscription
        </div>}
        
        
            { !currentUser && 
            <>
            <hr className='Menu-Hr  my-5 border border-solid border-opacity-50 border-gray-700'/>
            <div className="Login">
            Sign In to Like , <br/>
             comment and Subscribe .
            <br/>
            <button onClick={()=>{navigate('/login')}} className='Menu-Button flex items-center my-5 gap-2'><RiAccountCircleLine size={"1.3em"}/> Sign In</button>
            </div>
            </>  }
            
        
        <hr className='Menu-Hr mx-4 my-8 border border-solid border-opacity-50 border-gray-700'/>       

      </div>
        
      
    
   </div>
   </>
  )
}

export default Menu