import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom';
import VideoCard from '../VideoCard/Videocard';
import { Config } from '../../Config';

function Search() {
    const [Videos,setVideos] = useState([]);
    const query = useLocation().search
    // console.log(q);
    useEffect(()=>{
        const fetch  =   async()=>{
            
            // console.log(q)
            const res = await axios.get(`${Config.api}/search${query}`,{"headers" :{
                "authorization":localStorage.getItem("accessToken"),
            }})
            setVideos(res.data);
        }
       if(query.length ==0 || query.length >= 2)  fetch();
    },[query])
  return (
    <div className='Search-Container bg-zinc-900 mt-14 flex flex-col w-full md:flex-row md:gap-6 flex-wrap md:justify-evenly'>
        {
            Videos.map((vdo)=>{
                 return   <VideoCard key={vdo._id} vdo={vdo}/>
            })
          }
    </div>
  )
}

export default Search