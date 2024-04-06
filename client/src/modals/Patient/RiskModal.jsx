import { Button, Dialog, DialogPanel, Title } from "@tremor/react";
import React from "react";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { IoIosMail } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { formatDate } from "../../helpers/DateFormatter";
import axios from 'axios'

const RiskModal = ({ isOpen, patientData, closeModal }) => {
    const apiKey = import.meta.env.VITE_API_URL;

    const generatePdf = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(10, 30, "LifeLens - Empowering Health");
        doc.setFontSize(12);
        doc.text(10, 40, `Assessment Report of ${patientData.fname}`);
      
        const div = document.getElementById("pdf");
      
        html2canvas(div, {
          scale: 2, // Increase scale to improve quality
          scrollY: -window.scrollY,
          allowTaint: true,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
      
          const imgWidth = 190; // Adjust according to your table width
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
          doc.addImage(imgData, "PNG", 10, 50, imgWidth, imgHeight);
          doc.save(`assessment_report_${patientData.fname}.pdf`);
        });
      };
      
      const sendMail = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(10, 30, "LifeLens - Empowering Health");
        doc.setFontSize(12);
        doc.text(10, 40, `Assessment Report of ${patientData.fname}`);
      
        const div = document.getElementById("pdf");
      
        html2canvas(div, {
          scale: 2, // Increase scale to improve quality
          scrollY: -window.scrollY,
          allowTaint: true,
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
      
          const imgWidth = 190; // Adjust according to your table width
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
          doc.addImage(imgData, "PNG", 10, 50, imgWidth, imgHeight);
      
          // Save PDF to a blob
          const pdfFile = doc.output('blob');
      
          // Create FormData
          const formData = new FormData();
          formData.append('email', 'poskarmangesh29@gmail.com'); // Replace with patient's email
          formData.append('pdfFile', pdfFile, `assessment_report_${patientData.fname}.pdf`);
      
          // Send mail with PDF file
          axios.post(`${apiKey}/mail/send`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            console.log('Email sent successfully:', response.data.message);
            // Optionally, you can show a success message to the user
          })
          .catch((error) => {
            console.error('Error sending email:', error.response.data.message);
            // Handle error, show error message to the user, etc.
          });
        });
      };
  return (
    <Dialog
      id="riskassess"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between mb-4">
          <Title className="mb-2 text-primary">
            Risk Assessment Report of {patientData.fname}
          </Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <div id="pdf" className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <div className="flex flex-col h-fit gap-4 border-4 rounded-lg py-4 px-8 w-fit border-dashed">
              <Title>Personal Information</Title>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-dark">
                    <label>Name of Patient: </label>
                    <span className="text-danger">
                      {patientData.fname + " " + patientData.lname}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Age: </label>
                    <span className="text-danger">{patientData.age}</span>
                  </span>
                  <span className="text-dark">
                    <label>Gender: </label>
                    <span className="text-danger">{patientData.gender}</span>
                  </span>
                  <span className="text-dark">
                    <label>Date of Birth: </label>
                    <span className="text-danger">
                      {formatDate(patientData.dob)}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-dark">
                    <label>Phone: </label>
                    <span className="text-danger">{patientData.phone}</span>
                  </span>
                  <span className="text-dark">
                    <label>Email: </label>
                    <span className="text-danger">{patientData.email}</span>
                  </span>
                  <span className="text-dark">
                    <label>Address: </label>
                    <span className="text-danger">{patientData.address}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-fit gap-4 border-4 rounded-lg py-4 px-8 w-fit border-dashed">
              <Title>Health Information</Title>
              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-dark">
                    <label>Blood Type: </label>
                    <span className="text-danger">{patientData.bloodType}</span>
                  </span>
                  <span className="text-dark">
                    <label>Allergies: </label>
                    <span className="text-danger">{patientData.allergies}</span>
                  </span>
                  <span className="text-dark">
                    <label>BMI: </label>
                    <span className="text-danger">{patientData.bmi}</span>
                  </span>
                  <span className="text-dark">
                    <label>Blood Pressure (Systolic): </label>
                    <span className="text-danger">
                      {patientData.bloodPressure_systolic}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Blood Pressure (Diastolic): </label>
                    <span className="text-danger">
                      {patientData.bloodPressure_diastolic}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-dark">
                    <label>Cholesterol Level: </label>
                    <span className="text-danger">
                      {patientData.cholesterolLevel}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Smoking Status: </label>
                    <span className="text-danger">
                      {patientData.smokingStatus}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Diabetes Status: </label>
                    <span className="text-danger">
                      {patientData.diabetesStatus}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Heart Disease Status: </label>
                    <span className="text-danger">
                      {patientData.heartDieseaseStatus}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Exercise Frequency: </label>
                    <span className="text-danger">
                      {patientData.exerciseFrequency}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-dark">
                    <label>Alcohol Consumption: </label>
                    <span className="text-danger">
                      {patientData.alcoholConsumption}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Family History Of Heart Disease: </label>
                    <span className="text-danger">
                      {patientData.familyHistoryOfHeartDisease}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Family History Of Heart Diabetes: </label>
                    <span className="text-danger">
                      {patientData.familyHistoryOfDiabetes}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Family History Of Hypertension: </label>
                    <span className="text-danger">
                      {patientData.familyHistoryOfHypertension}
                    </span>
                  </span>
                  <span className="text-dark">
                    <label>Family History Of Hypertension: </label>
                    <span className="text-danger">
                      {patientData.familyHistoryOfHypertension}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col h-fit gap-4 border-4 rounded-lg py-4 px-8 w-fit border-dashed">
              <Title>Blood Test Report</Title>
              <div className="flex">
                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-dark">
                      <label>Hemoglobin Level: </label>
                      <span className="text-danger">
                        {patientData.hemoglobinLevel}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>White Blood Cell Count: </label>
                      <span className="text-danger">
                        {patientData.whiteBloodCellCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Red Blood Cell Count: </label>
                      <span className="text-danger">
                        {patientData.redBloodCellCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Platelet Count: </label>
                      <span className="text-danger">
                        {patientData.plateletCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Platelet Count: </label>
                      <span className="text-danger">
                        {patientData.plateletCount}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-dark">
                      <label>Mean Corpuscular Volume: </label>
                      <span className="text-danger">
                        {patientData.meanCorpuscularVolume}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Mean Corpuscular Hemoglobin: </label>
                      <span className="text-danger">
                        {patientData.meanCorpuscularHemoglobin}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Mean Corpuscular Hemoglobin Concentration: </label>
                      <span className="text-danger">
                        {patientData.meanCorpuscularHemoglobinConcentration}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Neutrophil Count: </label>
                      <span className="text-danger">
                        {patientData.neutrophilCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Lymphocyte Count: </label>
                      <span className="text-danger">
                        {patientData.lymphocyteCount}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-dark">
                      <label>Monocyte Count: </label>
                      <span className="text-danger">
                        {patientData.monocyteCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Eosinophil Count: </label>
                      <span className="text-danger">
                        {patientData.eosinophilCount}
                      </span>
                    </span>
                    <span className="text-dark">
                      <label>Basophil Count: </label>
                      <span className="text-danger">
                        {patientData.basophilCount}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex gap-6 right-[6rem] bottom-[6rem]">
          <Button
            icon={IoMdDownload}
            className="btn-transition self-center mt-2 w-fit border-primary bg-primary hover:bg-white hover:text-primary hover:border-primary"
            onClick={generatePdf}
          >
            Download
          </Button>
          <Button
            icon={IoIosMail}
            className="btn-transition self-center mt-2 w-fit border-yellow bg-yellow hover:bg-white hover:text-yellow hover:border-yellow"
            onClick={sendMail}
          >
            Send to Patient
          </Button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default RiskModal;
