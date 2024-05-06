import * as React from 'react';
import { Button } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CategoriesForm from './Form'

const  Modal = (props) => {
    const {
        handleClose,
        onChangeInput,
        updateBusiness,
        state,
        getvalue,
        open
    } = props
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Update Business Details</DialogTitle>
        <DialogContent dividers>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
          <CategoriesForm 
            state={state} 
            onChangeInput={onChangeInput}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="danger" size="medium"  onClick={handleClose}>
            Cancel
          </Button>
            <Button 
            variant="success"
            size="medium"
            onClick={updateBusiness}
            >
            Update Business
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal
