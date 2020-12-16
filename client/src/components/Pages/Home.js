import React, { Fragment, useEffect, useState } from "react";
import "./../styling/styles.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";

// IMPORTANT: recheck data para sa custom
//import CustomTable from "../Tables/CustomTable";
import BasicTable from "../Tables/BasicTable";
import ErrorHtml from "../ErrorFacility/ErrorPage";

import { useDispatch, useSelector } from "react-redux";
import * as soaActions from "../../redux/actions/soaActions";
import history from "../Navigation/History";

import useFullPageLoader from "../../hooks/useLoaderPage";

const useStyles = makeStyles((theme) => ({
  root: {
    //minWidth: 275,
    flexGrow: 1,
  },
  title: {
    fontSize: 14,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    //minWidth: 300,
    color: theme.palette.getContrastText(orange[800]), /// font color
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  },
}))(Button);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

let rows = [
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Noodles", 132, 74.0, 81, 6.9),
  createData("Kamote", 20, 114.0, 12, 11.9),
];

function addRowData() {
  let alter = false;
  let x = 0;
  for (var i = 0; i < 10; i++) {
    //console.log(alter);
    alter = !alter;
    alter === false ? (x = 0) : (x = 1);
    const newName = rows[x].name + i;
    const newCal = rows[x].calories + Number(i);
    const newFat = rows[x].fat + Number(i);
    const newCarb = rows[x].carbs + Number(i);
    const newProt = rows[x].protein + Number(i);
    const rowsNew = createData(newName, newCal, newFat, newCarb, newProt);
    //console.log(rowsNew);
    rows.push(rowsNew);
  }
  //console.log(rows);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Dessert (100g serving)",
  },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
];

const Home = () => {
  const classes = useStyles();
  const [load, setLoad] = useState(false);
  const [soa, setSoa] = useState("");
  // FIX: custom hooks for loading may isang paraan pa sa REACTSAMPLES project about loading sa LoadTable.js
  //const [loader, showLoader, hideLoader] = useFullPageLoader();

  //NOTE: from redux reducers

  const soaList = useSelector((state) => state.soa.soaList);
  const errMsg = useSelector((state) => state.soa.error);

  const dispatch = useDispatch();

  useEffect(() => {
    // showLoader();

    // setTimeout(
    //   function () {
    //     hideLoader();
    //   }.bind(this),
    //   3000
    //);

    // dispatch(
    //   //soaActions.getSOAList("C002373", "50FDFD14-0D46-4838-87E9-C8F531867023")
    //   soaActions.getSOAList()
    // );

    console.log(soaList);
    // eslint-disable-next-line
  }, [dispatch]);

  if (errMsg !== 0) {
    return <ErrorHtml errorStatus={errMsg} />;
  }

  return (
    <Fragment>
      <div></div>
      <Card id="info-block">
        <section className="file-marker">
          <div>
            <div className="box-title">ELECTRONIC STATEMENT</div>
            <div className="box-contents">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper} elevation={0}>
                    <ColorButton
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                      className={classes.margin}
                    >
                      SOA GENERATION
                    </ColorButton>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper className={classes.paper} elevation={0}>
                    <ColorButton
                      variant="contained"
                      color="primary"
                      fullWidth={true}
                      className={classes.margin}
                      onClick={() => history.push("/Proforma")}
                    >
                      PROFORMA BILLING
                    </ColorButton>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </section>
      </Card>

      <Card id="info-block">
        <section className="file-marker">
          <div>
            <div className="box-title">STATEMENT OF ACCOUNT</div>
            <div className="box-contents">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  {/* 
                    FIX: ung data na kukuhanan neto
                    <CustomTable
                    selectRow={true}
                    newPaging={true}
                    sortOrder={true}
                    headCells={headCells}
                    datas={soa}
                    load={load}
                    searchable={false}
                    searchPlaceholder="Search table data"
                  /> */}
                  <BasicTable />
                </Grid>
              </Grid>
            </div>
          </div>
        </section>
      </Card>
      {/* {loader} */}
    </Fragment>
  );
};

export default Home;
