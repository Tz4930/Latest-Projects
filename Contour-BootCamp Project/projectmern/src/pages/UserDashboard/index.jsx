import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { dashboardgoal, } from "../../assets";
import { IoMdBicycle } from "react-icons/io";
import { BiRun, BiTimeFive } from "react-icons/bi";
import { RiWalkFill } from "react-icons/ri";
import { FaSwimmer, FaCalendar, FaEdit } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import { notification, Modal } from "antd";
import { useDispatch } from "react-redux";
import ActivityModal from "./Modal";
import UpdateModal from "./Update Modal";
import {
  AllUserActivity,
  getUserActivity,
  deleteUserActivity,
} from "../../features/activitySlice";
import { useSelector } from "react-redux";
import { Pagination } from "antd";
import Navbar from "./Navbar";
const Dashboard = () => {
  const { activity, loading,allActivity } = useSelector((state) => state.app);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserActivity({page,limit}));
    dispatch(AllUserActivity())
  }, [page]);
  const [id, setId] = useState();
  const [limit, setlimit] = useState(4);
  const [show, setShow] = useState(false);
  const [updateshow, setUpdateShow] = useState(false);
  const updatehandleShow = () => {setUpdateShow(true) };
  const handleShow = () => setShow(true);
  const handleClose = () => {setShow(false);setUpdateShow(false) };
  if(loading){
    <h1>Loading...</h1>
  }
  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
      placement: "topRight",
    });
  };
  return (
    <>
      <div className="lg:flex sm:overflow-hidden">
        <Navbar/>
        <div className="">
          
          <Sidebar />
        </div>
        <div className="container ">
          <div>
            <h1 className="py-4 font-normal text-6xl font-orbitron ">
              Overview
            </h1>
            <div className="lg:w-[46em] sm:w-screen sm:px-3 h-[344px] rounded-[50px] bg-mainBgColor lg:flex lg:items-center sm:mx-[20px]">
              <img className="img-goal" src={dashboardgoal} alt="" />
              <div>
                <p className="lg:text-4xl sm:text-[20px] sm:pl-[5px] leading-[45px] text-white font-orbitron">
                  SET GOAL AND MOTIVATE YOURSELF
                </p>
                <button
                id="goal-btn"
                  className="mt-5  lg:w-[200px] lg:h-16 bg-white lg:rounded-[15px] bg-grey font-normal lg:text-xl sm:text-[10px] font-orbitron"
                  onClick={handleShow}
                >
                  Set Goal
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1 className="py-4 font-normal text-6xl font-orbitron">
              Activity
            </h1>
          </div>
          <div id="card-container" className="lg:flex">
            {
            activity.map((element, index) => {
              return (
                <div key={index}>
                  <div id="singlecard" className="w-[250px] mr-[3em] h-[230px] bg-mainBgColor rounded-[25px]  ">
                    <i className="text-white grid justify-center text-[60px]">
                      {element.activitytype == "Bicycle" ? (
                        <IoMdBicycle />
                      ) : element.activitytype == "Swimming" ? (
                        <FaSwimmer />
                      ) : element.activitytype == "Walking" ? (
                        <RiWalkFill />
                      ) : element.activitytype == "Running" ? (
                        <BiRun />
                      ) : element.activitytype == "Hiking" ? (
                        <GiHiking />
                      ) : (
                        ""
                      )}
                    </i>
                    <div>
                      <div className="flex text-white text-[20px] px-[20px] pt-[25px]">
                        <i className="text-[30px]">
                          <FaCalendar />
                        </i>
                        <span className="pl-[15px] text-[20px]">
                          {element.date}
                        </span>
                      </div>
                      <div className="flex text-white  px-[20px] pt-[15px]">
                        <i className="text-[30px]">
                          <BiTimeFive />
                        </i>
                        <span className="pl-[15px] text-[20px]">
                          {element.duration}
                        </span>
                      </div>
                      <div className="flex justify-center text-white pt-[15px]">
                        <i
                          className="text-[30px]"
                          onClick={() => {
                            [setId(element._id), updatehandleShow(element.id)];
                          }}
                        >
                          <FaEdit />
                        </i>
                        <i
                          className="text-[30px] pl-[10px]"
                          onClick={() => {
                            dispatch(deleteUserActivity(element._id));
                          }}
                        >
                          <AiFillDelete />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div id="paginate-container" className="lg:flex lg:justify-center lg:pt-[15px]">
            <Pagination
              defaultCurrent={1}
              total={allActivity.length}
              pageSize={4}
              onChange={(page) => setPage(page)}
            />
            <ActivityModal
              show={show}
              handleClose={handleClose}
              handleNotification={handleNotification}
            />
            <UpdateModal
              id={id}
              updateshow={updateshow}
              handleClose={handleClose}
              handleNotification={handleNotification}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
