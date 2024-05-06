import React from "react";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import DeleteTwoTone from "@ant-design/icons/DeleteTwoTone";
import { Popconfirm } from "antd";
import "antd/dist/antd.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

function DeliveryAreaList(props) {
    const {
        state,
        DeleteDeliveryAreas
    } = props
  return (
    <>
      <>
        <Paper className="container">
          <TableContainer>
            <Table
              aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell key="image">Delivery areas</TableCell>
                <TableCell key="actions">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {state ? 
                  state.map((item, index) => {
                      return (
                        <TableRow key={index}>
                        <TableCell key="item">{item}</TableCell>
                        <TableCell>
                        <Popconfirm
                            key="popConfirm"
                            title="Are you sure you want to delete?"
                            onConfirm={() => DeleteDeliveryAreas(index, "delivery")}
                          > 
                            <DeleteTwoTone
                              key="delete"
                              size="small"
                              twoToneColor="red"
                              style={{
                                marginRight: 5,
                                fontSize: "15px",
                              }}
                            />
                          </Popconfirm>
                        </TableCell>
                        </TableRow>
                      )
                  }): ""
                  }
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </>
    </>
  );
}

export default (withRouter(DeliveryAreaList));
