import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/NavBar/Navbar'
import Menu from './Components/Menu/Menu'
import Mobmenu from './Components/Mobmenu/Mobmenu'

function PortalOutlet() {
  return (
    
    <div className='App-container flex flex-col'>
      
    <Navbar/>

      <div className='App-Main flex '>
  
      <div className=''>
       <Menu/>
       <Mobmenu/>
      </div>


        <div className='App-Wrapper py-20 px-10  min-h-screen bg-zinc-900  w-screen overflow-auto'>
        <Outlet/>

          
        </div>
      </div>
    
  </div>

  )
}


export default PortalOutlet