import React, { useEffect, useState } from "react";
import {
  Outlet,
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import DashboardLayout from "./pages/DashboardLayout/DashboardLayout";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    setAuthenticated(!!jwtToken);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "sign-in", element: <SignIn setAuthenticated={setAuthenticated} /> },
        { path: "sign-up", element: <SignUp /> },
      ],
    },
    {
      path: "/dashboard/*",
      element: authenticated ? (
        <DashboardLayout setAuthenticated={setAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/dashboard/staff/*",
      element: authenticated ? (
        <DashboardLayout setAuthenticated={setAuthenticated} />
      ) : (
        <Navigate to="/" />
      ),
    },
  ]);

  return (
    <div className="w-full">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
