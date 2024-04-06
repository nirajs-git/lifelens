import React, { useEffect, useState } from "react";
import { BarChart } from '@tremor/react';
import axios from "axios";

const CustomBarChart = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await axios.get(`${apiKey}/patient/get-all`, config);
      if (response.data) {
        setPatientData(response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  // Initialize BMI groups state
  const [bmiGroups, setBmiGroups] = useState({
    Underweight: 0,
    Normal: 0,
    Overweight: 0,
    Obese: 0,
  });

  useEffect(() => {
    // Calculate BMI groups and count of patients in each group
    const calculateBmiGroups = () => {
      const updatedBmiGroups = {
        Underweight: 0,
        Normal: 0,
        Overweight: 0,
        Obese: 0,
      };

      patientData.forEach((patient) => {
        const bmi = patient.bmi;
        if (bmi < 18.5) {
          updatedBmiGroups.Underweight++;
        } else if (bmi >= 18.5 && bmi < 25) {
          updatedBmiGroups.Normal++;
        } else if (bmi >= 25 && bmi < 30) {
          updatedBmiGroups.Overweight++;
        } else {
          updatedBmiGroups.Obese++;
        }
      });

      setBmiGroups(updatedBmiGroups);
    };

    if (patientData.length > 0) {
      calculateBmiGroups();
    }
  }, [patientData]);

  const chartData = Object.entries(bmiGroups).map(([group, count]) => ({
    name: group,
    "Number of Patients": count,
  }));

  return (
    <BarChart
      data={chartData}
      index="name"
      categories={["Number of Patients"]}
      colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  );
};

export default CustomBarChart;