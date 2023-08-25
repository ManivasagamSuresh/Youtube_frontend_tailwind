import React, { useEffect, useState } from "react";
import "./Video.css";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import Comments from "../Comments/Comments";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuccess, like , dislike, views } from "../Redux/videoSlice";
import { format } from 'timeago.js'
import { Config } from "../../Config";
import { subscription } from "../Redux/userSlice";
import Recommodation from "../Recommondation/Recommodation";
import { Socket } from "socket.io-client";
import Navbar from "../NavBar/Navbar";

function Video({socket}) {


  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state => state.video)
  const [Channel,setChannel]=useState({});
const params = useParams();
const dispatch = useDispatch()



useEffect(()=>{
  const fecthData = async()=>{
    console.log(currentVideo);
    console.log(currentUser);
    try {
      
      const  vdo = await axios.get(`${Config.api}/findvideo/${params.id}`,{headers :{
        "authorization":localStorage.getItem("accessToken")
    }})
    console.log(vdo.data);
      const  chnl = await axios.get(`${Config.api}/findUser/${vdo.data.userId}`,{headers :{
        "authorization":localStorage.getItem("accessToken")
    }})
    console.log(chnl.data);
    await axios.put(`${Config.api}/videoViews/${vdo.data._id}`,{"headers" :{
      "authorization":localStorage.getItem("accessToken")
  }})         
    console.log(vdo)
          setChannel(chnl.data);
          dispatch(fetchSuccess(vdo.data));
          dispatch(views(vdo.data));
    } catch (error) {
      console.log(error)
    }
  }
  fecthData();
},[params.id,dispatch])




const handlelike = async()=>{
  try {

    const add = await axios.put(`${Config.api}/like/${currentVideo._id}`,{"headers" :{
      "authorization":localStorage.getItem("accessToken"),
  }})
  
  dispatch(like(currentUser.others._id))
  } catch (error) {
    console.log("error"); 
  }
}

const handledislike = async()=>{
 { try {
    const dis = await axios.put(`${Config.api}/dislike/${currentVideo._id}`,{"headers" :{
      "authorization":localStorage.getItem("accessToken")
  }})
  dispatch(dislike(currentUser.others._id));
  console.log("clicked")
  } catch (error) {
    console.log(error); 
  }}
}


const handleSub = async()=>{


  currentUser.others.subscribedUsers.includes(Channel._id)
  ? await axios.put(`${Config.api}/unsub/${Channel._id}`,{ "headers" :{
    "authorization":localStorage.getItem("accessToken")
}})
:await axios.put(`${Config.api}/sub/${Channel._id}`,{ "headers" :{
  "authorization":localStorage.getItem("accessToken")
}});
  dispatch(subscription(Channel._id));


}



  return (
    <>
    
    <div className="Video-Container flex flex-col gap-5 md:flex-row md:gap-6">
      <div className="Video-Content w-full  text-gray-400 mx-1 md:w-8/12">
        <div className="Video-Wrapper w-full">
          <video className="Video-Vdo w-full"  src={currentVideo?.videoUrl} controls/>          
        </div>
        <h1 className="Video-Title text-lg md:text-2xl font-semibold mt-5 mb-2 text-gray-400">{currentVideo?.title}</h1>
        <div className="Video-Details flex flex-col gap-3 md:gap-5">
          { <div className="Video-Info flex text-sm text-gray-400">{currentVideo?.views}  views · {format(currentVideo?.timestamps)}</div> }
          {/*  */}
          <div className="Video-Buttons flex gap-5 md:gap-8">
            <div className="Video-Button flex items-center gap-1 cursor-pointer " >
              {currentVideo?.likes?.includes(currentUser.others._id)?<AiFillLike size={"1.2em"} /> :<AiOutlineLike size={"1.2em"} onClick={handlelike}/>}
              {currentVideo?.likes?.length}
            </div>
            <div className="Video-Button flex items-center gap-1 cursor-pointer" >
            {currentVideo?.dislikes?.includes(currentUser.others._id)?<AiFillDislike size={"1.2em"}/>:<AiOutlineDislike size={"1.2em"} onClick={handledislike}/>}
            </div>
            <div className="Video-Button flex items-center gap-1 cursor-pointer">
              <RiShareForwardLine size={"1.3em"} />
              Share
            </div>
            <div className="Video-Button flex items-center gap-1 cursor-pointer">
              <MdOutlineLibraryAdd size={"1.3em"} />
              Save
            </div>
          </div>
        </div>
        <hr className="Video-Hr border border-gray-400 my-7" />

        <div className="Video-Channel flex justify-between">
          <div className="Video-ChannelInfo flex gap-5">
            <img className="Video-ChannelImg w-10 h-10 rounded-full" src={Channel.img} />
            <div className="Video-ChannelDetail flex flex-col ">
              <span className="Video-ChannelName font-semibold">{Channel.name}</span>
              <div className="Video-ChannelCounter mt-1 mb-5 text-sm">{Channel.subscribers} Subscribers</div>
              {/* <div className="Video-ChannelDescription">
              {currentVideo?.desc}
              </div> */}
            </div>
          </div>
          <button className="Video-ChannelSubscribe text-sm px-2 py-0 h-8 rounded-2xl bg-gray-200 font-semibold text-black " onClick={handleSub}>{currentUser?.others.subscribedUsers?.includes(Channel._id) ? "Subscribed":  "Subscribe"}</button>
        </div>
        <hr className="Video-Hr border border-gray-400 my-5" />
        <Comments videoID={currentVideo?._id} socket={socket}/>
      </div>
      <Recommodation tags={currentVideo?.tags}/>     
    </div>
    </>
  );
}

export default Video;
