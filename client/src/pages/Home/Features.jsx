import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsShieldLock } from "react-icons/bs";
import { FaUserMd, FaFileMedicalAlt } from "react-icons/fa";
import { IoSettings, IoTicket } from "react-icons/io5";

const Features = () => {
  return (
    <section id="features" className="md:p-14 max-md:p-10">
      <div className="container mx-auto text-center">
        <h2 className="max-lg:text-[2rem] lg:text-[3rem] max-md:text-[1.6rem] sm:text[1.2rem] max-md:text-center text-dark font-extrabold mb-4">Our Features</h2>
        <p className="text-gray-600 font-mulish mb-12">
          Discover how LifeLens revolutionizes patient management and risk
          assessment for healthcare professionals.
        </p>

        <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 px-5 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <AiOutlineUser className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">Patient Management</h3>
              <p className="font-mulish">
                Efficiently manage patient records and health details with
                intuitive tools, ensuring comprehensive care.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <FaUserMd className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">
                Healthcare Professional Insights
              </h3>
              <p className="font-mulish">
                Gain valuable insights into patient health trends and risks,
                facilitating informed decision-making.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <IoSettings className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">Streamlined Workflow</h3>
              <p className="font-mulish">
                Simplify administrative tasks and workflow processes for
                healthcare professionals, ensuring efficiency.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <BsShieldLock className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">
                Data Privacy and Security
              </h3>
              <p className="font-mulish">
                Ensure the confidentiality  data fostering trust and compliance within the
                healthcare ecosystem.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <IoTicket className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">Risk Assessment</h3>
              <p className="font-mulish">
                Utilize AI-powered risk assessment tools to evaluate patient
                risks accurately, aiding proactive healthcare decisions.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="group bg-white text-dark hover:bg-green hover:text-white transition-all duration-300 ease-in-out p-10 rounded-lg shadow-md flex flex-col gap-3 items-center justify-center">
              <div className="p-3 border border-green rounded-[50%]">
                <FaFileMedicalAlt className="text-[1.7rem]" />
              </div>
              <h3 className="text-xl font-medium mb-4">
                Health Record Management
              </h3>
              <p className="font-mulish">
                Maintain comprehensive health records securely, ensuring
                accessibility and continuity of care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
