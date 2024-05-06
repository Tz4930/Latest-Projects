import * as React from 'react';
import { Button } from "react-bootstrap";
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItemForm from './Form'

const  Modal = (props) => {
    const {
        handleClose,
        addMoreVariations,
        handleVariations,
        onChangeInput,
        createMenuItem,
        deleteMoreVariations,
        updateMenuItem,
        handleNotification,
        state,
        open
    } = props
  return (
    <div>
      <Dialog
        open={open}
      >
        <DialogTitle>{state.modalTitle}</DialogTitle>
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
          <MenuItemForm 
            state={state} 
            addMoreVariations={addMoreVariations}
            handleVariations={handleVariations}
            onChangeInput={onChangeInput}
            deleteMoreVariations={deleteMoreVariations}
            handleNotification={handleNotification}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="danger" size="medium"  onClick={handleClose}>
            Cancel
          </Button>
          {state && !state.isUpdate ? (
            <Button 
            variant="success"
            size="medium"
            onClick={createMenuItem}
            >
            Save MenuItem
          </Button>
          ): (
            <Button 
            variant="success"
            size="medium"
            onClick={updateMenuItem}
            >
            Update MenuItem
          </Button>
          )}
          
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal
