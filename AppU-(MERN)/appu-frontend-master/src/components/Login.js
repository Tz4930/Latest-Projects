import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { userLogin } from './services/Api/SignUp'
import { getBusinessByUserId } from './services/Api/Business'
import "antd/dist/antd.css";
import { notification } from "antd";
import { loginValidation } from './validations'
import {
	Row,
	Col,
	Container,
	Form,
	Image,
	Button
} from 'react-bootstrap';
// import FontAwesome from './common/FontAwesome';

const Login = () => {
	const history = useHistory()
	const [state, setState] = useState({
		values: {
			email: '',
			password: '',
		},
		errors: {
			// name: '',
			password: '',
			email: '',
			confirmPassword: '',
			// whatsAppNumber: '',
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
		const results = await loginValidation(state.values)
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
	 const SignIn = async (e) => {
		 if(e) {
			 e.preventDefault();
		 }
		if (!await handleValidation()) return;
		const results = await userLogin({
		  email: state.values.email,
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
		  const business = await getBusinessByUserId(results.data.user.id)
		  if(business && business.data && business.data.business && business.data.business.id) {
			localStorage.setItem('user', JSON.stringify(results.data.user))
			history.push('/dashboard')
		  } else {
			history.push("/register/business")
		  }
		//   localStorage.setItem('userToken', JSON.stringify(results.data.access.token))
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
	               <div className="login d-flex align-items-center py-5">
	                  <Container>
	                     <Row>
	                        <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
	                           <h3 className="login-heading mb-4">Login</h3>
	                           <form onSubmit={(e) => SignIn(e)}>
	                              <div className="form-label-group">
	                                 <Form.Control value={state && state.values && state.values.email ? state.values.email : ''} onChange={(event) => onChangeInput(event.target.value, "email")} type="email" id="inputEmail" placeholder="Email address" />
	                                 <Form.Label htmlFor="inputEmail">Email address</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.email  ? state.errors.email : ""}</p>
	                              </div>
	                              <div className="form-label-group mb-4">
	                                 <Form.Control value={state && state.values && state.values.password ? state.values.password : ''} onChange={(event) => onChangeInput(event.target.value, "password")} type="password" id="inputPassword" placeholder="Password" />
	                                 <Form.Label htmlFor="inputPassword">Password</Form.Label>
									 <p style={{color: "red", position: "fixed"}}>{state && state.errors && state.errors.password  ? state.errors.password : ""}</p>
	                              </div>
	                              {/* <Form.Check  
	                              	className='mb-3'
							        custom
							        type="checkbox"
							        id="custom-checkbox"
							        label="Remember password"
							      /> */}
	                              <Button type="submit" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign In</Button>
	                              <div className="text-center pt-3">
	                                 Don’t have an account? <Link className="font-weight-bold" to="/register">Sign Up</Link>
	                              </div>
		                           <hr className="my-4" />
		                           {/* <p className="text-center">LOGIN WITH</p>
		                           <div className="row">
		                              <div className="col pr-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="google" className="mr-2" /> Google</Button>
		                              </div>
		                              <div className="col pl-2">
		                                 <Button className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase" type="submit"><FontAwesome icon="facebook" className="mr-2" /> Facebook</Button>
		                              </div>
		                           </div> */}
	                           </form>
	                        </Col>
	                     </Row>
	                  </Container>
	               </div>
	            </Col>
	         </Row>
	      </Container>
    	);
}


export default Login;