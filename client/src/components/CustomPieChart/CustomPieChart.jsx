import React, { useEffect, useState } from "react";
import { DonutChart, Legend } from "@tremor/react";
import axios from "axios";

const CustomPieChart = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [patientData, setPatientData] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

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
        setPatientData(response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    // Calculate the frequency of patients in each age group
    const calculateAgeGroups = () => {
      const ageMap = new Map();
      patientData.forEach((patient) => {
        const age = Math.floor(
          (new Date() - new Date(patient.dob)) / 31557600000
        ); // Calculate age based on date of birth
        if (ageMap.has(age)) {
          ageMap.set(age, ageMap.get(age) + 1);
        } else {
          ageMap.set(age, 1);
        }
      });
      const sortedAgeGroups = Array.from(ageMap.entries()).sort(
        (a, b) => a[0] - b[0]
      );
      setAgeGroups(sortedAgeGroups);
    };

    if (patientData.length > 0) {
      calculateAgeGroups();
    }
  }, [patientData]);

  const dataFormatter = (number) =>
    `${Intl.NumberFormat("us").format(number).toString()}`;

  // Process age group data into format suitable for DonutChart
  const chartData = ageGroups.map((ageGroup) => ({
    name: `${ageGroup[0]}-${ageGroup[0] + 9}`, // Age range, assuming 10-year groups
    value: ageGroup[1],
  }));

  return (
    <>
      <div className="mx-auto space-y-12">
        <div className="space-y-3">
          <div className="flex flex-col gap-4 justify-center">
            <DonutChart
              data={chartData}
              variant="pie"
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              valueFormatter={dataFormatter}
              onValueChange={(v) => console.log(v)}
            />
            <Legend
              className="flex text-center"
              categories={chartData.map((item) => item.name)} // Only age group names
              colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPieChart;