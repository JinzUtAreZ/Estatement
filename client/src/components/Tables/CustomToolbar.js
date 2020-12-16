import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import SearchTable from "../../Elements/Input/InputSearch";

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#ef6c00", //// lightblue
    color: "white",
  },
  title: {
    flex: "1 1 100%",
  },
}));

export default function CustomToolbar(props) {
  const classes = useToolbarStyles();
  const {
    searchable,
    searchPlaceholder,
    rowCount,
    handleSearchChange,
    searchInput,
  } = props;

  ///// ung search neto nasa customtable /////

  return (
    <Fragment>
      {rowCount > 0 && searchable && (
        <Toolbar className={classes.root}>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            //component="div"
          ></Typography>

          {/* <SearchTable
            handleSearchChange={handleSearchChange}
            name="searchTable"
            value={searchInput.tblSearch}
            searchPlaceholder={searchPlaceholder}
            searchInput={searchInput}
          /> */}
        </Toolbar>
      )}
    </Fragment>
  );
}

CustomToolbar.propTypes = {
  searchable: PropTypes.bool,
  rowCount: PropTypes.number.isRequired,
};

// design left middle right without flex
//   <div float="left">{'prevButton'}</div>

//       <div
//         style={{
//           float: 'none',
//           width: '200px',
//           marginLeft: 'auto',
//           marginRight: 'auto',
//         }}
//       >
//         {'releaseBtn'}
//       </div>

//       <div lastChild={true} float="right">

//       </div>
