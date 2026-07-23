import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  setUserData,
  setAllComponents,
  setAllUsers,
} from './redux/user.slice.js';
import { useDispatch, useSelector } from 'react-redux';
import Generate from './pages/Generate.jsx';
import AllComponents from './pages/AllComponents.jsx';
import Pricing from './pages/Pricing.jsx';
import MyComponents from "./pages/MyComponents.jsx";

export const ServerUrl = import.meta.env.VITE_SERVER_URL;

const App = () => {

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          ServerUrl + "/api/user/current-user",
          { withCredentials: true }
        );

        dispatch(setUserData(res.data));
      } catch (error) {
        dispatch(setUserData(null));
      } finally {
        setAuthChecked(true);
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {

    // Fetch only after user is loaded
    if (userData) {

      const fetchAllUsers = async () => {
        try {
          const userRes = await axios.get(
            ServerUrl + "/api/user/all-users",
            { withCredentials: true }
          );

          dispatch(setAllUsers(userRes.data));
          console.log(userRes.data);

        } catch (error) {
          console.log(error.response?.data || error.message);
          dispatch(setAllUsers(null));
        }
      };

      const fetchAllComponents = async () => {
        try {
          const componentRes = await axios.get(
            ServerUrl + "/api/component/all-components",
            { withCredentials: true }
          );

          dispatch(setAllComponents(componentRes.data));
          console.log(componentRes.data);

        } catch (error) {
          console.log(error.response?.data || error.message);
          dispatch(setAllComponents(null));
        }
      };

      fetchAllUsers();
      fetchAllComponents();
    }

  }, [userData, dispatch]);

  return (
    <>
      {!authChecked && (
        <div className="fixed top-0 left-0 w-full h-1 bg-purple-500 animate-pulse z-50" />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/component" element={<AllComponents />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/my-components" element={<MyComponents />} />
      </Routes>
    </>
  );
};

export default App;
