import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { notification } from 'antd';
import { uploadCoverImage } from "../../../services/Api/Business";

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
        getvalue,
        state,
    } = props;

    const classes = useStyles();
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
            onChangeInput(result.data.data, 'image')
        }
    };

    const handleCoverImage = (value) => {
        uploadImage(value)
    };

    return (
        <>
            <div style={{ textAlign: "center" }}><p style={{ color: "red", marginTop: "10px", fontWeight: "900" }}>{state && state.errorMessage ? state.errorMessage : ""}</p></div>
            <form className={classes.root} noValidate autoComplete="off">
                <div class="row mt-2">
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="First Name"
                        value={
                            state && state.values && state.values.firstName
                                ? state.values.firstName
                                : ""
                        }
                        sx={{ ms: 2, width: "22ch", marginRight: "15px" }}
                        type="text"
                        onChange={(event) => onChangeInput(event.target.value, "firstName")}
                    />
                    {
                        state && state.errors && state.errors.firstName ? (
                            <p style={{ color: "red",position:"absolute", marginTop: "55px" }}>{state && state.errors && state.errors.firstName ? state.errors.firstName : ""}</p>
                        ) : ''
                    }
                    <TextField
                        id="outlined-basic"
                        variant="outlined"
                        label="Last Name"
                        value={
                            state && state.values && state.values.lastName
                                ? state.values.lastName
                                : ""
                        }
                        sx={{ ms: 2, width: "22ch", }}
                        type="text"
                        onChange={(event) => onChangeInput(event.target.value, "lastName")}
                    />
                    {
                        state && state.errors && state.errors.lastName ? (
                            <p style={{ color: "red",marginLeft:"-200px",  marginTop: "57px" }}>{state && state.errors && state.errors.lastName ? state.errors.lastName : ""}</p>
                        ) : ''
                    }
                </div>

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    value={
                        state && state.values && state.values.name ? state.values.name : ""
                    }
                    label="Name"
                    sx={{ width: "30ch" }}
                    type="text"
                    onChange={(event) => onChangeInput(event.target.value, "name")}
                />
                {
                    state && state.errors && state.errors.name ? (
                        <p style={{ color: "red",  marginTop: "-7px" }}>{state && state.errors && state.errors.name ? state.errors.name : ""}</p>
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
                    sx={{ ms: 2, width: "40ch", }}
                    type="text"
                    onChange={(event) => onChangeInput(event.target.value, "description")}
                />
                {
                    state && state.errors && state.errors.description ? (
                        <p style={{ color: "red", position: "fixed", marginTop: "-7px" }}>{state && state.errors && state.errors.description ? state.errors.description : ""}</p>
                    ) : ''
                }

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Address"
                    value={
                        state && state.values && state.values.address
                            ? state.values.address
                            : ""
                    }
                    sx={{ ms: 2, width: "40ch", }}
                    type="text"
                    onChange={(event) => onChangeInput(event.target.value, "address")}
                />
                {
                    state && state.errors && state.errors.address ? (
                        <p style={{ color: "red", marginTop: "-7px" }}>{state && state.errors && state.errors.address ? state.errors.address : ""}</p>
                    ) : ''
                }

                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="WhatsApp Number"
                    value={
                        state && state.values && state.values.whatsAppNumber
                            ? state.values.whatsAppNumber
                            : ""
                    }
                    sx={{ ms: 2, width: "40ch", }}
                    type="text"
                    onChange={(event) => onChangeInput(event.target.value, "whatsAppNumber")}
                />
                {
                    state && state.errors && state.errors.whatsAppNumber ? (
                        <p style={{ color: "red", marginTop: "-7px" }}>{state && state.errors && state.errors.whatsAppNumber ? state.errors.whatsAppNumber : ""}</p>
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
                        }
                    />
                    <Button
                        className="btn-choose"
                        variant="contained"
                        component="span" >
                        Choose Image
                    </Button>

                </label>

            </form>
        </>
    );
};

export default CategoriesForm;
