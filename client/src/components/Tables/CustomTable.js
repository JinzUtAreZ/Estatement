import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";

import TablePaginationActions from "../Tables/CustomPaging";
import TableHeadEnhanced from "../Tables/CustomHeader";
import TableToolbar from "../Tables/CustomToolbar";

import { stableSort, getComparator } from "../Tables/CustomHeader";

import CustomCells from "../Tables/CustomCells";

////// styling para sa table body
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    ////// custom styling ko
    border: "solid",
    borderColor: "#e0e0e0",
    boxShadow: "2px 4px 5px #9E9E9E",
  },
  paper: {
    width: "100%",
    paddingBottom: theme.spacing(1),
    backgroundColor: "#ef6c00", //// orange footer
  },
  table: {
    minWidth: 700,
    backgroundColor: "#fafafa", //// light
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#616161", // almost grey
    },
  },
  tableCell: {
    "$selected &": {
      color: "yellow",
    },
  },
  tableHead: {
    "&$root &": {
      backgroundColor: "lightBlue", // kapag basic tablehead gamit
    },
  },
  hover: {},
  selected: {},
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function CustomTables(props) {
  const {
    load,
    headCells,
    datas,
    newPaging,
    sortOrder,
    selectRow,
    searchable,
    searchPlaceholder,
  } = props;

  const classes = useStyles();

  const [filtered, setFiltered] = useState(datas);

  /////// selected row /////
  const [selectedID, setSelectedID] = useState(null);

  /////// paging ////////
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  ////// sorting ///////
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  //////  search ///////
  const [searchInput, setSearchInput] = useState({});

  ///////// paging actions ////////
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //const emptyRows = 0;
  // rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  // spacing per row ng table para consistent.

  ///////// sorting actions ///////////
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  ////// search actions ///////
  const handleSearchChange = (value) => {
    //setSearchInput({ ...searchInput, [key]: value });
    const filterData = datas.filter((data) => {
      return data.name.toLowerCase().includes(value.toLowerCase());
    });
    //console.log('filter-customtables'filterData);
    setFiltered(filterData);
    setPage(0);
    //setFiltered({ ...rows.filter });
  };

  return (
    <div className={classes.root}>
      {load && ( //// loader to para sa data
        <Paper className={classes.paper}>
          <TableToolbar
            rowCount={filtered.length}
            searchable={searchable}
            searchPlaceholder={searchPlaceholder}
            handleSearchChange={handleSearchChange}
            searchInput={filtered}
          />
          <TableContainer>
            <Table className={classes.table}>
              <TableHeadEnhanced
                headCells={headCells}
                classes={classes}
                //numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                sortOrder={sortOrder}
                // searchable={searchable}
                //onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filtered.length}
              />

              {/* <EnhancedTableHead
            headCells={headCells}
            classes={classes}
            //numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            //onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          /> */}
              <TableBody>
                {/* Basic Mapping */}
                {/* {rows.map((row) => ( */}
                {(rowsPerPage > 0
                  ? sortOrder === true
                    ? //// paging with sort order
                      stableSort(filtered, getComparator(order, orderBy)).slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : //// paging only
                      filtered.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                  : filtered
                ).map((row) => (
                  <TableRow
                    hover
                    key={row.name}
                    onClick={() => {
                      setSelectedID(row.name);
                    }}
                    ////// selectRow for Picking data //////
                    selected={selectRow && selectedID === row.name}
                    classes={
                      selectRow && {
                        hover: classes.hover,
                        selected: classes.selected,
                      }
                    }
                    className={classes.tableRow}
                  >
                    <CustomCells cells={row} tableCell={classes.tableCell} />
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <center>
                        <Typography variant="h5" component="h2">
                          NO DATA FOUND
                        </Typography>
                      </center>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={filtered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ////// newPaging for extensive viewing /////
                    ActionsComponent={newPaging && TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
}
