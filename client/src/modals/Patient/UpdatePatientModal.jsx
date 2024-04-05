import {
  Button,
  Dialog,
  DialogPanel,
  NumberInput,
  Select,
  SelectItem,
  TextInput,
  Title,
} from "@tremor/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaXmark, FaCircleArrowLeft } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const UpdatePatientModal = ({ isOpen, fetchPatients, closeModal, patientData }) => {
  const apiKey = import.meta.env.VITE_API_URL;
  const MAX_STEPS = 12;

  const [gender, setGender] = useState(patientData.gender);
  const [bloodType, setBloodType] = useState(patientData.bloodType);
  const [smokingStatus, setSmokingStatus] = useState(patientData.smokingStatus); 
  const [diabetesStatus, setDiabetesStatus] = useState(patientData.diabetesStatus);
  const [heartDiseaseStatus, setHeartDiseaseStatus] = useState(patientData.heartDiseaseStatus);
  const [familyHistoryOfHeartDisease, setFamilyHistoryOfHeartDisease] =
    useState(patientData.familyHistoryOfHeartDisease);
  const [familyHistoryOfDiabetes, setFamilyHistoryOfDiabetes] = useState(patientData.familyHistoryOfDiabetes);
  const [familyHistoryOfHypertension, setFamilyHistoryOfHypertension] =
    useState(patientData.familyHistoryOfHypertension);
  const [medicationUsage, setMedicationUsage] = useState(patientData.medicationUsage);

  const [formStep, setFormStep] = useState(0);

  const completeFormStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fname: patientData.fname,
      lname: patientData.lname,
      age: patientData.age,
      dob: patientData.dob
        ? new Date(patientData.dob).toISOString().split("T")[0]
        : "",
      phone: patientData.phone,
      email: patientData.email,
      address: patientData.address,
      allergies: patientData.allergies,
      bmi: patientData.bmi,
      bloodPressure_systolic: patientData.bloodPressure_systolic,
      bloodPressure_diastolic: patientData.bloodPressure_diastolic,
      cholesterolLevel: patientData.cholesterolLevel,
      exerciseFrequency: patientData.exerciseFrequency,
      alcoholConsumption: patientData.alcoholConsumption,
      dietaryHabits: patientData.dietaryHabits,
      stressLevel: patientData.stressLevel,
      sleepDuration: patientData.sleepDuration,
      // Blood Test Data
      hemoglobinLevel: patientData.hemoglobinLevel,
      whiteBloodCellCount: patientData.whiteBloodCellCount,
      redBloodCellCount: patientData.redBloodCellCount,
      plateletCount: patientData.plateletCount,
      meanCorpuscularVolume: patientData.meanCorpuscularVolume,
      meanCorpuscularHemoglobin: patientData.meanCorpuscularHemoglobin,
      meanCorpuscularHemoglobinConcentration: patientData.meanCorpuscularHemoglobinConcentration,
      neutrophilCount: patientData.neutrophilCount,
      lymphocyteCount: patientData.lymphocyteCount,
      monocyteCount: patientData.monocyteCount,
      eosinophilCount: patientData.eosinophilCount,
      basophilCount: patientData.basophilCount,
    },
    mode: "all",
  });

  const handleDobChange = (e) => {
    const dobValue = e.target.value;
    setValue("dob", dobValue); // Update the form value for dob
    calculateRetirementDate(dobValue);
  };

  const onSubmit = async (data) => {
    const jwtToken = localStorage.getItem("jwtToken");

    const config = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    const requestData = {
      ...data,
      gender: gender,
      bloodType: bloodType,
      smokingStatus: smokingStatus,
      diabetesStatus: diabetesStatus,
      heartDiseaseStatus: heartDiseaseStatus,
      familyHistoryOfHeartDisease: familyHistoryOfHeartDisease,
      familyHistoryOfDiabetes: familyHistoryOfDiabetes,
      familyHistoryOfHypertension: familyHistoryOfHypertension,
      medicationUsage: medicationUsage,
    };

    await axios
      .put(`${apiKey}/patient/update`, requestData, config)
      .then((res) => {
        if (res.data.successful) {
          toast.success("Patient updated successfully..!", {
            position: "bottom-right",
          });
          reset();
          setGender(null);
          setBloodType(null);
          setSmokingStatus(null)
          setDiabetesStatus(null)
          setHeartDiseaseStatus(null)
          setFamilyHistoryOfHeartDisease(null)
          setFamilyHistoryOfDiabetes(null)
          setFamilyHistoryOfHypertension(null)
          setMedicationUsage(null)
          closeModal();
          fetchPatients();
        }
        if (res.data.emailNotExistsError) {
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
      id="UpdatePatientModal"
      open={isOpen}
      onClose={(val) => closeModal(val)}
      static={true}
    >
      <DialogPanel>
        <div className="flex justify-between">
          <Title className="mb-8 text-warning">Update Patient</Title>
          <FaXmark
            className="text-lg text-danger cursor-pointer"
            onClick={() => closeModal()}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full">
              {formStep === 0 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Personal Information</h1>
                    <p className="flex items-center text-sm gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="fname" className="text-sm">
                      First Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("fname", { required: true })}
                      error={!!errors.fname}
                      errorMessage="Invalid first name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="lname" className="text-sm">
                      Last Name
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("lname", { required: true })}
                      error={!!errors.lname}
                      errorMessage="Invalid middle name"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="age" className="text-sm">
                      Age
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("age", { required: true })}
                      enableStepper={false}
                      error={!!errors.age}
                      errorMessage="Invalid age"
                    />
                  </span>
                </section>
              )}
              {formStep === 1 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Personal Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="address" className="text-sm">
                      Address
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("address", { required: true })}
                      error={!!errors.address}
                      errorMessage="Invalid address"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="dob" className="text-sm">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      {...register("dob", {
                        required: "Please select date of birth",
                        validate: (value) =>
                          calculateAge(value) >= 18 ||
                          "Must be 18 years or older",
                      })}
                      onChange={handleDobChange}
                      id="dob"
                      className={`w-full text-sm border rounded-lg mt-1 px-3 py-2 ${
                        errors.dob ? "border-red-600" : ""
                      } focus:outline-none focus:ring focus:border-primary`}
                    />
                    <span className="text-sm font-opensans text-red-600">
                      {errors.dob ? "Invalid date of birth" : ""}
                    </span>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="gender" className="text-sm">
                      Gender
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={gender}
                      onChange={(selected) => {
                        setGender(selected);
                      }}
                      placeholder="Select Gender"
                    >
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </Select>
                  </span>
                </section>
              )}

              {formStep === 2 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Contact Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="phone" className="text-sm">
                      Phone
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("phone", { required: true })}
                      error={!!errors.phone}
                      errorMessage="Invalid phone"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="email" className="text-sm">
                      Email
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("email", { required: true })}
                      type="email"
                      error={!!errors.email}
                      errorMessage="Invalid email"
                    />
                  </span>
                </section>
              )}
              {formStep === 3 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="bloodType" className="text-sm">
                      Blood Type
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={bloodType}
                      onChange={(selected) => setBloodType(selected)}
                      placeholder="Select Blood Type"
                    >
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="address" className="text-sm">
                      Allergies
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("allergies", { required: true })}
                      error={!!errors.allergies}
                      errorMessage="Invalid allergies"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="bmi" className="text-sm">
                      BMI
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("bmi", { required: true })}
                      enableStepper={false}
                      error={!!errors.bmi}
                      errorMessage="Invalid BMI"
                    />
                  </span>
                </section>
              )}
              {formStep === 4 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="bloodPressure_systolic" className="text-sm">
                      Blood Pressure (Systolic)
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("bloodPressure_systolic", {
                        required: true,
                      })}
                      enableStepper={false}
                      error={!!errors.bloodPressure_systolic}
                      errorMessage="Invalid Blood Pressure"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="address" className="text-sm">
                      Blood Pressure (Diastolic)
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("bloodPressure_diastolic", {
                        required: true,
                      })}
                      enableStepper={false}
                      error={!!errors.bloodPressure_diastolic}
                      errorMessage="Invalid Blood Pressure"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="address" className="text-sm">
                      Cholesterol Level
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("cholesterolLevel", { required: true })}
                      enableStepper={false}
                      error={!!errors.cholesterolLevel}
                      errorMessage="Invalid Cholesterol Level"
                    />
                  </span>
                </section>
              )}
              {formStep === 5 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="smokingStatus" className="text-sm">
                      Smoking Status
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={smokingStatus}
                      onChange={(selected) => setSmokingStatus(selected)}
                      placeholder="Select Smoking Status"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="diabetesStatus" className="text-sm">
                      Diabetes Status
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={diabetesStatus}
                      onChange={(selected) => setDiabetesStatus(selected)}
                      placeholder="Select Diabetes Status"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="heartDiseaseStatus" className="text-sm">
                      Heart Disease Status
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={heartDiseaseStatus}
                      onChange={(selected) => setHeartDiseaseStatus(selected)}
                      placeholder="Select Heart Disease Status"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                </section>
              )}
              {formStep === 6 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="exerciseFrequency" className="text-sm">
                      Exercise Frequency
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("exerciseFrequency", { required: true })}
                      enableStepper={false}
                      placeholder="Number of times per week"
                      error={!!errors.exerciseFrequency}
                      errorMessage="Invalid Exercise Frequency"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="alcoholConsumption" className="text-sm">
                      Alcohol Consumption
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("alcoholConsumption", { required: true })}
                      enableStepper={false}
                      placeholder="Number of drinks per week"
                      error={!!errors.alcoholConsumption}
                      errorMessage="Invalid Alcohol Consumption"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label
                      htmlFor="familyHistoryOfHeartDisease"
                      className="text-sm"
                    >
                      Family History Of Heart Disease
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={familyHistoryOfHeartDisease}
                      onChange={(selected) =>
                        setFamilyHistoryOfHeartDisease(selected)
                      }
                      placeholder="Select Family History Of Heart Disease"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                </section>
              )}
              {formStep === 7 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label
                      htmlFor="familyHistoryOfDiabetes"
                      className="text-sm"
                    >
                      Family History Of Diabetes
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={familyHistoryOfDiabetes}
                      onChange={(selected) =>
                        setFamilyHistoryOfDiabetes(selected)
                      }
                      placeholder="Select Family History Of Diabetes"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label
                      htmlFor="familyHistoryOfHypertension"
                      className="text-sm"
                    >
                      Family History Of Hypertension
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={familyHistoryOfHypertension}
                      onChange={(selected) =>
                        setFamilyHistoryOfHypertension(selected)
                      }
                      placeholder="Select Family History Of Hypertension"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="dietaryHabits" className="text-sm">
                      Dietary Habits
                    </label>
                    <TextInput
                      className="mt-1"
                      {...register("dietaryHabits", { required: true })}
                      error={!!errors.dietaryHabits}
                      errorMessage="Invalid Dietary Habits"
                    />
                  </span>
                </section>
              )}
              {formStep === 8 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Health Related Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="stressLevel" className="text-sm">
                      Stress Level
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("stressLevel", { required: true })}
                      enableStepper={false}
                      placeholder="On scale of 1 to 10"
                      error={!!errors.stressLevel}
                      errorMessage="Invalid Stress Level"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="sleepDuration" className="text-sm">
                      Sleep Duration
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("sleepDuration", { required: true })}
                      enableStepper={false}
                      placeholder="Hours per Night"
                      error={!!errors.sleepDuration}
                      errorMessage="Invalid Sleep Duration"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="medicationUsage" className="text-sm">
                      Medication Usage
                    </label>
                    <Select
                      className="mt-1"
                      enableClear={true}
                      value={medicationUsage}
                      onChange={(selected) => setMedicationUsage(selected)}
                      placeholder="Select Medication Usage"
                    >
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </Select>
                  </span>
                </section>
              )}
              {formStep === 9 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Blood Test Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="hemoglobinLevel" className="text-sm">
                      Hemoglobin Level
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("hemoglobinLevel", { required: true })}
                      enableStepper={false}
                      error={!!errors.hemoglobinLevel}
                      errorMessage="Invalid Hemoglobin Level"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="whiteBloodCellCount" className="text-sm">
                      White Blood Cell Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("whiteBloodCellCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.whiteBloodCellCount}
                      errorMessage="Invalid White Blood Cell Count"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="redBloodCellCount" className="text-sm">
                      Red Blood Cell Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("redBloodCellCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.redBloodCellCount}
                      errorMessage="Invalid Red Blood Cell Count"
                    />
                  </span>
                </section>
              )}
              {formStep === 10 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Blood Test Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="plateletCount" className="text-sm">
                    Platelet Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("plateletCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.plateletCount}
                      errorMessage="Invalid Platelet Count"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="meanCorpuscularVolume" className="text-sm">
                    Mean Corpuscular Volume
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("meanCorpuscularVolume", { required: true })}
                      enableStepper={false}
                      error={!!errors.meanCorpuscularVolume}
                      errorMessage="Invalid Mean Corpuscular Volume"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="meanCorpuscularHemoglobin" className="text-sm">
                    Mean Corpuscular Hemoglobin
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("meanCorpuscularHemoglobin", { required: true })}
                      enableStepper={false}
                      error={!!errors.meanCorpuscularHemoglobin}
                      errorMessage="Invalid Mean Corpuscular Hemoglobin"
                    />
                  </span>
                </section>
              )}
              {formStep === 11 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Blood Test Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="meanCorpuscularHemoglobinConcentration" className="text-sm">
                    Mean Corpuscular Hemoglobin Concentration
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("meanCorpuscularHemoglobinConcentration", { required: true })}
                      enableStepper={false}
                      error={!!errors.meanCorpuscularHemoglobinConcentration}
                      errorMessage="Invalid Mean Corpuscular Hemoglobi nConcentration"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="neutrophilCount" className="text-sm">
                    Neutrophil Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("neutrophilCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.neutrophilCount}
                      errorMessage="Invalid Neutrophil Count"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="lymphocyteCount" className="text-sm">
                    Lymphocyte Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("lymphocyteCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.lymphocyteCount}
                      errorMessage="Invalid Lymphocyte Count"
                    />
                  </span>
                </section>
              )}
              {formStep === 12 && (
                <section className="flex flex-col">
                  <span className="w-full flex justify-between mb-4">
                    <h1 className="font-bold">Blood Test Information</h1>
                    <p className="flex items-center gap-2 cursor-pointer">
                      <FaCircleArrowLeft
                        className={`text-lg text-primary ${
                          formStep === 0 ? "hidden" : "block"
                        }`}
                        onClick={() => setFormStep((prev) => prev - 1)}
                      />
                      Step {formStep + 1} of {MAX_STEPS}
                    </p>
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="monocyteCount" className="text-sm">
                    Monocyte Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("monocyteCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.monocyteCount}
                      errorMessage="Invalid Monocyte Count"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="eosinophilCount" className="text-sm">
                    Eosinophil Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("eosinophilCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.eosinophilCount}
                      errorMessage="Invalid Eosinophil Count"
                    />
                  </span>
                  <span className="w-full mb-4">
                    <label htmlFor="basophilCount" className="text-sm">
                    Basophil Count
                    </label>
                    <NumberInput
                      className="mt-1"
                      {...register("basophilCount", { required: true })}
                      enableStepper={false}
                      error={!!errors.basophilCount}
                      errorMessage="Invalid Basophil Count"
                    />
                  </span>
                </section>
              )}
            </div>
          </div>
          <div className="mt-4 float-right">
            <Button
              disabled={!isValid}
              onClick={formStep <= 10 ? completeFormStep : null}
              type={formStep <= 10 ? "button" : "submit"}
              className="text-white border btn-transition bg-primary border-primary hover:bg-white hover:border-primary hover:text-primary"
            >
              {formStep <= 10 ? "Next Step" : "Submit"}
            </Button>
          </div>
        </form>
      </DialogPanel>
    </Dialog>
  );
};

export default UpdatePatientModal;
