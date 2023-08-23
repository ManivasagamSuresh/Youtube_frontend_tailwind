import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Config } from '../../Config'
import Menu from '../Menu/Menu'
import Navbar from '../NavBar/Navbar'
import Video from '../Video/Video'
import VideoCard from '../VideoCard/Videocard'
// import "./Home.css"

function Home({type}) {
const[Videos , setVideos] = useState([])

useEffect(()=>{
  
  fetchdata();
  // console.log(Videos)
},[type])

const fetchdata = async()=>{
  try {
    const videodata = await axios.get(`${Config.api}/${type}`,{headers :{
        "authorization":localStorage.getItem("accessToken")
    }})  
    // console.log(videodata.data) ;  
     setVideos(videodata.data);
  } catch (error) {
    console.log(error);
  }
    
}

  return (
    <>
    
    
    <div className='Home-Container  bg-zinc-900 mt-14 flex flex-col w-full md:flex-row md:gap-6 flex-wrap md:justify-evenly'>
      {
        Videos.map((vdo)=>{
          return <VideoCard key={vdo._id} vdo={vdo} test="test"/>
        })
      }
      </div>
       </>
  )
}

export default Home