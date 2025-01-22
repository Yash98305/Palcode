import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import  Card  from "./pages/CardReorder.jsx";
const App = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/card" element={<Card />} /> 
      <Route path="*" element={<ErrorPage />} /> 
      {/* <Route path="/" element={<Navigate to="/google-login" />} />
        <Route path="/google-login" element={<Login />} />
        <Route path="/onebox" element={<Body/>}>
          <Route index element={<Home />} />  }
          <Route path="list" element={<InboxPage />} /> }
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      <ToastContainer/>
    </>
  );
};

export default App;
