import React, { useState, useEffect } from 'react'
import BusinessTable from './BusinessTable';
import "antd/dist/antd.css";
import { notification } from "antd";
import Modal from './Modal'
import {
  getBusinessCategories,
} from "../../../services/Api/businessCategories";
import { getBusinessByUserId,updateBusines } from "../../../services/Api/Business";
import {
  getMenuItemCategories,

} from "../../../services/Api/MenuItem/index";
import { businessProfileValidation } from "../../../validations/index"

const BusinessCategories = (props) => {

  const user = JSON.parse(localStorage.getItem('user'))

  const [getvalue, setGetvalue] = useState({ 
    businesslist: []
  })
 
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    values: {
      firstName:"",
      lastName:"",
      name: "",
      description: "",
      address:"",
      whatsAppNumber :"",
      image: "N/A",
      isActive: true,
    },
    errors: {
      firstName:"",
      lastName:"",
      name: "",
      description: "",
      address:"",
      whatsAppNumber :"",
      image: "",
    },
    categoriesList: [],
    isUpdate: false,
    errorMessage: "",
  })
  

  const getData = async () => {
    const business = await getBusinessByUserId(user.id) 
    setGetvalue(business.data.business)
  }
  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (props.open) {
      setOpen(true)
    }
  }, [props.open])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      values: {
        firstName:"",
        lastName:"",
        name: "",
        description: "",
        address:"",
        whatsAppNumber :"",
        image: "N/A",
        isActive: true,
      },
      errors: {
        firstName:"",
        lastName:"",
        name: "",
        description: "",
        address:"",
        whatsAppNumber :"",
        image: "",
      },
      isUpdate: false
    }));
    setOpen(false);
    if (props && props.handleOpen) {
      props.handleOpen(false)
    }
  };

    // Handle Notification
    const handleNotification = (value, message, success) => {
      notification[value]({
        message: success,
        description: message,
        placement: "bottomRight"
      });
    };

  // set State for update profile 
  const handleUpdateState = () => {
    handleClickOpen()
    setState((prevState) => ({
      ...prevState,
      values: getvalue,
      isUpdate: true
    }));

  }

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
    const results = await businessProfileValidation(state.values)
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


  const updateBusiness = async (item) => {
    if (!await handleValidation()) return;
    const results = await updateBusines(
     
      {
        id: getvalue.id,
      },
    {
      firstName:state.values.firstName,
      lastName:state.values.lastName,
      name: state.values.name,
      description: state.values.description,
      address:state.values.address,
      whatsAppNumber :state.values.whatsAppNumber,
      image: state.values.image,
     }
    )
    if(results.data.status === 200) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
      handleClose()
    } else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
    }
    handleClose()
    getData()
  }
  return (
    <>
     <Modal 
          handleClose={handleClose}
          open={open} 
          state={state} 
          getvalue={getvalue}
          onChangeInput={onChangeInput}
          // createMenuItemCategory={createMenuItemCategory}
          updateBusiness={updateBusiness}
          
          />
        <BusinessTable 
          handleClickOpen={handleClickOpen}
          getvalue={getvalue}
          handleUpdateState={handleUpdateState}
        />
    </>
  )
}

export default BusinessCategories