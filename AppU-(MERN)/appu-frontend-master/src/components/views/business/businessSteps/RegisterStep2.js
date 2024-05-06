import React from "react";
import TextField from "../components/InputFields"
import style from "../components/style.module.css"
import { Form } from 'react-bootstrap';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { TimePicker } from "@material-ui/pickers";

const RegisterStep2 = (props) => {
	const {
		onChangeInput,
		state
	} = props
	return (
		<>
			<h6 className={`${style.headingTitle} login-heading mb-4`}>{`Nice to Meet you, ${state && state.values && state.values.firstName ? state.values.firstName : ""}`} </h6>
			<p>Now tell us about your business, What is the name, address and timing of your business?</p>
			<div className="form-label-group">
				<TextField state={state && state.values && state.values.name ? state.values.name : ""} keyVal="name" onChangeInput={onChangeInput} id="inputName" placeholder="Restaurant name" type="text" />
				<p style={{ color: "red" }}>{state && state.errors && state.errors.name ? state.errors.name : ""}</p>
				<Form.Label htmlFor="inputName">Business Name</Form.Label>
			</div>
			<div className="form-label-group">
				<TextField state={state && state.values && state.values.address ? state.values.address : ""} keyVal="address" onChangeInput={onChangeInput} id="inputAddress" placeholder="Address" type="text" />
				<p style={{ color: "red" }}>{state && state.errors && state.errors.address ? state.errors.address : ""}</p>
				<Form.Label htmlFor="inputAddress">Business Address</Form.Label>
			</div>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<div className="form-label-group">

					<TimePicker value={state.values.startTime} label="Opening Time" onChange={(time) => onChangeInput(time, 'startTime')} />
				</div>
				<div className="form-label-group">
					<TimePicker value={state.values.endTime} label="Closing Time" onChange={(time) => onChangeInput(time, 'endTime')} />
				</div>
			</MuiPickersUtilsProvider>
		</>
	);
}

export default RegisterStep2;
