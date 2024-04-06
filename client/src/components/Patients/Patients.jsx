import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  FaBackward,
  FaFileExport,
  FaForward,
  FaPenToSquare,
  FaTrash,
} from "react-icons/fa6";
import { CSVLink } from "react-csv";
import { Card, TextInput } from "@tremor/react";
import axios from "axios";
import { formatDate } from "../../../src/helpers/DateFormatter.js";
import AddPatientModal from "../../modals/Patient/AddPatientModal.jsx";
import UpdatePatientModal from "../../modals/Patient/UpdatePatientModal.jsx";
import DeletePatientModal from "../../modals/Patient/DeletePatientModal.jsx";
import UploadModal from "../../modals/Patient/UploadModal.jsx";

const Patients = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [patient, setPatient] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const filteredData = data.filter((item) =>
    item.fname.toLowerCase().includes(searchValue.toLowerCase())
  );

  const displayedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const fetchPatients = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    await axios
      .get(`${apiKey}/patient/get-all`, config)
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const headers = [
    { label: "Sr. No.", key: "srno" },
    { label: "First Name", key: "fname" },
    { label: "Last Name", key: "lname" },
    { label: "Age", key: "age" },
    { label: "Gender", key: "gender" },
    { label: "DOB", key: "dob" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Blood Type", key: "bloodType" },
    { label: "Allergies", key: "allergies" },
    { label: "BMI", key: "bmi" },
    { label: "BloodPressure_systolic", key: "bloodPressure_systolic" },
    { label: "BloodPressure_diastolic", key: "bloodPressure_diastolic" },
    { label: "Cholesterol Level", key: "cholesterolLevel" },
    { label: "Smoking Status", key: "smokingStatus" },
    { label: "Diabetes Status", key: "diabetesStatus" },
    { label: "Heart Disease Status", key: "heartDiseaseStatus" },
    { label: "Exercise Frequency", key: "exerciseFrequency" },
    { label: "Alcohol Consumption", key: "alcoholConsumption" },
    {
      label: "Family History Of Heart Disease",
      key: "familyHistoryOfHeartDisease",
    },
    { label: "Family History Of Diabetes", key: "familyHistoryOfDiabetes" },
    {
      label: "Family History Of Hypertension",
      key: "familyHistoryOfHypertension",
    },
    { label: "Dietary Habits", key: "dietaryHabits" },
    { label: "Stress Level", key: "stressLevel" },
    { label: "Sleep Duration", key: "sleepDuration" },
    { label: "Medication Usage", key: "medicationUsage" },
    { label: "Hemoglobin Level", key: "hemoglobinLevel" },
    { label: "White Blood Cell Count", key: "whiteBloodCellCount" },
    { label: "Red Blood Cell Count", key: "redBloodCellCount" },
    { label: "Platelet Count", key: "plateletCount" },
    { label: "Mean Corpuscular Volume", key: "meanCorpuscularVolume" },
    { label: "Mean Corpuscular Hemoglobin", key: "meanCorpuscularHemoglobin" },
    {
      label: "Mean Corpuscular Hemoglobin Concentration",
      key: "meanCorpuscularHemoglobinConcentration",
    },
    { label: "Neutrophil Count", key: "neutrophilCount" },
    { label: "Lymphocyte Count", key: "lymphocyteCount" },
    { label: "Monocyte Count", key: "monocyteCount" },
    { label: "Eosinophil Count", key: "eosinophilCount" },
    { label: "Basophil Count", key: "basophilCount" },
  ];

  const csvData = data.map((item, index) => ({
    srno: index + 1,
    fname: item.fname,
    lname: item.lname,
    age: item.age,
    gender: item.gender,
    dob: item.dob,
    email: item.email,
    phone: item.phone,
    bloodPressure_systolic: item.bloodPressure_systolic,
    bloodPressure_diastolic: item.bloodPressure_diastolic,
    cholesterolLevel: item.cholesterolLevel,
    smokingStatus: item.smokingStatus,
    diabetesStatus: item.diabetesStatus,
    heartDiseaseStatus: item.heartDiseaseStatus,
    exerciseFrequency: item.exerciseFrequency,
    alcoholConsumption: item.alcoholConsumption,
    familyHistoryOfHeartDisease: item.familyHistoryOfHeartDisease,
    familyHistoryOfDiabetes: item.familyHistoryOfDiabetes,
    familyHistoryOfHypertension: item.familyHistoryOfHypertension,
    dietaryHabits: item.dietaryHabits,
    stressLevel: item.stressLevel,
    sleepDuration: item.sleepDuration,
    medicationUsage: item.medicationUsage,
  }));

  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      <div className="w-full flex justify-between mb-8 font-opensans">
        <div className="flex gap-4">
          <TextInput
            className="w-64"
            icon={FaSearch}
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            onClick={() => setAddModalOpen(true)}
            className="flex items-center text-sm py-2 px-4 rounded-lg text-white border btn-transition bg-primary border-primary hover:bg-white hover:text-primary"
          >
            <FaPlus className="mr-2" />
            Add Patient
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setUploadModalOpen(true);
            }}
            className="flex items-center text-sm py-2 px-4 rounded-lg bg-yellow text-white border btn-transition border-yellow hover:text-yellow hover:bg-white"
          >
            <FaFileExport className="mr-2" />
            Upload
          </button>
          <CSVLink
            data={csvData}
            headers={headers}
            filename="lifelens_patients.csv"
          >
            <button
              onClick={() => exportData()}
              className="flex items-center text-sm py-2 px-4 rounded-lg bg-green text-white border btn-transition bg-green-600 border-green-600 hover:bg-white hover:text-green"
            >
              <FaFileExport className="mr-2" />
              Export to CSV
            </button>
          </CSVLink>
        </div>
      </div>
      <Card className="h-full">
        {displayedData.length !== 0 ? (
          <table className="w-full text-center text-sm border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{item.fname + " " + item.lname}</td>
                  <td>{formatDate(item.dob)}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="text-warning"
                      onClick={() => {
                        setPatient(item);
                        setUpdateModalOpen(true);
                      }}
                    >
                      <FaPenToSquare />
                    </button>
                  </td>
                  <td>
                    <button
                      className="text-danger"
                      onClick={() => {
                        setPatient(item);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center py-4 text-gray-600">
            Data is not available.
          </p>
        )}
      </Card>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={
          "flex items-center bg-white mt-4 p-4 rounded-md w-fit shadow-md"
        }
        activeClassName={
          "mx-4 item-active border-solid px-3 py-1 border-primary border-2 rounded-full bg-info text-dark"
        }
        breakClassName={"mx-4"}
        breakLabel={"..."}
        disabledClassName={"text-gray-500"}
        nextClassName={"mx-4 px-3 text-dark"}
        nextLabel={<FaForward />}
        pageClassName={"font-medium mx-4"}
        previousClassName={"mx-4 px-3 text-dark"}
        previousLabel={<FaBackward />}
      />
      {addModalOpen && (
        <AddPatientModal
          isOpen={addModalOpen}
          fetchPatients={fetchPatients}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <UpdatePatientModal
          isOpen={updateModalOpen}
          fetchPatients={fetchPatients}
          closeModal={() => setUpdateModalOpen(false)}
          patientData={patient}
        />
      )}
      {deleteModalOpen && (
        <DeletePatientModal
          isOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          fetchPatients={fetchPatients}
          patientData={patient}
        />
      )}
      {uploadModalOpen && (
        <UploadModal
          isOpen={uploadModalOpen}
          closeModal={() => setUploadModalOpen(false)}
          fetchPatients={fetchPatients}
        />
      )}
    </div>
  );
};

export default Patients;
