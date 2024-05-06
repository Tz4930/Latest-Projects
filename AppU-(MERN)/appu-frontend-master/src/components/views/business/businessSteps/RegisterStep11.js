import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import style from '../components/style.module.css'
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 20;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 360,
    },
  },
};


const  RegisterStep11 = (props) => {
  const options = ["Yes", "No"]
 const {
     state,
     onChangeInput,
 } = props
  return (
    <>
    <h6 className={`${style.headingTitle} login-heading mb-4`}>Free Delivery after X amount</h6>
    <p>Cool! You can also incentivise your customers to make bigger orders by offering them free delivery if they order for more than a certain amount. Would you like to do that? </p>
    <h6 className={` ${style.headingLabel} login-heading mb-4`}>Free Delivery after X amount?</h6>
    <div>
      <FormControl className={style.menuItemCategories}>
      <InputLabel id="demo-multiple-checkbox-label">Free Delivery</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox-label"
          variant="outlined"
          value={state && state.values && state.values.freeDeliveryCharges && state.values.freeDeliveryCharges.isFreeDeliveryCharges ? state.values.freeDeliveryCharges.isFreeDeliveryCharges : "No"}
          input={<OutlinedInput label="Free Delivery" />}
          onChange={(event) => onChangeInput(event.target.value, "isFreeDeliveryCharges")}
          MenuProps={MenuProps}
        > 
         {
           options.map((item, index) => (
            <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
          ))
        }
        </Select>
      </FormControl>
    </div>
    <div className="login-heading mb-4" style={{marginTop: "30px"}}>
    <h6 className={style.headingLabel}>Free Delivery After</h6>
      <TextField
          id="outlined-size-small"
          disabled={state && state.values && state.values.freeDeliveryCharges && state.values.freeDeliveryCharges.isFreeDeliveryCharges === "No" ? true : false}
          value={
            state && state.values && state.values.freeDeliveryCharges && state.values.freeDeliveryCharges && state.values.freeDeliveryCharges.amount ? state.values.freeDeliveryCharges.amount : ""
          }
          label="Amount"
          className={style.menuItemCategories}
          size="small"
          type="number"
          onChange={(event) => onChangeInput(event.target.value, "amount")}
          InputProps={{
            startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
          }}
        />
         <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.amount  ? state.errors.amount : ""}</p>
      </div>
    </>
  );
}

export default RegisterStep11;
