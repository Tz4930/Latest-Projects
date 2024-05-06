import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import FormGroup from '@mui/material/FormGroup';
import Image from 'react-bootstrap/Image';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import "antd/dist/antd.css";
import apiConstant from "../../../../constant/appConstant"
import { uploadCoverImage} from "../../../services/Api/Business";

import { notification } from 'antd';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "10px",
    marginTop: "10px",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));

const CategoriesForm = (props) => {
  
  const {
    onChangeInput,
    state,
  } = props;
  const [imageUrl, setImageUrl] = useState('')
  
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

  const getStringUrl = (state) => {
    if(state & state.values && state.values.image && state.values.image.indexOf('http') === -1) {
      return `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/${state.values.image}`;
    } else if (state & state.values && state.values.image && state.values.image.indexOf('http') !== -1) {
      return state.values.image;
    } else {
      return '';
    }
  }

  const handleCoverImage = (value) => {
    uploadImage(value)
  };

  useEffect(() => {
    if(state && state.isUpdate) {
      setImageUrl(getStringUrl(state));
    }
  }, [])

  const classes = useStyles();

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
            <p style={{color: "red", position: "fixed", marginTop: "-7px"}}>{state && state.errors && state.errors.name ? state.errors.name : ""}</p>
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
          sx={{ ms: 2, width: "40ch",  }}
          type="text"
          onChange={(event) => onChangeInput(event.target.value, "description")}
        />
        {
          state && state.errors && state.errors.description ? (
            <p style={{color: "red", position: "fixed", marginTop: "-7px"}}>{state && state.errors && state.errors.description ? state.errors.description : ""}</p>
          ) : ''
        }
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
            variant="outlined"
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
        <FormControl component="fieldset">
        <FormGroup>
        <FormControlLabel control={<Checkbox
         checked={state && state.values && state.values.isActive ? true : false}
         onChange={(event) => onChangeInput(event.target.checked, "isActive")}
        />} label="Hide" />
       </FormGroup>
       </FormControl> 
      </form>
    </>
  );
};

export default CategoriesForm;
