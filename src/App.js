import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import PrivateRoute from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute.tsx";
import "./App.css";
//import Button from "@mui/material/Button";
//import Login from "./components/Login";
import Home from "./components/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
