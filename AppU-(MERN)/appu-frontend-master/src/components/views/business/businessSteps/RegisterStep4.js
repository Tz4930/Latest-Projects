import React from "react";
import style from "../components/style.module.css"
import MuiWhatsAppNumber from "./MuiWhatsAppNumber";

const RegisterStep4 = (props) => {
  const {
    state,
    onChangeInput,
  } = props
  return (
    <>
<h6 className={`${style.headingTitle} login-heading mb-4`}>WhatsApp Number</h6>
<p>Great! Now let's add whatsapp number for business. Orders created on your AppU page will be sent to this whatsapp number.</p>
	{/* <Form> */}
  <h6 className={` ${style.headingTitle} login-heading mb-6`}>WhatsApp Number</h6>
     <div className="form-placeholder-group login-heading mb-6">
     <MuiWhatsAppNumber onChangeInput={onChangeInput} state={state} />
     {/* <Form.Label htmlFor="whatsAppNumber">WhatsApp Number</Form.Label>
      <TextField state={state && state.values &&  state.values.whatsAppNumber ? state.values.whatsAppNumber : ""} keyVal="whatsAppNumber" onChangeInput={onChangeInput} id="whatsAppNumber" placeholder="03455500253" type="text"/> */}
      <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.whatsAppNumber ? state.errors.whatsAppNumber : ""}</p>
      </div>
      {/* </Form> */}
      </>
    );
}

export default RegisterStep4;
