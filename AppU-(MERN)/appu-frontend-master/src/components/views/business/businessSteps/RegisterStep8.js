import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import style from "../components/style.module.css"

const RegisterStep8 = (props) => {
  const {
    state,
    onChangeInput,
  } = props
  return (
    <>
    <h6 className={`${style.headingTitle} login-heading mb-4`}>AppU Discount</h6>
		<TextField
			id="outlined-size-small"
			value={
				state &&
				state.values &&
				state.values.appuDiscount ? state.values.appuDiscount : 0
			}
			label="Discount"
			className={style.menuItemCategories}
			size="small"
			type="number"
			onChange={(event) => onChangeInput(event.target.value, "appuDiscount")}
			InputProps={{
				endAdornment: <InputAdornment position="start">%</InputAdornment>,
			}}
		/>
    <h6 className={` ${style.headingLabel} login-heading mb-4`} style={{marginTop: "30px"}}>{"Do you offer delivery services or only pickup ?"}</h6>
    <p>Incredible! Now, please select your delivery or pick up.</p>
    {/* <h6 className={`${style.headingTitle} login-heading mb-4`}>{"Delivery or pick up"}</h6> */}
    <FormGroup>
      <FormControlLabel control={
      <Checkbox 
        checked={state && state.values && state.values.deliveryOrPickup && state.values.deliveryOrPickup.delivery ? true : false}
        onChange={(event) => onChangeInput(event.target.checked, "delivery")} 
      />
      } 
        label="Delivery" 
      />
      <FormControlLabel control={
      <Checkbox
      checked={state && state.values && state.values.deliveryOrPickup && state.values.deliveryOrPickup.pickUp ? true : false}
        onChange={(event) => onChangeInput(event.target.checked, "pickUp")}
      />}
        label="Pick up" />
    </FormGroup>
    </>
  );
}

export default RegisterStep8;
