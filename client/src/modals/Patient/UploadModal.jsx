import React, { useCallback } from "react";
import { Dialog, DialogPanel, Button } from "@tremor/react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";
import { parse } from "papaparse"; // Import papaparse for CSV parsing

const UploadModal = ({ isOpen, fetchPatients, closeModal }) => {
  const apiKey = import.meta.env.VITE_API_URL;

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        // Check if the file type is CSV
        if (file.type !== "text/csv") {
          toast.error("Please upload a csv file..!", {
            position: "bottom-right",
          });
          console.error("Only CSV files are allowed");
          return;
        }

        // Use papaparse to parse the CSV file
        parse(file, {
          complete: (result) => {
            const patientRecords = result.data.slice(1).map((record) => [
              record[1], // fname
              record[2], // lname
              parseInt(record[3]), // age
              record[4], // gender
              new Date(record[5]), // dob
              record[6], // phone
              record[7], // email
              record[8], // address
              record[9], // bloodType
              record[10], // allergies
              parseFloat(record[11]), // bmi
              parseInt(record[12]), // bloodPressure_systolic
              parseInt(record[13]), // bloodPressure_diastolic
              parseInt(record[14]), // cholesterolLevel
              record[15] === "TRUE" ? "true" : "false", // smokingStatus
              record[16] === "TRUE" ? "true" : "false", // diabetesStatus
              record[17] === "TRUE" ? "true" : "false", // heartDiseaseStatus
              parseInt(record[18]), // exerciseFrequency
              parseInt(record[19]), // alcoholConsumption
              record[20] === "TRUE" ? "true" : "false", // familyHistoryOfHeartDisease
              record[21] === "TRUE" ? "true" : "false", // familyHistoryOfDiabetes
              record[22] === "TRUE" ? "true" : "false", // familyHistoryOfHypertension
              record[23], // dietaryHabits
              parseInt(record[24]), // stressLevel
              parseInt(record[25]), // sleepDuration
              record[26] === "TRUE" ? "true" : "false", // medicationUsage
              parseFloat(record[27]), // hemoglobinLevel
              parseInt(record[28]), // whiteBloodCellCount
              parseFloat(record[29]), // redBloodCellCount
              parseInt(record[30]), // plateletCount
              parseInt(record[31]), // meanCorpuscularVolume
              parseInt(record[32]), // meanCorpuscularHemoglobin
              parseInt(record[33]), // meanCorpuscularHemoglobinConcentration
              parseInt(record[34]), // neutrophilCount
              parseInt(record[35]), // lymphocyteCount
              parseInt(record[36]), // monocyteCount
              parseInt(record[37]), // eosinophilCount
              parseInt(record[38]), // basophilCount
            ]);

            console.log(patientRecords);
            // Get the JWT token from localStorage or your preferred storage mechanism
            const jwtToken = localStorage.getItem("jwtToken"); // Assuming it's stored in localStorage

            // Send the patient records array to the server using Axios with JWT token in the headers
            axios
              .post(
                `${apiKey}/patient/upload`,
                { patientRecords },
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`, // Include JWT token in the headers
                    "Content-Type": "application/json",
                  },
                }
              )
              .then((response) => {
                if (response.data.successful) {
                  fetchPatients();
                  closeModal();
                }
                if (response.data.fileUploadError) {
                  toast.error("Failed to upload a file..!", {
                    position: "bottom-right",
                  });
                }
                if (response.data.parseError) {
                  toast.error("Failed to parse CSV file..!", {
                    position: "bottom-right",
                  });
                }
              })
              .catch((error) => {
                toast.error("Failed to upload a file..!", {
                  position: "bottom-right",
                });
              });
          },
        });
      }
    },
    [fetchPatients, closeModal]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Dialog
      id="UploadModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel className="flex flex-col gap-4 p-10">
        <div
          className="text-center border-2 border-dashed py-20 border-green "
          {...getRootProps()}
          style={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <p>Drag 'n' drop a CSV file here, or click to select file</p>
        </div>
        <Button
          className="text-white border btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
          onClick={() => closeModal()}
        >
          Cancel
        </Button>
      </DialogPanel>
    </Dialog>
  );
};

export default UploadModal;