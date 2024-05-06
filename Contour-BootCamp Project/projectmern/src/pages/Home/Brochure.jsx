import { Col, Row } from "antd";
import { yoga, strategies, workout, pulsemeter } from "../../assets/index";

function Brocure() {
  return (
    <>
      <div>
        <Row className="lg:pt-[400px] lg:pb-0 lg:px-[120px] sm:pt-[300px] sm:pb-0 sm:px-[20px]">
          <Col xs={24} sm={24} md={10} lg={16}>
            <div className="lg:w-[750px] sm:w-[1250px] ">
              <h2 className="font-orbitron lg:text-[55px] sm:text-[25px] text-center text-white ">
                PERSONAL TRAINING ANYWHERE
              </h2>
              <br />
              <h1 className="font-poppins lg:text-[24px] sm:text-[8px] text-white">
                Record your workouts and review your statistics. Join challenges
                to get motivated - push your limits. Share your success with a
                global community and reach your goals with every step.
              </h1>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8}>
            <div className="w-[350px]">
              <div className="flex justify-center">
                <img src={yoga} alt="" />
              </div>
              <h4 className="text-center text-white lg:text-[1.7em] sm:text-[1em] font-orbitron p-[1em]">
                BODY & MIND
              </h4>
              <span className=" text-white lg:text-[1.2em] sm:text-[0.6em] font-poppins leading-[1em] ">
                Our yoga trainers will build your perfect body workout ever and
                physique professionals.
              </span>
            </div>
          </Col>
        </Row>
        <Row className=" lg:pb-0 lg:px-[120px] sm:pt-[200px] sm:pb-0 sm:px-[20px]">
          <Col xs={12} sm={12} md={6} lg={8}>
            <div className="w-[350px]">
              <div className="flex justify-center">
                <img src={pulsemeter} alt="" />
              </div>
              <h4 className="text-center text-white lg:text-[1.7em] sm:text-[1em] font-orbitron p-[1em]">
                HEALTHY LIFE
              </h4>
              <span className=" text-white lg:text-[1.2em] sm:text-[0.6em] font-poppins leading-[1em] ">
                Specializing in The class based sessions are challeng ing
                innovative workout ever.
              </span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={16}>
            <div className="lg:w-[750px] sm:w-[1250px] pt-[20px]">
              <h2 className="font-orbitron lg:text-[55px] sm:pt-[20px] sm:text-[25px] text-center text-white ">
                STAY & ACTIVE & HEALTHY.
              </h2>
              <br />
              <h1 className="font-poppins lg:text-[24px] sm:text-[8px] text-white">
                Select muscle groups and create your own workout that fits your
                schedule Join challenges: compare your activity to others and
                push yourself in new ways. Workout anywhere, any time.
              </h1>
            </div>
          </Col>
        </Row>
        <Row className=" lg:pb-0 lg:px-[120px] sm:pt-[200px] sm:pb-0 sm:px-[20px]">
          <Col xs={24} sm={24} md={10} lg={16}>
            <div className="lg:w-[750px] sm:w-[1250px] pt-[20px]">
              <h2 className="font-orbitron lg:text-[55px] sm:text-[25px] text-center text-white ">
                WORK OUT is Way to Live.
              </h2>
              <br />
              <h1 className="font-poppins lg:text-[24px] sm:text-[8px] text-white">
                Select muscle groups and create your own workout that fits your
                schedule Join challenges: compare your activity to others and
                push yourself in new ways. Workout anywhere, any time.
              </h1>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={8}>
            <div className="w-[350px]">
              <div className="flex justify-center">
                <img src={workout} alt="" />
              </div>
              <h4 className="text-center text-white lg:text-[1.7em] sm:text-[1em] font-orbitron p-[1em]">
                WORKOUT
              </h4>
              <span className=" text-white lg:text-[1.2em] sm:text-[0.6em] font-poppins leading-[1em] ">
                Specializing in The class based sessions are challeng ing
                innovative workout ever.
              </span>
            </div>
          </Col>
        </Row>
        <Row className=" lg:pb-0 lg:px-[120px] sm:pt-[200px] sm:pb-0 sm:px-[20px]">
          <Col xs={12} sm={12} md={6} lg={8}>
            <div className="w-[350px]">
              <div className="flex justify-center">
                <img src={strategies} alt="" />
              </div>
              <h4 className="text-center text-white lg:text-[1.7em] sm:text-[1em] font-orbitron p-[1em]">
                STRATEGIES
              </h4>
              <span className=" text-white lg:text-[1.2em] sm:text-[0.6em] font-poppins leading-[1em] ">
                Our yoga trainers will build your perfect body workout ever and
                physique professionals.
              </span>
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={16}>
            <div className="lg:w-[750px] sm:w-[1250px] ">
              <h2 className="font-orbitron lg:text-[55px] sm:text-[25px] sm:text-center text-white ">
                STRATEGIES:WORK OUT. BUILD STRENGTH. STAY ACTIVE & HEALTHY.
              </h2>
              <br />
              <h1 className="font-poppins lg:text-[24px] sm:text-[8px] text-white">
                Share your success with a global community and reach your goals
                with every step.
              </h1>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Brocure;
