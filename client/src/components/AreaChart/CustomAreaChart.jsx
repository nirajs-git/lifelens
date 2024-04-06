import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";
import axios from "axios";

export function CustomAreaChart() {
  const apiKey = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);

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
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []); // Fetch patients only once when the component mounts

  const formattedData = data
    ? data.map((patient) => ({
        date: patient.dob.substring(0, 10), // Extract date part
        BMI: patient.bmi,
        SystolicBP: patient.bloodPressure_systolic,
        DiastolicBP: patient.bloodPressure_diastolic,
      }))
    : [];

  return (
    <AreaChart
      className="h-80"
      data={formattedData}
      index="date"
      categories={["BMI", "SystolicBP", "DiastolicBP"]}
      colors={["indigo", "rose", "green"]}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}