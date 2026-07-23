import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import Home from "./pages/Home.jsx";
import Generate from "./pages/Generate.jsx";
import AllComponents from "./pages/AllComponents.jsx";
import Pricing from "./pages/Pricing.jsx";
import MyComponents from "./pages/MyComponents.jsx";

import {
  setUserData,
  setAllComponents,
} from "./redux/user.slice.js";

export const ServerUrl = "https://virtualui-f3cz.onrender.com";

const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  // Fetch Current User
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

  // Fetch All Components
  useEffect(() => {
    const fetchAllComponents = async () => {
      try {
        const res = await axios.get(
          ServerUrl + "/api/component/all-components",
          { withCredentials: true }
        );

        dispatch(setAllComponents(res.data));
      } catch (error) {
        console.log(error.response?.data || error.message);
        dispatch(setAllComponents([]));
      }
    };

    fetchAllComponents();
  }, [dispatch]);

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
