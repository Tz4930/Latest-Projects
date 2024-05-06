import React from "react";
import {Link} from 'react-router-dom';
import {Container, Form, Button } from 'react-bootstrap';
import style from "../components/style.module.css"

const RegisterStep12 = (props) => {
  const {
    handleFineshStep
  } = props
  return (
    <>
	<Form>
      <Container  className={style.boxStep10}>
      <div>
      <h3 className={`${style.headingTitle} login-heading mb-4`}>Good Job</h3>
      <h3 className={`${style.headingTitle} login-heading mb-4`}>Congratuations to You!!!</h3>
      <h6 className={style.paragrahpSuccess}>Hurray, you successfully completed all the settings!
        Well done! You are steps away from recevibg your first AppU order. All you have to do now is to create your mneu, and share your AppU page link with your customers. Good luck!</h6>
      <Link to="/dashboard">
      <Button 
      className="pull-right"
      variant="success"
      onClick={handleFineshStep}>Go to My Dashboard</Button>
      </Link>
      </div>
      </Container>
      </Form>
      </>
    );
}

export default RegisterStep12;
