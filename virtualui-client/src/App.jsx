import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import { useEffect } from 'react';
import axios from 'axios';
import { setUserData } from './redux/user.slice.js';
import { useDispatch } from 'react-redux';
import Generate from './pages/Generate.jsx';
import AllComponents from './pages/AllComponents.jsx';



export const ServerUrl = "https://virtualui-f3cz.onrender.com"

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const res = await axios.get(ServerUrl+ "/api/user/current-user",
          {withCredentials:true})
          dispatch(setUserData(res.data))
        
      } catch (error) {
         dispatch(setUserData(null))
        
      }
    }
    fetchUser()
  },[]);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<Generate />} />
              <Route path="/component" element={<AllComponents />} />

      


    </Routes>
  )
}

export default App
