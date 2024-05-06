import React, { useState, useEffect } from 'react'
import CategoriesTable from './BusinessTable';
import Modal from './Modal'
import "antd/dist/antd.css";
import { notification } from "antd";

import { businessCategoriesValidation } from "../../../validations/index"
import {
  deleteBusiness,
  getBusinesses,
  updateBusiness
} from "../../../services/Api/Business";

const BusinessCategories = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [state, setState] = useState({
      values: {
        name: "",
        description: "",
        image: "N/A",
        isActive: false,
       },
      errors: {
        name: "",
        description: "",
        image: "",
      categoriesList: [],
      count: 0,
      isUpdate: false,
      },
    })
    useEffect(() => {
      businessGet(page, limit)
    },[page, limit])
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setState((prevState) => ({
        ...prevState,
        values: {
          name: "",
          description: "",
          image: "",
          },
      errors: {
        name: "",
        description: "",
        image: "",
      },
        isUpdate: false
      }));
      setOpen(false);
    };
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

     //pagination
     const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    // pagination 
    const handleChangeLimit = (event) => {
      setLimit(event.target.value);
    };
  // set State for update MenuItem 
  const handleUpdateState = (data) => {
    handleClickOpen()
    setState((prevState) => ({
      ...prevState,
      values: data,
      isUpdate: true
    }));
  }
  // delete MenuItem
  const businessDelete = async (menuItem) => {
    const results = await deleteBusiness(menuItem.id)
    if (results.data.status === 200) {
      businessGet(page, limit)
    }
  }
  // Handle Notification
  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
      placement: "bottomRight"
    });
  };
  // get getMenuItemCategories 
  const businessGet = async (page, limit) => {
    const results = await getBusinesses({
      page: page,
      limit: limit,
    })
    if(results.data.status === 200) {
      setState((prevState) => ({
        ...prevState,
        categoriesList: results.data.result.results,
        count: results.data.result.totalResults
      }));
    }
  }

  // Create Menu Items
  const businessUpdate = async (item) => {
    if (!await handleValidation()) return;
    const results = await updateBusiness(
      {
        id: state.values.id
      },
    {
      name: state.values.name,
      description: state.values.description,
      image: state.values.image,
      isActive: state.values.isActive
     }
    )
    if(results.data.status === 200) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
        values: {
          values: {
            name: "",
            description: "",
            image: "",
           },
        },
      }));
      handleClose()
      businessGet(page, limit)
    }
  }

  // Handle validation 
  const handleValidation = async () => { 
    const results = await businessCategoriesValidation(state.values)
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

    return(
        <>
        <Modal 
          handleClose={handleClose}
          open={open} state={state} 
          onChangeInput={onChangeInput}
          businessUpdate={businessUpdate}
          />
        <CategoriesTable 
          handleClickOpen={handleClickOpen}
          state={state} 
          businessDelete={businessDelete} 
          handleUpdateState={handleUpdateState}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeLimit}
          page={page}
          limit={limit}
        />
        </>
    )
}

export default BusinessCategories