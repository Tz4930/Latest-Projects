import React from "react";
import TextField from "../components/InputFields"
import style from "../components/style.module.css"
import { Form } from 'react-bootstrap';

const RegisterStep1 = (props) => {
  const {
    onChangeInput,
    state
  } = props
  return (
    <>
    <h6 className={`${style.headingTitle} login-heading mb-4`}>Welcome to AppU!</h6>
    <p>Let's start with setting up your page! It takes about 5 minutes. First things first, what is your name?</p>

     <div className="form-label-group">
      <TextField state={state && state.values && state.values.firstName ? state.values.firstName : ""} keyVal="firstName" onChangeInput={onChangeInput} id="inputFirstName" placeholder="Enter first name" type="text"/>
      <p style={{color: "red",}}>{state && state.errors ? state.errors.firstName : ""}</p>
      <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
      </div>
      <div className="form-label-group">
      <TextField state={state && state.values && state.values.lastName ? state.values.lastName : ""} keyVal="lastName" onChangeInput={onChangeInput} id="inputLastName" placeholder="Enter Last name" type="text"/>
      <p style={{color: "red",}}>{state && state.errors ? state.errors.lastName : ""}</p>
      <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
      </div>
      </>
    );
}

export default RegisterStep1;
