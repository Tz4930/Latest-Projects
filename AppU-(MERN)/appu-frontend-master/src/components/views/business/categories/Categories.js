import React, { useState, useEffect } from 'react'
// import CategoriesTable from './CategoriesTable';
import AddCategories from './AddCategories';
import CategoriesList from './CategoriesList';
import Modal from './Modal'
import "antd/dist/antd.css";
import { notification } from "antd";

import { menuItemCategoriesValidation } from "../../../validations/index"
import {
  deleteMenuItemCategories,
  // getMenuItemCategories,
  createMenuItemsCategories,
  updateMenuItemsCategories,
  updateSortCategory,
} from "../../../services/Api/MenuItemCategories";
import { getBusinessByUserId } from "../../../services/Api/Business";

const MenuItemsContainer = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const {
    menuModalOpen,
    menuState,
    getMenuItemCategory,
    handleMenuItemUpdateState,
    handleSortmenuItem,
    deleteMenuItems,
  } = props
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [state, setState] = useState({
      values: {
        name: "",
        description: "",
        image: "N/A",
        isActive: false,
        sort: 1,
       },
      errors: {
        name: "",
        description: "",
        image: "",
      },
      categoriesList: [],
      businessId: '',
      count: 0,
      isUpdate: false,
    })
    useEffect(() => {
      // getMenuItemCategory(page, limit)
    },[page, limit])
    useEffect(() => {
      getBusinessToUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.id])
    
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setState((prevState) => ({
        ...prevState,
        values: {
          name: "",
          description: "",
          image: "N/A",
          isActive: false,
          sort: 1,
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
  const handleCategoriesUpdateState = (data) => {
    handleClickOpen()
    setState((prevState) => ({
      ...prevState,
      values: data,
      isUpdate: true
    }));
  }
  // delete MenuItem
  const deleteCategory = async (item) => {
    const results = await deleteMenuItemCategories(item._id)
    if (results.data.status === 200) {
      getMenuItemCategory(page, limit)
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
    } else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
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
  // const getMenuItemCategory = async (page, limit) => {
  //   const results = await getMenuItemCategories({
  //     page: page,
  //     limit: limit,
  //   })
  //   if(results.data.status === 200) {
  //     console.log("===============", results.data)
  //     setState((prevState) => ({
  //       ...prevState,
  //       categoriesList: results.data.result,
  //       count: results.data.result.totalResults
  //     }));
  //   }
  // }
  // Create Menu Items
  const createMenuItemCategory = async () => {
    if (!await handleValidation()) return;
    const results = await createMenuItemsCategories(
      {
        businessId: state.businessId
      },
      {
      name: state.values.name,
      description: state.values.description,
      image: state.values.image,
      isActive: state.values.isActive,
      sort: state.values.sort
    })
    if(results.data.status === 200) {
      let message = results.data.msg;
      
      let success = results.data.success;
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
          values: {
            name: "",
            description: "",
            image: "N/A",
            isActive: false,
            sort: 1,
        },
      }));
      handleClose()
      getMenuItemCategory(page, limit)
    } else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
    }
  }
  // Create Menu Items
  const updateMenuItemCategory = async (item) => {
    if (!await handleValidation()) return;
    const results = await updateMenuItemsCategories(
      {
        id: state.values._id,
        businessId: state.businessId,
      },
    {
      name: state.values.name,
      description: state.values.description,
      image: state.values.image,
      isActive: state.values.isActive,
      sort: state.values.sort,
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
            image: "N/A",
            isActive: false,
            sort: 1,
           },
        },
      }));
      handleClose()
      getMenuItemCategory(page, limit)
    } else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
    }
  }

  // Handle validation 
  const handleValidation = async () => { 
    const results = await menuItemCategoriesValidation(state.values)
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
  /// get one business by user Id
  const getBusinessToUserId = async () => {
    const results = await getBusinessByUserId(user.id)
    if(results.data.status === 200) {
      setState((prevState) => ({
        ...prevState,
        businessId: results.data && results.data.business ? results.data.business.id : ""
      }));
    }
  }

  const handleSortCategories = async (data, increment) => {
    console.log("===========", data)
    const results = await updateSortCategory(
      {
        id: data._id
      },
      {
        sort: data.sort,
        increment: increment
      }
    )
    if(results.data.status === 200) {
      getMenuItemCategory(page, limit)
    }
  }

    return(
        <>
        <Modal 
          handleClose={handleClose}
          open={open} state={state} 
          onChangeInput={onChangeInput}
          createMenuItemCategory={createMenuItemCategory}
          updateMenuItemCategory={updateMenuItemCategory}
          />
        {/* <CategoriesTable 
          handleClickOpen={handleClickOpen}
          state={state} 
          deleteCategory={deleteCategory} 
          handleUpdateState={handleUpdateState}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeLimit}
          page={page}
          limit={limit}
        /> */}
        <AddCategories handleClickOpen={handleClickOpen} />
        <CategoriesList 
          state={state}
          menuModalOpen={menuModalOpen}
          menuState={menuState}
          handleMenuItemUpdateState={handleMenuItemUpdateState}
          handleCategoriesUpdateState={handleCategoriesUpdateState}
          deleteMenuItems={deleteMenuItems}
          deleteCategory={deleteCategory}
          handleSortCategories={handleSortCategories}
          handleSortmenuItem={handleSortmenuItem}
        />
       
        </>
    )
}

export default MenuItemsContainer