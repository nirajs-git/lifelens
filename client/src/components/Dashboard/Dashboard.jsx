import React, { useEffect, useState } from "react";
import { Flex, Card, Title } from "@tremor/react";
import { MdHealthAndSafety } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import DashCard from "../../components/DashCard/DashCard";
import axios from "axios";
import { FaHeartbeat } from "react-icons/fa";
import { CustomAreaChart } from "../AreaChart/CustomAreaChart";
import CustomPieChart from "../CustomPieChart/CustomPieChart";
import CustomBarChart from "../CustomBarChart/CustomBarChart";

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

        // Count heart disease patients by filtering patients with heart disease status set to "true"
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
      icon: HiUserGroup,
      color: "success",
      tooltip: "Total Patients",
    },
    {
      title: "Diabetes Patients",
      count: diabetesCount,
      icon: MdHealthAndSafety,
      color: "primary",
      tooltip: "Total Diabetes Patients",
    },
    {
      title: "Heart Patients",
      count: heartDiseaseCount, // Adjust this count accordingly
      icon: FaHeartbeat,
      color: "danger",
      tooltip: "Total Heart Patients",
    },
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="grid grid-cols-dashboard bg-slate-50 gap-8 h-full">
      <div className="flex flex-col gap-4">
        <Flex className="flex gap-2">
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
          <Title>Patient Health Trends</Title>
          <CustomAreaChart />
        </Card>
        <Card>
          <Title>BMI Distribution of Patients</Title>
          <CustomBarChart />
        </Card>
      </div>
      <div>
        <Card>
          <Title className="mb-8">Patient Age Distribution</Title>
          <CustomPieChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;