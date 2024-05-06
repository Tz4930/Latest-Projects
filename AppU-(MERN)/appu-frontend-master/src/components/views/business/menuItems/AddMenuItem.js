import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import style from "../components/style.module.css"

function AddMenuItem(props) {
    const {
        handleClickOpen,
    } = props
  return (
    <>
      <>
         <div className={style.addMenuItemMain}>
          <Button
            size="medium"
            variant="success"
            className={style.addMenuItemButton}
            onClick={handleClickOpen}>
            Add MenuItem
          </Button>
          </div>
      </>
    </>
  );
}

export default (withRouter(AddMenuItem));
