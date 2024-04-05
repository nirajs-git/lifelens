import {
    Button,
    Dialog,
    DialogPanel,
    Title,
  } from "@tremor/react";
  import axios from "axios";
  import React from "react";
  import toast from "react-hot-toast";
  import { FaXmark } from "react-icons/fa6";
  
  const DeletePatientModal = ({ isOpen, closeModal, fetchPatients, patientData }) => {
    const apiKey = import.meta.env.VITE_API_URL;
  
    const onSubmit = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
  
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
  
      const data = {
        email: patientData.email,
      };
      
      await axios
        .delete(`${apiKey}/patient/delete`, { data, ...config })
        .then((res) => {
          if (res.data.successful) {
            toast.success("Patient deleted successfully..!", {
              position: "bottom-right",
            });
            closeModal();
            fetchPatients();
          }
          if(res.data.emailNotExistsError){
            toast.error("Patient not exists..!", {
              position: "bottom-right",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Internal Server Error..!", { position: "bottom-right" });
        });
    };
  
    return (
      <Dialog
        id="DeletePatientModal"
        open={isOpen}
        onClose={(val) => closeModal(val)}
        static={true}
      >
        <DialogPanel>
          <div className="flex justify-between">
            <Title className="mb-8 text-danger">Delete Patient</Title>
            <FaXmark
              className="text-lg text-danger cursor-pointer"
              onClick={() => closeModal()}
            />
          </div>
          <p>
            Are you sure want to delete the patient with name{" "}
            <span className="text-danger">
              {patientData.fname + " " + patientData.lname}
            </span>
            ?
          </p>
          <div className="mt-4 float-right">
            <Button
              variant="primary"
              className="btn-transition bg-danger border-danger hover:bg-white hover:border-danger hover:text-danger"
              onClick={() => onSubmit()}
            >
              Delete
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    );
  };
  
  export default DeletePatientModal;
  