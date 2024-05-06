import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {Row,Col,Container,Form, Image } from 'react-bootstrap';
import { createAccount } from './services/Api/SignUp'
import "antd/dist/antd.css";
import { notification } from "antd";
import { registerValidation } from './validations'
// import HomeIcon from '@mui/icons-material/Home';

const  Register = () =>  {
	const history = useHistory()
	const [state, setState] = useState({
		values: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		errors: {
			password: '',
			email: '',
			confirmPassword: '',
		}
	})
	const onChangeInput = (value, key) => {
        setState((prevState) => ({
          ...prevState,
          values: {
            ...prevState.values,
            [key]: value,
          },
          errors: {
            ...prevState.errors,
            [key]: "",
          },
        }));
     };

	   // Handle validation 
	   const handleValidation = async () => { 
		const results = await registerValidation(state.values)
		if(results.errors) {
		if (Object.keys(results.errors).filter((item) => results.errors[item]).length > 0) {
		  setState((prevState) => ({
			...prevState,
			errors: {
			  ...prevState.errors,
			  ...results.errors,
			},
		  }));
		}
		}
		return results.isValid
	  }
	  const handleNotification = (value, message, success) => {
		notification[value]({
		  message: success,
		  description: message,
		});
	  };

	 // Create Menu Items
	 const signUp = async () => {
		if (!await handleValidation()) return;
		const results = await createAccount({
		  email: state.values.email ? state.values.email : "null",
		  password: state.values.password,
		})
		if(results.data.status === 200) {
		  setState((prevState) => ({
			...prevState,
			  values: {
				email: "",
				password: "",
				confirmPassword: "",
			},
		  }));
		  localStorage.removeItem('state')
		  localStorage.setItem('user', JSON.stringify(results.data.user))
		//   localStorage.setItem('userToken', JSON.stringify(results.data.access.token))
		  history.push("/register/business")
		} else if (results.data.status === 400) {
			let message = results.data.msg;
           let success = results.data.success;
          handleNotification("error", message, success);
		}
	  }
	
    	return (
    	  <Container fluid className='bg-white'>
	         <Row>
			 <Col style={{paddingLeft: "0px", paddingRight: "0px"}} md={4} lg={6} className="d-none d-md-flex">
				 <Image src="/img/bgimage.png" style={{height: "100vh", overflowY: "hidden"}} fluid />
				 </Col>
	            <Col md={8} lg={6}>
				{/* <Link to="/" style={{float: "right", marginTop: "5px", fontWeight: "900", color: "black"}}><HomeIcon /></Link> */}
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Create Account!</h3>
	                           <Form>
							     {/* <div className="form-label-group">
	                                 <Form.Control value={state && state.values && state.values.name ? state.values.name : ''} onChange={(event) => onChangeInput(event.target.value, "name")} type="text" id="inputName" placeholder="Name" />
	                                 <Form.Label htmlFor="inputName">Name</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.name ? state.errors.name : ""}</p>
	                              </div> */}
	                              <div className="form-label-group">
	                                 <Form.Control value={state && state.values && state.values.email ? state.values.email : ''} onChange={(event) => onChangeInput(event.target.value, "email")} type="email" id="inputEmail" placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail">Email address</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.email  ? state.errors.email : ""}</p>
	                              </div>
	                              <div className="form-label-group">
	                                 <Form.Control value={state && state.values && state.values.password ? state.values.password : ''} onChange={(event) => onChangeInput(event.target.value, "password")} type="password" id="inputPassword" placeholder="Password" />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.password  ? state.errors.password : ""}</p>
	                              </div>
	                              <div className="form-label-group mb-4">
	                                 <Form.Control value={state && state.values && state.values.confirmPassword ? state.values.confirmPassword : ''} onChange={(event) => onChangeInput(event.target.value, "confirmPassword")} type="password" id="inputPromo" placeholder="Conform Password" />
	                                 <Form.Label htmlFor="inputPromo">Confirm Password</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.confirmPassword ? state.errors.confirmPassword : ""}</p>
	                              </div>
								  {/* <div className="form-label-group mb-4">
								  <OverlayTrigger
									overlay={
										<Tooltip id='my-tooltip-id'>
										whatsApp Number
										</Tooltip>
									}
									>
									<Form.Control value={state && state.values && state.values.whatsAppNumber ? state.values.whatsAppNumber : ''} onChange={(event) => onChangeInput(event.target.value, "whatsAppNumber")} type="text" id="inputWhatsApp" placeholder="WhatsApp Number" />
									</OverlayTrigger>
	                                 <Form.Label htmlFor="inputWhatsApp">WhatsApp Number</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.whatsAppNumber ? state.errors.whatsAppNumber : ""}</p>
	                              </div> */}
	                              <Link to="#" onClick={() => signUp()} className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign Up</Link>
	                              <div className="text-center pt-3">
	                                 Already have an account? <Link className="font-weight-bold" to="/login">Sign In</Link>
	                              </div>
	                           </Form>
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
}


export default Register;