// import './App.css';
import Menu from "./Components/Menu/Menu.js";
import Navbar from "./Components/NavBar/Navbar.js";
import Home from "./Components/Home/Home.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Video from "./Components/Video/Video";
import VideoCard from "./Components/VideoCard/Videocard";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Search from "./Components/Search/Search";
import io from "socket.io-client";
import Mobmenu from "./Components/Mobmenu/Mobmenu";
import Uploadvdo from "./Components/UploadVdo/Uploadvdo.js";
import Outlet from "./Outlet.js";
import PortalOutlet from "./Outlet.js";
import RedirectIfNoUserData from "./RedirectNoUser.js";


const socket = io.connect("http://localhost:5000");
// const socket = io.connect('https://you-tube-clone.onrender.com')

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<PortalOutlet />}>
          <Route path="" element={ <RedirectIfNoUserData> <Home type="randomvideos" /> </RedirectIfNoUserData> } />
          <Route path="trendvideo" element={<Home type="trendvideo" />} />
          <Route path="subscribedVideo" element={<Home type="subscribedVideo" />} />
          <Route path="video/:id" element={<Video socket={socket} />} />
          <Route path="search" element={<Search />} />
          <Route path="vdoupload" element={<Uploadvdo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
