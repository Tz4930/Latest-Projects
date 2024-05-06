import React, { useState, useEffect } from 'react'
import CategoriesTable from './CategoriesTable';
import Modal from './Modal'
import "antd/dist/antd.css";
import { notification } from "antd";

import { businessCategoriesValidation } from "../../../validations/index"
import {
  deleteBusinessCategories,
  getBusinessCategories,
  createBusinessCategories,
  updateBusinessCategories
} from "../../../services/Api/businessCategories";

const BusinessCategories = (props) => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(99)
    const [state, setState] = useState({
      values: {
        name: "",
        description: "",
        image: "2.jpg",
        isActive: true,
       },
      errors: {
        name: "",
        description: "",
        image: "",
      },
      categoriesList: [],
      count: 0,
      isUpdate: false,
      errorMessage: "",
    })
    useEffect(() => {
      getBusinessCategory(page, limit)
    },[page, limit])
    useEffect(() => {
      if(props.open) {
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
      if(props && props.handleOpen) {
       props.handleOpen(false)
      }
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
  const deleteCategory = async (menuItem) => {
    const results = await deleteBusinessCategories(menuItem.id)
    if (results.data.status === 200) {
      getBusinessCategory(page, limit)
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
  const getBusinessCategory = async (page, limit) => {
    const results = await getBusinessCategories()
    if(results.data.status === 200) {
      setState((prevState) => ({
        ...prevState,
        categoriesList: results.data.result.results,
        count: results.data.result.totalResults
      }));
    }
  }
  // Create Menu Items
  const createMenuItemCategory = async () => {
    if (!await handleValidation()) return;
    const results = await createBusinessCategories({
      name: state.values.name,
      description: state.values.description,
      image: state.values.image,
      isActive: state.values.isActive
    })
    if(results.data.status === 200) {
      let message = results.data.msg;
      let success = results.data.success;
      getBusinessCategory(page, limit)
      props.getCategories()
      handleClose()
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
          values: {
            name: "",
            description: "",
            image: "2.jpg",
            isActive: true
        },
      }));
    } else if (results.data.status === 400) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: results.data.msg
      }));
    }
  }
  // Create Menu Items
  const updateMenuItemCategory = async (item) => {
    if (!await handleValidation()) return;
    const results = await updateBusinessCategories(
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
      handleClose()
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
        values: {
          values: {
            name: "",
            description: "",
            image: "2.jpg",
            isActive: true,
           },
        },
      }));
      getBusinessCategory(page, limit)
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
          open={open} 
          state={state} 
          onChangeInput={onChangeInput}
          createMenuItemCategory={createMenuItemCategory}
          updateMenuItemCategory={updateMenuItemCategory}
          />
        <CategoriesTable 
          handleClickOpen={handleClickOpen}
          state={state} 
          deleteCategory={deleteCategory} 
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