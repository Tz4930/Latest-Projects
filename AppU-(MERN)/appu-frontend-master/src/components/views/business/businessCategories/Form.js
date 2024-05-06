import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
// import apiConstant from "../../../../constant/appConstant"

// import { Upload } from 'antd';
// import style from '../components/style.module.css'

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
  // const [fileList, setFileList] = useState('');
  // const props2 = {
  //   name: 'file',
  //   action: `${apiConstant.BACKEND_UPLOAD_URL}/business/image/uploads`,
  //   onChange(info) {
  //     setFileList('')
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList)
  //     }
  //     if (info.file.status === 'done') {
  //       setFileList(info.file.response.data)
  //       onChangeInput(info.file.response.data, 'image')
  //     } else if (info.file.status === 'error') {
  //       console.error(`${info.file.name} file upload failed.`)
  //     }
  //   },
  // }
  // const onPreview = async file => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise(resolve => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow.document.write(image.outerHTML);
  // };
  const {
    onChangeInput,
    state,
  } = props;
  const classes = useStyles();
  
  return (
    <>
     <div style={{textAlign: "center"}}><p style={{color: "red", marginTop: "10px", fontWeight: "900" }}>{state && state.errorMessage ? state.errorMessage : ""}</p></div>
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
        {/* <Upload
        listType="picture-card"
        accept="image/png, image/jpeg"
        {...props2}
        onPreview={onPreview}
      >
        {fileList.length >= 1 ? null : 'Click to upload an image'}
      </Upload> */}
        {/* <FormControl component="fieldset">
        <FormGroup>
        <FormControlLabel control={<Checkbox
         checked={state && state.values && state.values.isActive ? true : false}
         onChange={(event) => onChangeInput(event.target.checked, "isActive")}
        />} label="Hide" />
       </FormGroup>
       </FormControl>  */}
      </form>
    </>
  );
};

export default CategoriesForm;
