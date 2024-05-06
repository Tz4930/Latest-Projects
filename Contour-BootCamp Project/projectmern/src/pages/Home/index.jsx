import "./index.css";
import Navbar from "../../components/Navbar";
import Layoutcarousel from "./Layoutcarousel";
import Brocure from "./Brochure";

const Home = () => {
  return (
    <>
      <div className="bg-mainBgColor">
        <Navbar />
        <Layoutcarousel />
        <div className="">
          <div className="tag-one">
            <div className="tag-title">TRACK ACTIVITIES, BOOST PERFORMANCE</div>
          </div>
          <div className="tag-two">
            <div className="tag-title">
              RIDING ,HIKING ,WALKING SWIMING ,BICYCLING
            </div>
          </div>
        </div>
        <br />
        <Brocure />
      </div>
    </>
  );
};

export default Home;
