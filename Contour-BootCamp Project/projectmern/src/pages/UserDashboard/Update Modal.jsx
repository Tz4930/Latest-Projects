import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./Dashboard.css";
import { useSelector } from "react-redux";
import {updateUserActivity} from '../../features/activitySlice'
const ModalUpdate = (props) => {
  const { updateshow, handleClose, id } = props;
  const [updatedata, setUpdateData] = useState();
  const { activity, loading } = useSelector((state) => state.app);
  useEffect(() => {
    if (id) {
      const selectedActivty = activity.filter((ele) => {return ele._id == id});
      setUpdateData(selectedActivty && selectedActivty[0] );
    }
  }, [id]);

  const activityType = [
    { value: "Select Activity Type" },
    { value: "Running" },
    { value: "Bicycle" },
    { value: "Swimming" },
    { value: "Walking" },
    { value: "Hiking" },
  ];
  const inputdata = (e)=>{
    setUpdateData({...updatedata, [e.target.name] : e.target.value})
  }
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString().split("T")[0];
  const [activties, setActivities] = useState({});
  const handleFormInput = (e) => {
    setActivities({ ...activties, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserActivity(updatedata,id));
    handleClose();
  };
  return (
    <>
      <Modal show={updateshow} onHide={handleClose}>
        <div className="w-full rounded-[30px] drop-shadow-2xl bg-gradient-to-bl from-[#73d1eed3] from-20% to-[#55f0f065] to-40%">
          <div className="w-full p-8 space-y-7 rounded-[30px] ">
            <p className="font-normal text-[33px] text-center font-orbitron">
              Activtiy Form
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid justify-center">
              <select
                onChange={inputdata}
                name="activitytype"
                id=""
                value={updatedata && updatedata.activitytype ? updatedata.activitytype : ''}
                className="w-[380px] h-[50px] mb-3 rounded-[7px] border-2 border-solid border-black bg-white"
              >
                {activityType.map((element, index) => {
                  return <option key={index}>{element.value}</option>;
                })}
              </select>
              <input
                onChange={inputdata}
                name="description"
                type="text"
                placeholder="Description"
                value={updatedata && updatedata.description ? updatedata.description : ''}
                className="w-[380px] h-[50px] mb-3 rounded-[7px] border-2 border-solid border-black bg-white"
              />
              <input
                onChange={inputdata}
                name="date"
                type="date"
                value={updatedata && updatedata.date ? updatedata.date : ''}
                min={currentDate}
                placeholder=" Select Date"
                className="w-[380px] h-[50px] mb-3 rounded-[7px] border-2 border-solid border-black bg-white"
              />
              <input
                onChange={inputdata}
                name="duration"
                min={1}
                max={60}
                type="number"
                value={updatedata && updatedata.duration ? updatedata.duration : ''}
                placeholder="Select Duration in Minutes"
                className="w-[380px] h-[50px] mb-3 rounded-[7px] border-2 border-solid border-black bg-white"
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
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
