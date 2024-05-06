import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import style from '../components/style.module.css'
import FormControl from '@mui/material/FormControl';
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

const  RegisterStep10 = (props) => {

	const options = ["Yes", "No"]
	const {
		state,
		onChangeInput,
	} = props;

	return (
	<>
		<h6 className={`${style.headingTitle} login-heading mb-4`}>Delivery charges</h6>
			<div>
				<FormControl className={style.menuItemCategories}>
				<InputLabel id="demo-multiple-checkbox-label">Do you deliver?</InputLabel>
				<Select
					id="demo-multiple-checkbox-label"
					variant="outlined"
					value={
						state &&
						state.values &&
						state.values.deliveryCharges &&
						state.values.deliveryCharges.isDeliveryCharges ? state.values.deliveryCharges.isDeliveryCharges : "No"}
					input={<OutlinedInput label="Delivery Charges" />}
					onChange={(event) => onChangeInput(event.target.value, "isDeliveryCharges")}
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
				<TextField
					id="outlined-size-small"
					disabled={
						state &&
						state.values &&
						state.values.deliveryCharges &&
						state.values.deliveryCharges.isDeliveryCharges === "No" ? true : false
					}
					value={
						state &&
						state.values &&
						state.values.deliveryCharges &&
						state.values.deliveryCharges.charges ? state.values.deliveryCharges.charges : ""
					}
					label="Delivery Charges"
					className={style.menuItemCategories}
					size="small"
					type="number"
					onChange={(event) => onChangeInput(event.target.value, "charges")}
					InputProps={{
						startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
					}}
				/>
				<p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.charges  ? state.errors.charges : ""}</p>
			</div>
	</>
	);
}

export default RegisterStep10;
