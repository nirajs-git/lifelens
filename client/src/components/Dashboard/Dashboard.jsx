import React, { useEffect, useState } from "react";
import { Flex, Card } from "@tremor/react";
import { ImUserTie } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi2";
import { FaGraduationCap } from "react-icons/fa6";
import DashCard from "../../components/DashCard/DashCard";
import axios from "axios";
import { CustomAreaChart } from "../AreaChart/CustomAreaChart";

const Dashboard = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [patientsCount, setPatientsCount] = useState(0);
  const [diabetesCount, setDiabetesCount] = useState(0);
  const [heartDiseaseCount, setHeartDiseaseCount] = useState(0);

  const fetchPatients = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await axios.get(`${apiKey}/patient/get-all`, config);
      if (response.data) {
        setPatientsCount(response.data.length);
        // Count diabetes patients by filtering patients with diabetes status set to "true"
        const diabetesPatients = response.data.filter(
          (patient) => patient.diabetesStatus === "true"
        );
        setDiabetesCount(diabetesPatients.length);
        const heartDiseasePatients = response.data.filter(
          (patient) => patient.heartDiseaseStatus === "true"
        );
        setHeartDiseaseCount(heartDiseasePatients.length);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const cardData = [
    {
      title: "Patients",
      count: patientsCount,
      icon: ImUserTie,
      color: "green",
      tooltip: "Total Patients",
    },
    {
      title: "Diabetes Patients",
      count: diabetesCount,
      icon: HiUserGroup,
      color: "red",
      tooltip: "Total Diabetes Patients",
    },
    {
      title: "Heart Patients",
      count: heartDiseaseCount, // Adjust this count accordingly
      icon: FaGraduationCap,
      color: "yellow",
      tooltip: "Total Heart Patients",
    },
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="grid grid-cols-dashboard gap-8 h-full">
      <div className="flex flex-col gap-4">
        <Flex className="justify-between">
          {cardData.map((item, index) => (
            <DashCard
              key={index}
              title={item.title}
              icon={item.icon}
              color={item.color}
              count={item.count}
              tooltip={item.tooltip}
            />
          ))}
        </Flex>
        <Card>
          <CustomAreaChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;