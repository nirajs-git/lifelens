import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import Dashboard from "../../components/Dashboard/Dashboard";
import Patients from "../../components/Patients/Patients";
import RiskAssessment from "../../components/RiskAssessment/RiskAssessment";

const DashboardLayout = ({ setAuthenticated }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Get the path of the current route
  const currentPath = location.pathname;

  const getUserDetails = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    await axios
      .get(`${apiKey}/auth/get-user`, config)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.log("Error in getting the user details....\n" + err);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  return (
    <div className="flex">
      <Sidebar setAuthenticated={setAuthenticated}/>
      <div className="flex flex-col w-full">
        <div id="dash-header" className="h-[64px] bg-white w-full">
          <div
            id="profile"
            className="h-full flex items-center justify-end md:justify-between px-6"
          >
            <div className="font-semibold max-md:hidden uppercase text-dark tracking-wide font-opensans">
              {currentPath === "/dashboard"
                ? "Dashboard"
                : currentPath === "/dashboard/manage-patients"
                ? "Manage Patients"
                : currentPath === "/dashboard/risk-assessment"
                ? "Risk Assessment"
                : "LifeLens"}
            </div>
            <div className="flex p-2 rounded-lg cursor-pointer">
              <FaCircleUser className="text-3xl text-dark" />
              <span className="ml-4 text-dark font-mulish font-semibold">
                Dr. {user && user.fullName && user.fullName.split(" ")[0]}
              </span>
            </div>
          </div>
        </div>
        <div
          id="dash-main"
          className="p-7 flex-1 bg-slate-50 max-h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden"
        >
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="/manage-patients" element={<Patients />} />
            <Route path="/risk-assessment" element={<RiskAssessment />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;