import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import style from "../components/style.module.css"
import Paper from "@material-ui/core/Paper";


function MenuTable(props) {
    const {
        handleClickOpen,
        handleUpdateState,
        getvalue,
    } = props
    return (
        <>
            <Paper className={`${style.table} container`}>
                <section class="section about-section gray-bg" id="about">
                    <div className="container">
                        <div className="row align-items-center flex-row-reverse">
                            <div className="col-lg-9">
                                <div className="about-text go-to">
                                    <div className="row about-list">
                                        <div className="col-md-6">
                                            <div className="row about-list">
                                                <h5>First Name : </h5>
                                                <h6 className="profiledata">{getvalue.firstName}</h6>
                                            </div>

                                            <div className="row about-list">
                                                <h5>Last Name :</h5>
                                                <h6 className="profiledata">{getvalue.lastName}</h6>
                                            </div>
                                            <div className="row about-list">
                                                <h5>Restaurent Name :</h5>
                                                <h6 className="profiledata">{getvalue.name}</h6>
                                            </div>
                                            <div className="row ">
                                                <h5>Description : </h5>
                                                <h6 className="profiledata">{getvalue.description}</h6>
                                            </div>
                                            <div className="row about-list">
                                                <h5>Address : </h5>
                                                <h6 className="profiledata">{getvalue.address}</h6>
                                            </div>
                                            <div className="row about-list">
                                                <h5>WhatsApp Number : </h5>
                                                <h6 className="profiledata">{getvalue.whatsAppNumber}</h6>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="about-avatar">
                                    <img style={{ height: "70%", width: "50%" }} src={getvalue.image} title="" alt="Business Image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div >
                    <Button
                        style={{ width: '100px', height: "45px", margin: "10px" }}
                        size="large"
                        variant="success"
                        onClick={handleUpdateState} 
                        >
                        
                        Edit
                    </Button></div>

            </Paper>

        </>
    );
}

export default (withRouter(MenuTable));
