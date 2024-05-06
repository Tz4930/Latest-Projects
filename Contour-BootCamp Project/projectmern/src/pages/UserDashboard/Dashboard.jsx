import React,{useState} from "react";
import Sidebar from "./Sidebar";
import { dashboardgoal } from "../../assets";
import { IoMdBicycle } from "react-icons/io";
import { BiRun, BiTimeFive } from "react-icons/bi";
import { RiWalkFill } from "react-icons/ri";
import { FaSwimmer, FaCalendar, FaEdit } from "react-icons/fa";
import { GiHiking } from "react-icons/gi";
import { AiFillDelete } from "react-icons/ai";
import Actvity from '../Activity'
const Dashboard = () => {
    const [state, setState] = useState({
        values:{
            id:'',
            activitytype:'',
            description:'',
            date:'',
            duration:''
        }
    })
  const checkData = [
    {
      activity: "bicycle",
      date: "12-may-2022",
      duration: "2-minutes",
    },
    {
      activity: "run",
      date: "12-may-2022",
      duration: "2-minutes",
    },
    {
      activity: "swim",
      date: "12-may-2022",
      duration: "2-minutes",
    },
    {
      activity: "walk",
      date: "12-may-2022",
      duration: "2-minutes",
    },
  ];
  return (
    <>
      <div className="flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="container  ">
          <div>
            <h1 className="py-4 font-normal text-6xl font-orbitron">
              Overview
            </h1>
            <div className="w-[46em] h-[344px] rounded-[50px] bg-mainBgColor flex lg:items-center">
              <img src={dashboardgoal} alt="" />
              <div>
                <p className="text-4xl leading-[45px] text-white font-orbitron">
                  SET GOAL AND MOTIVATE YOURSELF
                </p>
                <button className="mt-5 w-[200px] h-16 bg-white rounded-[15px] bg-grey font-normal text-xl font-orbitron">
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
          <div className="flex justify-evenly">
          {checkData.map((element, index) => {
              return (
                  <>
                <div className="w-[250px] h-[230px] bg-mainBgColor rounded-[25px] ">
                  <i className="text-white grid justify-center text-[60px]">
                  {(element.activity) =='bicycle' ? <IoMdBicycle /> :
                  (element.activity) =='swim' ? <FaSwimmer /> :
                  (element.activity) =='walk' ? <RiWalkFill /> :
                  (element.activity) =='run' ? <BiRun /> :
                  (element.activity) =='hike' ? <GiHiking /> :
                  ''}
                  </i>
                  <div>
                    <div className="flex text-white text-[20px] px-[20px] pt-[25px]">
                        <i className="text-[30px]"><FaCalendar/></i>
                        <span className="pl-[15px] text-[20px]">{element.date}</span>
                        </div>
                    <div className="flex text-white  px-[20px] pt-[15px]">
                        <i className="text-[30px]"><BiTimeFive/></i>
                        <span className="pl-[15px] text-[20px]">{element.duration}</span>
                    </div>
                    <div className="flex justify-center text-white pt-[15px]">
                        <i className="text-[30px]"><FaEdit/></i>
                        <i className="text-[30px] pl-[10px]"><AiFillDelete/></i>
                    </div>
                  </div>
                </div>
              </>
            );
        })}
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
