import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import "./Dashboard.css";
import { createUserActivity } from "../../features/activitySlice";
import { ModalValidation } from "../../validation";
const ModalInput = (props) => {
  const activityType = [
    { value: "Select Activity Type" },
    { value: "Running" },
    { value: "Bicycle" },
    { value: "Swimming" },
    { value: "Walking" },
    { value: "Hiking" },
  ];
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const { show, handleClose } = props;
  const [error,setError] = useState({});
  const [activties, setActivities] = useState({});
  const handleFormInput = (e) => {
    setActivities({ ...activties, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (! ModalValidation()) return;
    handleValidation()
    dispatch(createUserActivity(activties));
    console.log(activties);
    handleClose();
  };
const handleValidation=async()=>{
    setError(await ModalValidation(activties))
}
console.log(error);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className="w-full rounded-[30px] drop-shadow-2xl bg-gradient-to-bl from-[#73d1eed3] from-20% to-[#55f0f065] to-40%">
          <div className="w-full p-8 space-y-7 rounded-[30px] ">
            <p className="font-normal text-[33px] text-center font-orbitron">
              Activtiy Form
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid justify-center">
              <select
              required
                onChange={handleFormInput}
                name="activitytype"
                id=""
                className="w-[380px] h-[50px] mb-3 pr-3 rounded-[7px] border-2 border-solid border-black bg-white"
              >
                {activityType.map((element, index) => {
                  return <option key={index}>{element.value}</option>;
                })}
              </select>
              <input
                onChange={handleFormInput}
                required
                name="description"
                type="text"
                placeholder="Description"
                className="w-[380px] h-[50px] mb-3 pr-3 rounded-[7px] border-2 border-solid border-black bg-white"
              />
              <input
                onChange={handleFormInput}
                required
                name="date"
                type="date"
                min={currentDate}
                placeholder=" Select Date"
                className="w-[380px] h-[50px] mb-3 pr-3 rounded-[7px] border-2 border-solid border-black bg-white"
              />
              <input
                onChange={handleFormInput}
                required
                name="duration"
                min={1}
                max={60}
                type="number"
                placeholder="Select Duration in Minutes"
                className="w-[380px] h-[50px] mb-3 pr-3 rounded-[7px] border-2 border-solid border-black bg-white"
              />
            </div>
            <div className="grid justify-center">
              <button
                onClick={handleClose}
                className="w-[380px] h-[50px] bg-mainBgColor rounded-[10px] mb-3 mt-[2.5em] font-orbitron text-white"
              >
                Cancel
              </button>
              <button className="w-[380px] h-[50px] bg-mainBgColor rounded-[10px] mb-[2.5em] mt-[8px] font-orbitron text-white ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalInput;
