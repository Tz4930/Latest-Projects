import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import style from "../components/style.module.css"
import "antd/dist/antd.css";
import { useHistory } from 'react-router-dom';
import { notification } from "antd";
import moment from 'moment';
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";
import RegisterStep4 from "./RegisterStep4";
import RegisterStep5 from "./RegisterStep5";
import RegisterStep6 from "./RegisterStep6";
import RegisterStep7 from "./RegisterStep7";
import RegisterStep8 from "./RegisterStep8";
import RegisterStep9 from "./RegisterStep9";
import RegisterStep10 from "./RegisterStep10";
import RegisterStep11 from "./RegisterStep11";
import ReqisterStep12 from "./RegisterStep12";
import ProgressBar from "../components/ProgressBar";
import {
  registerBusinees,
  getCategoriesList,
  uploadCoverImage,
} from "../../../services/Api/Business";

const FormData = require("form-data");

const Register = () => {
  const history = useHistory()
  const businessData = JSON.parse(localStorage.getItem('state'));
  const user = JSON.parse(localStorage.getItem('user'));
  const [state, setState] = useState({
    values: {
      firstName: "",
      lastName: "",
      name: "",
      address: "",
      urlKey: "",
      startTime: undefined,
      endTime: undefined,
      appuDiscount: 0,
      description: "",
      whatsAppNumber: "",
      categories: [],
      image: "N/A",
      location: {
        address: "",
        lat: "",
        lng: ""
      },
      deliveryOrPickup: {
        delivery: true,
        pickUp: false
      },
      deliveryAreas: [],
      freeDeliveryCharges: {
        isFreeDeliveryCharges: "No",
        amount: ""
      },
      deliveryCharges: {
        isDeliveryCharges: "No",
        charges: ""
      }
    },
    errors: {
      firstName: "",
      lastName: "",
      name: "",
      address: "",
      description: "",
      urlKey: "",
      whatsAppNumber: "",
      categories: [],
      image: "",
      location: "",
      deliveryAreas: "",
      freeDeliveryCharges: "",
      deliveryCharges: ""
    },
    categoriesList: [],
    step: 9.7,
    count: 1,
    color: "",
    businessStep: 1,
    selectedImage: undefined,
    skipFlag: false,
  });
  useEffect(() => {
    if(state.businessStep !== 12) {
      localStorage.setItem('state', JSON.stringify(state));
    }
  }, [state])
  useEffect(() => {
    if(state.businessStep !== 12) {
      setState((prevState) =>({
        ...prevState,
        ...businessData
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if(!user) {
      history.push('/')
    }
    getCategories();
  }, [])
  const nextStep = (e, key) => {
    e.preventDefault();
    if (state.businessStep === 1) {
      if (key === "skip") {
        setState((prevState) => ({
          ...prevState,
          step: state.step + 9,
          count: state.count + 1,
          businessStep: state.businessStep + 1,
          color: "success",
        }));
      } else {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
        color: "success",
      }));
    }
    } else if (state.businessStep === 2) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
        color: "success",
      }));
    } else if (state.businessStep === 3) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
        color: "success",
      }));
    } else if (state.businessStep === 4) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
        color: "success",
      }));
    } else if (state.businessStep === 5) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
        color: "success",
      }));
    } else if (state.businessStep === 6) {
       if (key === "skip") {
        setState((prevState) => ({
          ...prevState,
          step: state.step + 9,
          count: state.count + 1,
          businessStep: state.businessStep + 1,
        }));
      } else {
        if (!handleValidation()) return;
        setState((prevState) => ({
          ...prevState,
          step: state.step + 9,
          count: state.count + 1,
          businessStep: state.businessStep + 1,
        }));
      }
    } else if (state.businessStep === 7) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
      }));
    } else if (state.businessStep === 8) {
      if(key === "next" &&
       state && state.values &&
       state.values.deliveryOrPickup &&
       state.values.deliveryOrPickup.delivery !== true
      ) {
        createBusiness("skipAllNextStep")
      } else if (key === "next" &&
       state && state.values &&
       state.values.deliveryOrPickup &&
       state.values.deliveryOrPickup.delivery === true
      ) {
        setState((prevState) => ({
          ...prevState,
          step: state.step + 9,
          count: state.count + 1,
          businessStep: state.businessStep + 1,
        }));
      }
    } else if (state.businessStep === 9) {
      if (!handleValidation()) return;
      setState((prevState) => ({
        ...prevState,
        step: state.step + 9,
        count: state.count + 1,
        businessStep: state.businessStep + 1,
      }));
    } else if (state.businessStep === 10) {
      if(key === "next" &&
      state.values && 
        state.values.deliveryCharges &&
        state && state.values.deliveryCharges.isDeliveryCharges === "Yes") {
        if (!handleValidation()) return;
        setState((prevState) => ({
          ...prevState,
          step: state.step + 9,
          count: state.count + 1,
          businessStep: state.businessStep + 1,
        }));
      } else if (key === "next" && state.values.deliveryCharges.isDeliveryCharges === "No") {
          createBusiness("skip");
        }
    } else if (state.businessStep === 11) {
      if(key === "skip" &&
      state.values.freeDeliveryCharges.isFreeDeliveryCharges !== "Yes"
     ) {
      createBusiness("skiplast");
     } else if(key === "next" && state.values && 
     state.values.deliveryCharges &&
     state.values.freeDeliveryCharges.isFreeDeliveryCharges === "Yes") {
      if (!handleValidation()) return;
      createBusiness("next");
     }
     else if(key === "next" && state.values && 
     state.values.deliveryCharges &&
     state.values.freeDeliveryCharges.isFreeDeliveryCharges === "No") {
      createBusiness("next");
     }
    }
    // if ((key === "next" && state.businessStep !== 10) ||  (state.values.deliveryCharges.isDeliveryCharges !== "No" || state.values.freeDeliveryCharges.isFreeDeliveryCharges !== "No")) {
    //   setState((prevState) => ({
    //     ...prevState,
    //     step: state.step + 10.13,
    //     count: state.count + 1,
    //     businessStep: state.businessStep + 1,
    //     color: "success",
    //   }));
    // }
  };
  const backStep = () => {
    if (state.businessStep !== 1) {
      setState((prevState) => ({
        ...prevState,
        step: state.step - 9,
        count: state.count - 1,
        businessStep: state.businessStep - 1,
      }));
    }
  };

  const handleFineshStep = () => {
    localStorage.setItem('businessStep', JSON.stringify(1))
    localStorage.removeItem('state');
  }

  const onChangeInput = (value, key) => {
   if (key === "categories") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [key]: typeof value === "string" ? value.split(",") : value,
        },
        errors: {
          ...prevState.errors,
          [key]: "",
        },
      }));
    } else if(key === "delivery" || key === "pickUp") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          deliveryOrPickup: {
            ...prevState.values.deliveryOrPickup,
            [key]: value
          }
        },
        errors: {
          ...prevState.errors,
            [key]: ""
        },
       
      }));
    } else if(key === "isFreeDeliveryCharges" || key === "amount") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          freeDeliveryCharges: {
            ...prevState.values.freeDeliveryCharges,
            [key]: value
          }
        },
        errors: {
          ...prevState.errors,
          [key]: ""
        },
      }));
    } else if(key === "isDeliveryCharges" || key === "charges") {
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          deliveryCharges: {
            ...prevState.values.deliveryCharges,
            [key]: value
          }
        },
        errors: {
          ...prevState.errors,
            [key]: ""
        },
       
      }));
    } else {
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
    }
  };
  // handle set Delivery Areas
  const handleDeliveryAreas = (value, key) => {
    let options = state.values && state.values.deliveryAreas ? state.values.deliveryAreas : [];
      options.push(value);
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [key]: options,
        },
        errors: {
          ...prevState.errors,
          [key]: "",
        },
      }));
  }
  // delete Delivery Areas
  const DeleteDeliveryAreas = (value, key) => {
    let index;
    let options = state.values && state.values.deliveryAreas ? state.values.deliveryAreas : [];
    index = options.indexOf(value);
      options.splice(index, 1);
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          [key]: options,
        },
        errors: {
          ...prevState.errors,
          [key]: "",
        },
      }));
  }
  // handle set Image
  const handleCoverImage = (value, key) => {
    uploadImage(value)
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  // Notification
  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
    });
  };
  // Validation business form
  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (state.businessStep === 1) {
      if (!state.values["firstName"]) {
        formIsValid = false;
        errors["firstName"] = "*Field is required";
      }
      
    } else if (state.businessStep === 2) {
      if (!state.values["name"]) {
        formIsValid = false;
        errors["name"] = "*Field is required";
      }
      if (!state.values["address"]) {
        formIsValid = false;
        errors["address"] = "*Field is required";
      }
    } else if (state.businessStep === 3) {
      if (!state.values["description"]) {
        formIsValid = false;
        errors["description"] = "*Field is required";
      }
      if (!state.values["urlKey"]) {
        formIsValid = false;
        errors["urlKey"] = "*Field is required";
      }
      
    } else if (state.businessStep === 4) {
      if (!state.values["whatsAppNumber"]) {
        formIsValid = false;
        errors["whatsAppNumber"] = "*Field is required ";
      } 
      else if (typeof state.values["whatsAppNumber"] !== "undefined") {
        var pattern = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
        console.log('=============', pattern)
        // if (!pattern.test(state.values["whatsAppNumber"])) {
        //   formIsValid = false;
        //   errors["whatsAppNumber"] = "Please enter only number.";
        // } 
        if (state.values["whatsAppNumber"].length !== 12) {
          formIsValid = false;
          errors["whatsAppNumber"] = "Please enter valid 11 digits of phone number .";
        }
      }
    } else if (state.businessStep === 5) {
      if (state.values.categories.length === 0) {
        formIsValid = false;
        errors["categories"] = "*Field is required";
      }
    } 
    else if (state.businessStep === 6) {
      if (state.values.image === "N/A") {
        formIsValid = false;
        errors["image"] = "*Image is required";
      }
    }
     else if (state.businessStep === 7) {
      if (!state.values.location) {
        formIsValid = false;
        errors["location"] = "*Field is required";
      }
    } else if (state.businessStep === 9) {
      // if (
      //   state.values.deliveryAreas.length === 0
      // ) {
      //   formIsValid = false;
      //   errors["deliveryAreas"] = "*Field is required";
      // }
    } else if (state.businessStep === 10) {
      if (state && state.values.deliveryCharges) {
        let errorVariation = { charges: "" };
        if (state && state.values && state.values.deliveryCharges.charges === "") {
          formIsValid = false;
          errorVariation.charges = "*Field Is Required";
        }
        errors = errorVariation
    }
    }
    else if (state.businessStep === 11) {
      if (state && state.values.freeDeliveryCharges.isFreeDeliveryCharges === 'Yes') {
        let errorVariation = { amount: "" };
        if (state && state.values && state.values.freeDeliveryCharges.amount === "") {
          formIsValid = false;
          errorVariation.amount = "*Field Is Required";
        }
        errors = errorVariation
    }
    }
    
    // else if (state.businessStep === 9) {
    //   if (
    //     state.values &&
    //     state.values.deliveryCharges &&
    //     state.values.deliveryCharges.charges === ""
    //   ) {
    //     formIsValid = false;
    //     errors["deliveryCharges"] = "*Field is required";
    //   }
    // } else if (state.businessStep === 10) {
    //   if (
    //     state.values &&
    //     state.values.freeDeliveryCharges &&
    //     state.values.freeDeliveryCharges.amount === ""
    //   ) {
    //     formIsValid = false;
    //     errors["freeDeliveryCharges"] = "*Field is required";
    //   }
    // }
    if (Object.keys(errors).filter((item) => errors[item]).length > 0) {
      formIsValid = false;
      setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          ...errors,
        },
      }));
    }
    return formIsValid;
  };

  // get Categories
  const getCategories = async () => {
    const result = await getCategoriesList();
    setState((prevState) => ({
      ...prevState,
      categoriesList: result.data.result.results,
    }));
  };
  // get City Areas
  // register Business
  const   createBusiness = async (val) => {
    const result = await registerBusinees(
      user.id,
      {
      firstName: state.values.firstName,
      lastName: state.values.lastName,
      name: state.values.name,
      address: state.values.address,
      startTime: moment(state.values.startTime).format('hh:mm a'),
      endTime: moment(state.values.endTime).format('hh:mm a'),
      urlKey: state.values.urlKey,
      appuDiscount: state.values.appuDiscount,
      description: state.values.description,
      whatsAppNumber: state.values.whatsAppNumber,
      categories: state.values.categories,
      image: state.values.image ? state.values.image : "N/A",
      location: state.values.location,
      deliveryOrPickup: state.values.deliveryOrPickup,
      deliveryAreas: state.values.deliveryAreas,
      deliveryCharges: state.values.deliveryCharges,
      freeDeliveryCharges: state.values.freeDeliveryCharges,
      created_By: user.id
    });
    if (result.data.status === 200) {
      if(val === "skip") {
        setState((prevState) => ({
          ...prevState,
          businessStep: state.businessStep + 2,
        }));
      } else if (val === "skipAllNextStep") {
        setState((prevState) => ({
          ...prevState,
          businessStep: 12,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          businessStep: state.businessStep + 1,
        }));
      }
      localStorage.setItem('data', JSON.stringify(result.data.business))
    } else if (result.data.status === 400) {
      let message = result.data.msg;
      let success = result.data.success;
      handleNotification("error", message, success);
    }
  };
  // Upload cover Image
  const uploadImage = async (selectedImage) => {
    const fileToUpload = selectedImage;
    const formData = new FormData();
    formData.append("urlKey", state.values.urlKey);
    formData.append("file", fileToUpload);
    const result = await uploadCoverImage(formData);
    console.log(result);
    if (result.data.status === 200) {
      let message = result.data.message;
      let success = result.data.success;
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
        values: {
          ...prevState.values,
          image: result.data.data,
        },
        errors: {
          ...prevState.errors,
          image: "",
        },
      }));
    }
  };

  const updateURLKey = (urlKey) => {
    setState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        urlKey: urlKey,
      },
      errors: {
        ...prevState.errors,
        urlKey: urlKey ==='' ? '' : "",
      },
    }));
  }

  const renderComponents = () => {
    if (state.businessStep === 1) {
      return <RegisterStep1 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 2) {
      return <RegisterStep2 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 3) {
      return <RegisterStep3 state={state} onChangeInput={onChangeInput} updateURLKey={updateURLKey}/>;
    } else if (state.businessStep === 4) {
      return <RegisterStep4 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 5) {
      return <RegisterStep5 state={state} onChangeInput={onChangeInput} getCategories={getCategories} />;
    } else if (state.businessStep === 6) {
      return (
        <RegisterStep6
          state={state}
          handleCoverImage={handleCoverImage}
          uploadImage={uploadImage}
        />
      );
    } else if (state.businessStep === 7) {
      return <RegisterStep7 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 8) {
      return <RegisterStep8 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 9) {
      return <RegisterStep9 state={state}  handleDeliveryAreas={handleDeliveryAreas} DeleteDeliveryAreas={DeleteDeliveryAreas} />
    }
    else if (state.businessStep === 10) {
      return <RegisterStep10 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 11) {
      return <RegisterStep11 state={state} onChangeInput={onChangeInput} />;
    } else if (state.businessStep === 12) {
      return <ReqisterStep12 state={state} handleFineshStep={handleFineshStep}/>
    }
  };
  return (
    <>
      <Container fluid className="bg-white">
        <Row>
          <Col style={{paddingLeft: "0px", paddingRight: "0px"}} md={4} lg={6} className="d-none d-md-flex">
          <Image src="/img/bgimage.png" style={{height: "100vh", overflowY: "hidden"}} fluid />
          </Col>
          <Col md={8} lg={6}>
            <div className="login align-items-center py-5">
              <form autoComplete="off" onSubmit={(e) => nextStep(e, "next")}>
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <div className="py-5">
                      {state.businessStep !== 12 ? (
                        <>
                          <img src="./img/appulogo.jpeg" style={{width: "120px", marginLeft:"-25px"}}/>
                          <ProgressBar state={state} />
                          <div className="py-2">
                          <h6 className="pull-right">{`${state && state.count ? state.count : 1} of 11`}</h6>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    {renderComponents()}
                  </Col>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <div>
                      <div className="text-center py-4">
                          <>
                          {
                            state.businessStep !== 12 && state.businessStep !== 1 ? (
                              <Button
                             className="pull-left"
                             onClick={() => backStep()}
                             variant="secondary"
                           >
                             Back
                           </Button>
                            ): ""
                          }
                            {state.businessStep !== 12 ? (
                              <>
                            <div>
                            <Button
                              className="pull-right"
                              variant="success"
                              type="submit"
                            >
                              Next
                            </Button>
                            </div>
                            </>
                            ) : (
                              ""
                            )}
                            {/* {businessStep === 10 ? (
                              <Link to="/dashboard">
                              <Button 
                              className="pull-right"
                              variant="success"
                              onClick={handleFineshStep}
                              >
                                Finish
                              </Button>
                              </Link>
                            ): ""} */}
                            { state.businessStep === 1 || state.businessStep === 6 || state.businessStep === 10 || state.businessStep === 11 ? (
                              <div style={{marginRight: "70px"}}>
                              <Button
                                className="pull-right"
                                onClick={(e) => nextStep(e, "skip")}
                                variant="warning"
                              >
                                Skip
                              </Button>
                              </div>
                            ): ""}
                          </>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
