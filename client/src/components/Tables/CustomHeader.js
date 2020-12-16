import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";

//const CheckTableCell = () => {};

///// kakaiba pag style sa table header
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ef6c00", //// orange
    color: "white",
    fontSize: 16,
    border: "solid",
  },
}))(TableCell);

const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    color: "white",
    "&:hover": {
      color: "yellow",
    },
    "&$active": {
      color: "yellow",
    },
  },
  active: {},
  icon: {
    color: "inherit !important",
  },
}))(TableSortLabel);

////// sorting functions ///////
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//   function getComparator(order, orderBy) {
export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

//   function stableSort(array, comparator) {
export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function EnhancedTableHead(props) {
  const {
    headCells,
    classes,
    //onSelectAllClick,
    order,
    orderBy,
    //numSelected,
    rowCount,
    onRequestSort,
    sortOrder,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const SortOrderStyle = (headCell) => {
    let { id, label, numeric, disablePadding } = headCell.headCell;
    //console.log(label);
    switch (sortOrder) {
      case true:
        return (
          <StyledTableCell
            key={id}
            align={numeric ? "right" : "left"}
            padding={disablePadding ? "none" : "default"}
            sortDirection={orderBy === id ? order : false}
          >
            <StyledTableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        );
      case "checked":
        return <Fragment>{console.log(sortOrder)}</Fragment>;
      default:
        return (
          <Fragment>
            <StyledTableCell align={numeric ? "right" : "left"}>
              {label}
            </StyledTableCell>
          </Fragment>
        );
    }
  };

  //////// dynamic component ///////
  // const components = {
  //   false: TableSortLabel,
  //   true: StyledTableSortLabel,
  //   checked: CheckTableCell,
  // };

  // const TCellComponent = components[headStyle || false];

  return (
    <TableHead>
      {/* <TableRow key={'row.name1'}>
        <TableCell component="th" scope="row">
          {'row.name'}
        </TableCell>
        <TableCell align="right">{'row.calories'}</TableCell>
        <TableCell align="right">{'row.fat'}</TableCell>
        <TableCell align="right">{'row.carbs'}</TableCell>
        <TableCell align="right">{'row.protein'}</TableCell>
      </TableRow> */}
      <TableRow>
        {rowCount > 0 &&
          headCells.map((headCell, index) => (
            <SortOrderStyle key={index} headCell={headCell} />
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  //numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
