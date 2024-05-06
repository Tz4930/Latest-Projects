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
         <div className={style.addCategories}>
           <div className={style.addCategoriesRoot}>
          <Button
            size="lg"
            variant="success"
            className={style.addCategoriesButton}
            onClick={handleClickOpen}>
            Add Categories 
          </Button>
          </div>
          </div>
      </>
    </>
  );
}

export default (withRouter(AddMenuItem));
