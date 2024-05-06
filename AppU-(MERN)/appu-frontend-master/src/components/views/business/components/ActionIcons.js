import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import { Popconfirm } from "antd";
import "antd/dist/antd.css";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ResponsiveGrid(props) {
  const {
    handleDelete,
    handleUpdateState,
    // handleClickOpen
  } = props
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
        <EditIcon sx={{ color: blue[500] }} onClick={() => handleUpdateState(props.item)} />
        </Grid>
        <Grid item>
        <Popconfirm
              key="popConfirm"
              title="Are you sure you want to delete?"
              onConfirm={() => handleDelete(props.item)}  
        >
           <DeleteIcon sx={{ color: red[500] }} />
           </Popconfirm>
           </Grid>
      </Grid>
    </Box>
  );
}
