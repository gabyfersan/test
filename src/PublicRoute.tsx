//import React from "react";
import { Route, Navigate } from "react-router-dom";
//import { isLogin } from "./utils";
import Home from "./components/Home.tsx";
const isLogin = false;
//{ component: Component, ...rest }
export const PublicRoute = () => <Route path="/" element={<Home />} />;
//export default PublicRoute;
