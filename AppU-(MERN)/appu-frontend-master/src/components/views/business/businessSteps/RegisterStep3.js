import React, { useState, useEffect } from "react";
import TextField from "../components/InputFields"
import style from "../components/style.module.css"
import { Form, Button, Spinner } from 'react-bootstrap';
import { checkBusinessURLAvailability } from "../../../services/Api/Business/index";
import Icofont from "react-icofont";

const RegisterStep3 = (props) => {
  const {
    onChangeInput,
    updateURLKey,
    state
  } = props;
  const [validityState, setValidityState] = useState({
    loading: false,
    isValid: false,
    checkedbutFailed: false,
    value: state && state.values.urlKey ? state.values.urlKey : ''
  });

  // console.log(validityState.value.replace(/^[A-Za-z]/ig,''))
  const onChangeInputLocal = (value) => {
    setValidityState({
      ...validityState,
      isValid: false,
      value: value.replace(/[^0-9a-z]/gi, ''),
    });
    updateURLKey('');
  }

  const checkURLAvailability = async (urlText) => {
    setValidityState({
      ...validityState,
      loading: true,
    });
    const results = await checkBusinessURLAvailability(urlText);
    console.log(urlText);
    if (results.data.status === 200 && !results.data.business) {
      setTimeout(() => {
        setValidityState({
          ...validityState,
          loading: false,
          isValid: true,
          checkedbutFailed: false
        });
      }, 2000);
      updateURLKey(validityState.value);
    } else {
      setTimeout(() => {
        setValidityState({
          ...validityState,
          loading: false,
          isValid: false,
          checkedbutFailed: true
        });
      }, 2000);
    }
  };
  

  return (
    <>
      <h6 className={`${style.headingTitle} login-heading mb-4`}>Description and AppU Address</h6>
      <p>Great! Now let's add a description for your business and your address (URL) on AppU</p>
      <div className="form-label-group">
        <TextField state={state && state.values && state.values.description ? state.values.description : ''} keyVal="description" onChangeInput={onChangeInput} id="inputDescription" placeholder="Business description" type="text" />
        <p className="err">{state && state.errors && state.errors.description ? state.errors.description : ""}</p>
        <Form.Label htmlFor="inputDescription">Business Description</Form.Label>
      </div>
      <div className="form-label-group">
        <TextField state={validityState && validityState.value ? validityState.value : ''} onChangeInput={(val) => onChangeInputLocal(val)} id="inputURL" placeholder="mybusiness." type="text" />
        <div style={{ marginTop: "-30px", marginBottom: "20px", marginLeft: "160px", fontSize: "16px", fontWeight: "bold" }}>.appu.pk</div>
        <p style={{ color: "red", marginTop: "-15px" }}>{state && state.errors && state.errors.urlKey ? state.errors.urlKey : ""}</p>
        <Form.Label htmlFor="inputURL">Business URL</Form.Label>
      </div>
      <Button disabled={(validityState.value === "" ? true : false)} style={{ marginTop: "25px" }} variant="primary" onClick={() => checkURLAvailability(validityState.value)}>
        {validityState && validityState.loading && <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />}
        &nbsp;{validityState && validityState.loading ? "Checking..." : "Check Availability"}
      </Button>
      
      {
      validityState && validityState.isValid ?
        <Icofont style={{ fontSize: "22px", color: "green" }} icon="check-circled" className="ml-3" />
        :validityState && validityState.isValid==false && validityState.value !='' && validityState.checkedbutFailed  ?
        <Icofont style={{ fontSize: "22px", color: "red" }} icon="close-circled" className="ml-3" />
        :''
      }
      
    </>
  );
}

export default RegisterStep3;
