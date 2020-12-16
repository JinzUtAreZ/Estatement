import React, { Fragment } from "react";
import TableCell from "@material-ui/core/TableCell";

//import { validateTable } from "../Input/Validator";

const CustomCell = (props) => {
  const { cells, tableCell } = props;
  return (
    <Fragment>
      {Object.keys(cells).map((cell, index) => (
        <TableCell
          key={index}
          className={tableCell}
          component={cell === "name" ? "th" : ""}
          scope={cell === "name" ? "row" : ""}
          //align={validateTable(cells[cell]) === true ? "right" : "left"}
        >
          {cells[cell]}
        </TableCell>
      ))}
      {/* <TableCell className={classes.tableCell} component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {row.calories}
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {row.fat}
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {row.carbs}
      </TableCell>
      <TableCell className={classes.tableCell} align="right">
        {row.protein}
      </TableCell> */}
    </Fragment>
  );
};

export default CustomCell;
