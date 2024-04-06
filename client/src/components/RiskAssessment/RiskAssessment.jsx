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
import RiskModal from "../../modals/Patient/RiskModal.jsx";

const RiskAssessment = () => {
  const apiKey = import.meta.env.VITE_API_URL;

  const [addModalOpen, setAddModalOpen] = useState(false);

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
        </div>
      </div>
      <Card className="h-full">
        {displayedData.length !== 0 ? (
          <table id="risk" className="w-full text-center text-sm border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
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
                  <td className="flex items-center justify-center">
                    <button
                      className="flex items-center text-sm py-2 px-4 rounded-lg text-white border btn-transition bg-danger border-danger hover:bg-white hover:text-danger"
                      onClick={() => {
                        setPatient(item);
                        setAddModalOpen(true);
                      }}
                    >
                      Generate Report
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
          "mx-4 item-active border-solid px-3 py-1 border-danger border-2 rounded-full bg-info text-dark"
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
        <RiskModal
          isOpen={addModalOpen}
          patientData={patient}
          closeModal={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default RiskAssessment;