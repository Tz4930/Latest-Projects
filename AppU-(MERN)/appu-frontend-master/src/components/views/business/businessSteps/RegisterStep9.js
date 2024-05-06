import React from "react";
// import TextField from "../components/InputFields"
// import GoogleMap from "../components/GoogleMap";
import { Form } from 'react-bootstrap';
import DeliveryAreaList from "../components/DeliveryAreasList"
import style from "../components/style.module.css"

const RegisterStep9 = (props) => {
    const {
        state,
        handleDeliveryAreas,
        DeleteDeliveryAreas,
    } = props
  return (
    <>
<h6 className={`${style.headingTitle} login-heading mb-4`}>Delivery areas</h6>
{/* <p>Incredible! Now let's add delivery settings. First of all, please enter your delivery areas. You might enter city quarters, whole city name.</p> */}
<p>Coming Soon! We will soon take care of all your delivery hassles.</p>
  {/* <Form>
    <h6 className={style.headingTitle}>Delivery areas</h6>
     <div className="form-label-group">
      <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.deliveryAreas  ? state.errors.deliveryAreas : ""}</p>
      </div>
      {state && state.values && state.values.deliveryAreas.length > 0 ? (
         <DeliveryAreaList state={state && state.values && state.values.deliveryAreas ? state.values.deliveryAreas : []} DeleteDeliveryAreas={DeleteDeliveryAreas}/>
      ): ""}
      </Form> */}
      </>
    );
}

export default RegisterStep9;
