import React from "react";
import { withRouter } from "react-router";
import { Button } from "react-bootstrap";
import style from "../components/style.module.css"
import ActionIcons from "../components/ActionIcons"
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Image from 'react-bootstrap/Image'

function MenuTable(props) {
    const {
        handleClickOpen,
        deleteMenuItems,
        handleUpdateState,
        onChangePage,
        onChangeRowsPerPage,
        limit,
        page,
        state,
    } = props
  return (
    <>
      <>
        <Paper className={`${style.table} container`}>
          <Button 
            className="pull-right"
            size="medium"
            variant="success"
            onClick={handleClickOpen}>
            Add MenuItem
          </Button>
          <TableContainer>
            <Table
              aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell key="name">Name</TableCell>
                <TableCell key="description">Description</TableCell>
                <TableCell key="image">Image</TableCell>
                <TableCell key="price">Price</TableCell>  
                <TableCell key="actions">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state &&
                state.menuItemList &&
                state.menuItemList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      {
                        item.image && item.image.indexOf('http:') === -1
                        &&
                      <Image
              src={
                  item.image ?
                   `http://localhost:3000/api/public/images/uploads/` +
                    item.image : ''
              }
              width="100"
              height="50"
              fluid
            />
          }
                {
                        item.image && item.image.indexOf('http:') !== -1
                        &&
                      <Image
              src={
                  item.image ?
                   `http://localhost:3000/api/public/images/uploads/` +
                    item.image : ''
              }
              width="100"
              height="50"
              fluid
            />
          }
            </TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>
                      <ActionIcons handleDelete={deleteMenuItems} handleUpdateState={handleUpdateState} item={item}/>
                    </TableCell>
                  </TableRow>
                ))
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={state && state.count ? state.count : 0}
            rowsPerPage={limit ? limit : 10} 
            page={page ? page : 0}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            />
        </Paper>
      </>
    </>
  );
}

export default (withRouter(MenuTable));
