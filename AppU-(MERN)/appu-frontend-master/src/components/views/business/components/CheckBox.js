import React from 'react';
import { Form } from 'react-bootstrap';

const InputFields = (props) => {
   const {
     state,
     onChangeInput,
   } = props
    	return (
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type={props.type} checked={state}  onChange={(event) => onChangeInput(event.target.checked, props.keyVal)} label={props.label} />
          </Form.Group>
    	);
}


export default InputFields;