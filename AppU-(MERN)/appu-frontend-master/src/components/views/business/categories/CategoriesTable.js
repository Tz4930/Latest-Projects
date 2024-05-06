import React from "react";
import { withRouter } from "react-router";
// import { Button } from "react-bootstrap";
import style from "../components/style.module.css"
import ActionIcons from "../components/ActionIcons"
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
// import TablePagination from "@material-ui/core/TablePagination";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import AlertDialog from "../../../dashboard/AlertDialog/AlertDialog";


function MenuTable(props) {
    const {
        handleClickOpen,
        deleteCategory,
        handleUpdateState,
        // onChangePage,
        // onChangeRowsPerPage,
        // limit,
        // page,
        state,
    } = props
  return (
    <>
      <>
        <Paper className={`${style.table} container`}>
          {/* <Button 
            className={` ${style.button} pull-right`}
            size="medium"
            variant="success"
            onClick={handleClickOpen}>
            Create Categories
          </Button> */}
          <TableContainer>
            <Table
              aria-label="simple table">
              {/* <TableHead>
                <TableRow>
                <TableCell key="name">Name</TableCell>
                <TableCell key="description">Description</TableCell>
                <TableCell key="image">Image</TableCell>
                <TableCell key="actions">Actions</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                {state &&
                state.categoriesList &&
                state.categoriesList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.image}</TableCell>
                    <TableCell>
                      <ActionIcons handleDelete={deleteCategory} handleClickOpen={handleClickOpen} handleUpdateState={handleUpdateState} item={item}/>
                    </TableCell>
                  </TableRow>
                ))
                }
                <AlertDialog handleDelete={deleteCategory} />
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={state && state.count ? state.count : 0}
            rowsPerPage={limit ? limit : 10} 
            page={page ? page : 0}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            /> */}
        </Paper>
      </>
    </>
  );
}

export default (withRouter(MenuTable));
