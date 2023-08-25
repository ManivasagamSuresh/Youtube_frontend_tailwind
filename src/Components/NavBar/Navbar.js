import React, { useContext, useEffect, useState } from "react";
// import "./Navbar.css";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { BiVideoPlus } from "react-icons/bi";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userSlice";
import Uploadvdo from "../UploadVdo/Uploadvdo";
import logo from '../../img/log.png'
import { BsPersonCircle } from 'react-icons/bs';
import { AiFillAudio } from 'react-icons/ai';
import { AiOutlineArrowLeft } from 'react-icons/ai';




function Navbar() {
  const [Open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
console.log(Open)
  const signout = () => {
    dispatch(logout());
    localStorage.clear("accessToken");
    navigate("/login");
  };
  const handleSearch = (searchQuery) => {
    setQ(searchQuery);
    navigate(`/search?q=${searchQuery}`);
  };
useEffect(()=>{
  console.log(searchOpen)
},[searchOpen]);




  return (
    <>
      
          <div className="fixed bg-custom w-screen h-14 text-white z-50">
          

          <div className="mob-view flex items-center justify-between mx-3  h-full md:hidden">
          {!searchOpen ?
           <>
            <div className="flex items-center justify-center gap-4 " >
               <img className='h-6 ' src={logo}/>
               <span> MBTube</span>            
            </div>
           
              <div className="flex items-center justify-center gap-4 ">
                <MdOutlineSearch onClick={()=>{setSearchOpen(true)}} size={"25px"} className=""/>
                {/* <img className="w-7 h-7 bg-gray-300 rounded-3xl" src="" alt=""/> */}
                <BsPersonCircle size={"25px"} onClick={()=>{setOpen(!Open)}} className="navbar-PersonIcon"/>
                {Open?<div className="navbar-Logout" onClick={() => {signout();}}>
                Logout
                </div>:null}
              </div>
             
              </>
              :
              <div className="flex items-center justify-between flex-1 w-full">
              <div className="flex-0.3" onClick={()=>{
                navigate("/");
                setSearchOpen(false);
              }}>
              
              <AiOutlineArrowLeft/>
                </div>      
              <div className="Navbar-Search z-10 flex-0.8 flex items-center  p-1.4 border border-gray-300 rounded-md">
                
                <input
                  className="border-none bg-transparent  outline-none text-gray-400 px-3 "
                  placeholder="Search"
                  
                  value={q} 
                  onChange={(e) => handleSearch(e.target.value)}
                  
                  />
                
                <MdOutlineSearch onClick={() => navigate(`/search?q=${q}`)} className="text-white mr-2 cursor-pointer"/>
                
                  </div>
                  <div className="flex-0.3">
                  <AiFillAudio/>
                  </div>
            </div> }
          </div>
            
             {/* --------------------- normal view ------------------- */}
        <div className=" hidden md:flex sticky top-0 items-center justify-between  px-4 w-full pt-3 text-white z-10">
            <div className="logo flex items-center justify-center gap-2" >
               <img className='Menu-Img h-6' src={logo}/>
               MBTube            
            </div>
            <div className="Navbar-Search w-5/12 flex items-center justify-between p-1.4 border border-gray-300 rounded-md flex-0.6">
                <input
                  className="border-none bg-transparent  outline-none text-gray-400 px-3"
                  placeholder="Search"
                  
                    value={q} 
      onChange={(e) => handleSearch(e.target.value)}
                  
                />
                
                <MdOutlineSearch onClick={() => navigate(`/search?q=${q}`)} className="text-white mr-2 cursor-pointer"/>
            </div>

                {currentUser ? (
                <div className="Navbar-User  flex items-center gap-5 w-fit flex-0.3" >
                  <BiVideoPlus size={"1.5em"} onClick={() => navigate("/vdoupload")}  className="cursor-pointer"/>
                  <div className="flex items-center gap-2">  
                  {/* <img className="Navbar-Avatar block w-7 h-7 bg-slate-300 rounded-3xl" src="" /> */}
                  <BsPersonCircle size={"25px"}/>
                  <span className="">{currentUser?.others.name}</span>
                  </div>
                  <span
                    onClick={() => {
                      signout();
                    }}
                    className="Navbar-Logout flex items-center gap-2 cursor-pointer mx-3"
                  >
                    <span style={{ margin: "10px" }} >|</span>
                    <AiOutlineLogout />
                    Logout
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="Navbar-Button cursor-pointer flex items-center gap-2 w-32"
                >
                  <RiAccountCircleLine size={'22px'}/> Sign In
                </button>
              )}    



        </div>
              
             
              
            
            </div>
          
          {/* {Open && <Uploadvdo setOpen={setOpen} />} */}
       
       
    </>
  );
}
// navigate(`/Search?q=${q}`)
export default Navbar;
