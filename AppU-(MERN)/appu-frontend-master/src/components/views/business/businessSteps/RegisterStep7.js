import React from "react";
// import TextField from "../components/InputFields"
import MyGoogleMap from "../components/MyGoogleMap";
import { Form } from 'react-bootstrap';
import style from "../components/style.module.css"

const RegisterStep7 = (props) => {
    const {
        state,
        onChangeInput,
    } = props
  return (
    <>
<h6 className={`${style.headingTitle} login-heading mb-4`}>Choose Location</h6>
<p>Fabulous! Please select where you are located</p>
     <div className="form-label-group">
      {/* <GoogleMap id="location" locationKey="location" onChangeInput={onChangeInput} stateLocation={state && state.values && state.values.location ? state.values.location.address : "" }/> */}
      <div class="main-wrapper">
        <MyGoogleMap onChangeInput={onChangeInput}/>
      </div>
      <p style={{color: "red", position: "fixed"}}>{state && state.errors ? state.errors.location : ""}</p>
      </div>
      </>
    );
}

export default RegisterStep7;
