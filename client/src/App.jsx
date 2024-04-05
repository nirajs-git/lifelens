import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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
      element: authenticated ? <Navigate to="/dashboard" /> : (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "sign-in",
      element: (
        <>
          <Navbar />
          <SignIn />
          <Footer />
        </>
      ),
    },
    {
      path: "sign-up",
      element: (
        <>
          <Navbar />
          <SignUp />
          <Footer />
        </>
      ),
    },
    {
      path: "/dashboard/*",
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
    </div>
  );
}

export default App;
