import React, { useState, useEffect } from 'react'
import Categories from '../categories/Categories';
import Dialogs from './Modal'
import "antd/dist/antd.css";
import { notification } from "antd";

import { menuItemValidation } from "../../../validations/index"
import {
  getMenuItems,
  deleteMenuItem,
  getMenuItemCategories,
  createMenuItems,
  updateMenuItems,
  updateSortmenuItems,
} from "../../../services/Api/MenuItem/index";
import { getBusinessByUserId } from "../../../services/Api/Business";

const MenuItemsContainer = () => {
  const user = JSON.parse(localStorage.getItem('user'))
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0)
    const [limit, setLimit] = useState(10)
    const [state, setState] = useState({
      values: {
        name: "",
        description: "",
        categories: [],
        image: "N/A",
        price: "",
        sort: 1,
        variations:[]
      },
      errors: {
        name: "",
        description: "",
        image: "",
        price: "",
        sort: 1,
        variations:[{ name: "", price: "", description: "", isActive: false }],
      },
      menuItemList: [],
      categoriesList: [],
      businessId: '',
      count: 0,
      isUpdate: false,
      showButton: false,
      categoriesId: "",
      modalTitle: ""
    })
    useEffect(() => {
      getMenuItem(page, limit)
      getMenuItemCategory()
    },[page, limit])

    const handleClickOpen = (item, key) => {
      if(key === "addMenuItem") {
        setState((preState) =>({
          ...preState,
          categoriesId: item._id,
          modalTitle: "Add Menu Item"
        }))
      } else if (key === "editMenuItem") {
        setState((preState) =>({
          ...preState,
          categoriesId: item._id,
          modalTitle: "Edit Menu Item"
        }))
      }
      setOpen(true);
    };
    const handleClose = () => {
      setState((prevState) => ({
        ...prevState,
        values: {
          name: "",
          description: "",
          categories: [],
          image: "N/A",
          price: "",
          sort: 1,
          variations:[{ name: "", price: "", description: "", isActive: false }]
      },
      errors: {
        name: "",
        description: "",
        categories: [],
        image: "",
        price: "",
        sort: 1,
        variations:[{ name: "", price: "", description: "", isActive: false }]
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

    // Add more field for varitions
    const addMoreVariations = () => {
      let option = state.values.variations;
      option.push({ name: "", price: "", description: "", isActive: false });
      setState((preVal) => {
        return {
          ...preVal,
          values: {
            ...preVal.values,
            variations: option,
          },
        };
      });
    };
    // Delete more fields of variations
    const deleteMoreVariations = (value) => {
      let option = state.values.variations;
      let index;
        index = option.indexOf(value);
        option.splice(index, 1);
      setState((preState) => {
        return {
          ...preState,
          values: {
            ...preState.values,
            variations: option,
          },
        };
      });
    };
    // handle varitions
    const handleVariations = (index, key, value) => {
      let option = state.values.variations;
      let errors = state.errors.variations;
      if (errors && errors[index] && errors[index][key]) {
        errors[index][key] = "";
      }
      option[index][key] = value;
      setState((preState) => ({
        ...preState,
        values: {
          ...preState.values,
          variations: option,
        },
        errors: {
          ...preState.errors,
          variations: errors,
        },
      }));
    };
     //pagination
    //  const handleChangePage = (event, newPage) => {
    //   setPage(newPage);
    // };
    // // pagination 
    // const handleChangeLimit = (event) => {
    //   setLimit(event.target.value);
    // };
    // get MenuItem
  const getMenuItem = async (page, limit) => {
    const results = await getMenuItems({
      page: page,
      limit: limit,
    });
    setState((prevState) => ({
      ...prevState,
      menuItemList: results.data.result.results,
      count: results.data.result.totalResults
    }));
  };
  // set State for update MenuItem 
  const handleUpdateState = (menuItem, categories) => {
    handleClickOpen(categories, "editMenuItem")
    setState((prevState) => ({
      ...prevState,
      values: menuItem,
      isUpdate: true
    }));
  }
  // delete MenuItem
  const deleteMenuItems = async (menuItem) => {
    const results = await deleteMenuItem(menuItem._id)
    if (results.data.status === 200) {
      getMenuItem(page, limit)
      getMenuItemCategory(page, limit)
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
  // get getMenuItemCategories 
  const getMenuItemCategory = async () => {
    const business = await getBusinessByUserId(user.id)
    if(business.data && business.data.business && business.data.business.id) {
      const results = await getMenuItemCategories(business.data.business.id)
    if(results.data.status === 200) {
      setState((prevState) => ({
        ...prevState,
        categoriesList: results.data.result,
        showButton: true
      }));
    }
    }
  }

  const handleSortmenuItem = async (data, increment) => {
    console.log("===========", data)
    const results = await updateSortmenuItems(
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
  // Create Menu Items
  const createMenuItem = async () => {
    if (!await handleValidation()) return;
    const results = await createMenuItems({
      name: state.values.name,
      description: state.values.description,
      categories: state.values.categories,
      image: state.values.image,
      price: state.values.price,
      sort: state.values.sort,
      variations: state.values.variations,
      categoriesId: state.categoriesId
    })
    if(results.data.status === 200) {
      getMenuItem(page, limit)
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
          values: {
            name: "",
            description: "",
            categories: [],
            image: "N/A",
            price: "",
            sort: 1,
            variations:[{ name: "", price: "", description: "", isActive: false }]
        },
      }));
      getMenuItemCategory(page, limit)
      handleClose()
    } else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
    }
  }
  // Create Menu Items
  const updateMenuItem = async (item) => {
    if (!await handleValidation()) return;
    const results = await updateMenuItems(
      {
        id: state.values._id
      },
    {
      name: state.values.name,
      description: state.values.description,
      categories: state.values.categories,
      image: state.values.image,
      price: state.values.price,
      sort: state.values.sort,
      variations: state.values.variations,
      categoriesId: state.categoriesId
     }
    )
    if(results.data.status === 200) {
      getMenuItem(page, limit)
      getMenuItemCategory(page, limit)
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("success", message, success);
      setState((prevState) => ({
        ...prevState,
        values: {
          values: {
            name: "",
            description: "",
            categories: [],
            image: "N/A",
            price: "",
            sort: 1,
            variations:[{ name: "", price: "", description: "", isActive: false }]
          },
        },
      }));
      handleClose()
    }  else if (results.data.status === 400) {
      let message = results.data.msg;
      let success = results.data.success;
      handleNotification("error", message, success);
    }
  }
  const handleSortCategories = async () => {
    const results = await updateMenuItems(
      {
        id: state.values._id
      },
    )
    if(results.data.status === 200) {
      getMenuItem(page, limit)
      getMenuItemCategory(page, limit)
    }
  }

  
  // upload menuitem Image
  // const uploadImage = async () => {
  //   const results = await uploadMenuItemImage({name: 'file'});
  //   if (results.data.status === 200) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       values: {
  //         ...prevState.values,
  //         image: results.data.data,
  //       },
  //       errors: {
  //         ...prevState.errors,
  //         image: "",
  //       },
  //     }));
  //   }
  // };
  // Handle validation 
  const handleValidation = async () => { 
    const results = await menuItemValidation(state.values)
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
        <Dialogs 
          handleClose={handleClose}
          open={open} state={state} 
          addMoreVariations={addMoreVariations}
          handleVariations={handleVariations}
          onChangeInput={onChangeInput}
          createMenuItem={createMenuItem}
          deleteMoreVariations={deleteMoreVariations}
          updateMenuItem={updateMenuItem}
          handleNotification={handleNotification}
          />
          {/* <MenuTable 
          handleClickOpen={handleClickOpen}
          state={state} 
          deleteMenuItems={deleteMenuItems} 
          handleUpdateState={handleUpdateState}
          onChangeRowsPerPage={handleChangePage}
          onChangePage={handleChangeLimit}
          page={page}
          limit={limit}
        /> */}
          <Categories 
          menuModalOpen={handleClickOpen}
          menuState={state} 
          getMenuItemCategory={getMenuItemCategory}
          handleMenuItemUpdateState={handleUpdateState}
          deleteMenuItems={deleteMenuItems}
          handleSortmenuItem={handleSortmenuItem}
          />
        </>
    )
}

export default MenuItemsContainer