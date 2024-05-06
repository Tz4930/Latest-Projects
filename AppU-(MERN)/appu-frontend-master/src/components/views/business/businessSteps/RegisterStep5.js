import React, { useState } from "react";
import SelectInput from "../components/MultiSelect"
import Categories from "../businessCategories/Categories"
import { Link } from 'react-router-dom';
import style from "../components/style.module.css"

const RegisterStep5 = (props) => {
  const { state, onChangeInput, getCategories } = props;
  const [open, setopen] = useState(false);
  const handleOpen = (value) => {
    console.log('=========', value)
    setopen(value)
  }
  const renderModal = () => {
    if(open) {
      return <Categories open={open} handleOpen={handleOpen} getCategories={getCategories}/>
      }
  }
  return (
    <>  
    <h6 className={`${style.headingTitle} login-heading mb-4`}>Tell us your specialities</h6>
    <p>Awesome! Now let's choose your specialities </p>
    <h6 className={` ${style.headingTitle} login-heading mb-6`}>Specialities</h6>
      <SelectInput state={state} onChangeInput={onChangeInput}/>
      <p style={{color: "red", position: "fixed"}}>{state && state.errors ? state.errors.categories : []}</p>
      {/* <div className="text-center pt-3">
	    Don’t see your category, add it now!
      <Link className="font-weight-bold" to="#" onClick={() => handleOpen(true)}> Add</Link>
	    </div> */}
      {renderModal()}
    </>
  );
};

export default RegisterStep5;
