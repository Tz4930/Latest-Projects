import React from "react";
import Button from '@mui/material/Button';
import { Form } from "react-bootstrap";
import style from "../components/style.module.css"
import Image from 'react-bootstrap/Image'
import apiConstant from "../../../../constant/appConstant"


const RegisterStep6 = (props) => {
  const { state, handleCoverImage } = props;

  return (
    <> 
    <h6 className={`${style.headingTitle} login-heading mb-4`}>Page cover photos</h6>
    <p>Nice! Now let's upload a page cover photo. This will be the first thing your customers will see when your AppU page loads.</p>
    <h6 className={style.headingTitle}>Page image</h6>
    <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            onChange={(event) =>
              handleCoverImage(
                event.target.files[0], //file
                "selectedImage"
              )
            } />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choose Files
          </Button>

        </label>
        <p style={{ color: "red", position: "fixed" }}>
            {state && state.errors ? state.errors.image : ""}
          </p>
    <Form.Group controlId="formFileLg" className="mb-3">
    {/* <Form.Label>Cover Image</Form.Label> */}
        <div className="form-label-group">
        </div>
        <div className="form-label-group">
          <div>
            {state &&
             state.values &&
             state.values.image !== "N/A" &&
             state.values.image.indexOf('http') === -1 ? (
              <Image
              style={{height: "30vh", width: "100vh", overflowY: "hidden"}}
              src={
                state &&
                state.values.image
                  ? `${apiConstant.BACKEND_BASE_URL}/public/images/uploads/` +
                    state.values.image
                  : ""
              }
              fluid
            />
             ) : ""
            }
            {state &&
             state.values &&
             state.values.image !== "N/A" &&
             state.values.image.indexOf('http') !== -1 ? (
              <Image
              style={{height: "30vh", width: "100vh", overflowY: "hidden"}}
              src={
                state &&
                state.values.image
                  ? state.values.image
                  : ""
              }
              fluid
            />
             ) : ""
            }
          </div>
        </div>
      </Form.Group>
    </>
  );
};

export default RegisterStep6;
