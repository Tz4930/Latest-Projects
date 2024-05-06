import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import "antd/dist/antd.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { red } from "@mui/material/colors";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import style from '../components/style.module.css';
import Image from 'react-bootstrap/Image';
import FormGroup from '@mui/material/FormGroup';
import apiConstant from "../../../../constant/appConstant";
import { getRadioUtilityClass } from "@mui/material";
import { uploadCoverImage} from "../../../services/Api/Business";

import { notification } from 'antd';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "10px",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const MenuItemForm = (props) => {
  
  
  const {
    addMoreVariations,
    handleVariations,
    onChangeInput,
    deleteMoreVariations,
    state,
  } = props;
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState('');
  
  const getStringUrl = (state) => {
    if(state & state.values && state.values.image && state.values.image.indexOf('http') === -1) {
      return `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${state.values.image}`;
    } else if (state & state.values && state.values.image && state.values.image.indexOf('http') !== -1) {
      return state.values.image;
    } else {
      return '';
    }
  }

  useEffect(() => {
    if(state && state.isUpdate) {
      setImageUrl(getStringUrl(state));
    }
  }, [])

  const handleNotification = (value, message, success) => {
    notification[value]({
      message: success,
      description: message,
    });
  };

  const uploadImage = async (selectedImage) => {
    const fileToUpload = selectedImage;
    const formData = new FormData();
    formData.append("file", fileToUpload);
    const result = await uploadCoverImage(formData);
    console.log(result);
    if (result.data.status === 200) {
      let message = result.data.message;
      let success = result.data.success;
      handleNotification("success", message, success);
      setImageUrl(result.data.data);
      onChangeInput(result.data.data, 'image')
    }
  };

  const handleCoverImage = (value) => {
    uploadImage(value)
  };

  const moreVariations = () => {
    return (
      <>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            {state.values
              ? state.values.variations &&
                state.values.variations.map((element, index) => {
                  return (
                      <Box sx={{ width: "100%" }} key={index}>
                        <div style={{marginTop: "10px"}}>
                        <Grid
                          container
                          rowSpacing={1}
                          columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                        >
                          <Grid item xs={5} rowSpacing={1}>
                            <TextField
                              value={element.name}
                              onChange={(event) =>
                                handleVariations(
                                  index,
                                  "name",
                                  event.target.value
                                )
                              }
                              id="outlined-basic"
                              label="Name"
                              variant="outlined"
                            />
                            {
                              state && state.errors && state.errors.variations ? (
                                <p style={{color: "red"}}>{state && state.errors && state.errors.variations && state.errors.variations[index] && state.errors.variations[index].name ? state.errors.variations[index].name : ""}</p>
                              ) : ''
                            }
                          </Grid>
                          <Grid item xs={5}>
                            <TextField
                              value={element.price}
                               onChange={(event) =>
                                handleVariations(
                                  index,
                                  "price",
                                  event.target.value
                                )
                              }
                              id="outlined-basic"
                              label="Price"
                              variant="outlined"
                              type="number"
                            />
                            {
                              state && state.errors && state.errors.variations ? (
                                <p style={{color: "red"}}>{state && state.errors && state.errors.variations && state.errors.variations[index] && state.errors.variations[index].price ? state.errors.variations[index].price : ""}</p>
                              ) : ''
                            }
                          </Grid>
                          <Grid item xs={2}>
                          <DeleteIcon
                              className={style.deleteIcon}
                              sx={{ color: red[500] }}
                              onClick={() => deleteMoreVariations(false, index)}
                            />
                          </Grid>
                          <Grid item xs={10} >
                            <TextField
                              className={style.descriptionField}
                              value={element.description}
                              onChange={(event) =>
                                handleVariations(
                                  index,
                                  "description",
                                  event.target.value
                                )
                              }
                              id="outlined-basic"
                              label="Description"
                              variant="outlined"
                            />
                            {
                              state && state.errors && state.errors.variations ? (
                                <p style={{color: "red"}}>{state && state.errors && state.errors.variations && state.errors.variations[index] && state.errors.variations[index].description ? state.errors.variations[index].description : ""}</p>
                              ) : ''
                            }
                          </Grid>
                          <Grid item xs={2}>
                          <Checkbox
                              checked={element.isActive}
                              onChange={(event) =>
                                handleVariations(
                                  index,
                                  "isActive",
                                  event.target.checked
                                )
                              }
                            />
                          </Grid>
                        </Grid>
                        </div>
                      </Box>
                  );
                })
              : ""}
             <div style={{marginTop: "10px"}}> 
            <Button
              size="sm"
              variant="contained"
              onClick={addMoreVariations}
            >
              Add Variations
            </Button>
            </div>
          </div>
        </form>
      </>
    );
  };
  return (
    <>
      <form className={classes.root} noValidate autoComplete="off">
       <TextField
          id="outlined-basic"
          variant="outlined"
          value={
            state && state.values && state.values.name ? state.values.name : ""
          }
          label="Name"
          sx={{  width: "40ch" }}
          type="text"
          onChange={(event) => onChangeInput(event.target.value, "name")}
        />
        {
          state && state.errors && state.errors.name ? (
            <p style={{color: "red", marginTop: "-5px"}}>{state && state.errors && state.errors.name ? state.errors.name : ""}</p>
          ) : ''
        }
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Description"
          value={
            state && state.values && state.values.description
              ? state.values.description
              : ""
          }
          sx={{ m: 1, width: "40ch" }}
          type="textarea"
          onChange={(event) => onChangeInput(event.target.value, "description")}
        />
        {
          state && state.errors && state.errors.description ? (
            <p style={{color: "red", marginTop: "-5px"}}>{state && state.errors && state.errors.description ? state.errors.description : ""}</p>
          ) : ''
        }
        {/* <Select state={state} onChangeInput={onChangeInput} />
        {
          state && state.errors && state.errors.categories ? (
            <p style={{color: "red", marginTop: "-5px"}}>{state && state.errors && state.errors.categories ? state.errors.categories : ""}</p>
          ) : ''
        } */}
        <TextField
          id="outlined-basic"
          label="Price"
          type="number"
          value={
            state && state.values && state.values.price
              ? state.values.price
              : ""
          }
          onChange={(event) => onChangeInput(event.target.value, "price")}
          sx={{ m: 1, width: "40ch", }}
        />
        {
          state && state.errors && state.errors.price ? (
            <p style={{color: "red", marginTop: "-5px"}}>{state && state.errors && state.errors.price ? state.errors.price : ""}</p>
          ) : ''
        }
        {/* <TextField
          id="outlined-basic"
          variant="outlined"
          label="Sort"
          type="number"
          value={
            state && state.values && state.values.number
              ? state.values.number
              : ""
          }
          onChange={(event) => onChangeInput(event.target.value, "number")}
          sx={{ m: 1, width: "40ch" }}
        />
        {
          state && state.errors && state.errors.number ? (
            <p style={{color: "red", marginTop: "-5px"}}>{state && state.errors && state.errors.number ? state.errors.number : ""}</p>
          ) : ''
        } */}
      {/* <Upload
        fileList={state && state.values && state.values.image && state.values.image === "N/A" ? null : imageUrl}
        listType="picture-card"
        {...props2}
        onPreview={onPreview}
        // fileList={state && state.values && state.values.image ? `http://localhost:3000/business/image/uploads` + state.values.image : ''}
      >
        {imageUrl.length >= 1 ? null : '+ Upload'}
      </Upload> */}
            <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={(event) =>
              handleCoverImage(
                event.target.files[0]
              )
            } />
          <Button
            className="btn-choose"
            variant="contained"
            component="span" >
             Choose Image
          </Button>

        </label>
        <FormGroup controlId="formFileLg" className="mb-3">
    {/* <Form.Label>Cover Image</Form.Label> */}
        <div className="form-label-group">
        </div>
        <div className="form-label-group">
          <div>
            {imageUrl && imageUrl.indexOf('http') === -1 ? (
              <Image
              style={{height: "30vh", width: "100vh", overflowY: "hidden"}}
              src={
                imageUrl
                  ? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/` +
                    imageUrl
                  : ""
              }
              fluid
            />
             ) : ""
            }
            {
             imageUrl.indexOf('http') !== -1 ? (
              <Image
              style={{height: "30vh", width: "100vh", overflowY: "hidden"}}
              src={
                imageUrl
                  ? imageUrl
                  : ""
              }
              fluid
            />
             ) : ""
            }
          </div>
        </div>
        </FormGroup>
        <InputLabel sx={{ m: 2 }} htmlFor="filled-adornment-variations">
          Variations
        </InputLabel>
        {moreVariations()}
      </form>
    </>
  );
};

export default MenuItemForm;
