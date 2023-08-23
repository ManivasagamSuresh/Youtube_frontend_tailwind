import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import "./Recommodation.css"
import { Config } from '../../Config';
import VideoCard from '../VideoCard/Videocard';
import { useSelector } from 'react-redux';
import RecommendCard from '../recomendCard/RecommendCard';


function Recommodation({tags}) {
  const [Videos,setVideos]=useState([]);
  const {currentVideo}=useSelector(state=>state.video)

  useEffect(()=>{
    const fetch = async()=>{
        const res = await axios.get(`${Config.api}/tags?tags=${tags}`,{headers :{
            "authorization":localStorage.getItem("accessToken")
        }})
        // res.data
        let data = res.data;
        let index = data.findIndex(ele=>ele._id==currentVideo._id)
        data.splice(index,1);
        console.log(data);
        setVideos(data);
        console.log(Videos)
    };
    fetch()
  },[tags,currentVideo])
  
    return (
    <div className='Recommodation-Container w-full md:w-1/3 text-gray-400 items-center'>
          {
            Videos.map((vdo)=>{
                 return   <RecommendCard  key={vdo._id} vdo={vdo}/>
            })
          }
          </div>
  )
}

export default Recommodation