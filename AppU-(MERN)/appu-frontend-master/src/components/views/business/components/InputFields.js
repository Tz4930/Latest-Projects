import React from 'react';
import { Form } from 'react-bootstrap';

const InputFields = (props) => {
	const {
		state,
		onChangeInput,
		keyVal,
	} = props
    	return (
			<Form.Control
			type={props.type}
			value={state}
			onChange={(event) => onChangeInput(event.target.value, keyVal)}
			id={props.id}
			placeholder={props.placeholder}
			/>
    	);
}


export default InputFields;