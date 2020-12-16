import React, { Fragment } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import BasicTable from "../Tables/BasicTable";
import ComboBox from "../SelectOption/ComboBox";
import Typography from "@material-ui/core/Typography";

// IMPORTANT: kapag "" = styles.css, kapag {} = material styles

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
  labelStyle: {
    //NOTE: problem palagi ung text at katapat na selectbox hindi pantay
    paddingTop: "2rem",
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

const Payment = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <div className="divBodyRow">
        <div class="divBodyColumn">
          <div id="info-block">
            <section className="file-marker">
              <div>
                <div className="box-title">LIST OF BANKS</div>
                <div className="box-contents">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <BasicTable />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div class="divBodyColumn">
          <div id="info-block">
            <section className="file-marker">
              <div>
                <div className="box-title">OUTSTANDING BALANCE</div>
                <div className="box-contents">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                      <BasicTable />
                    </Grid>
                  </Grid>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Card id="info-block">
        <section className="file-marker">
          <div>
            <div className="box-title">BANKS FOR PAYMENT</div>
            <div className="box-contents">
              <Grid container spacing={3}>
                <Grid item xs></Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" className={classes.labelStyle}>
                    SELECT BANK:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Paper className={classes.paper} elevation={0}>
                    <ComboBox />
                  </Paper>
                </Grid>
                <Grid item xs></Grid>
              </Grid>
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
    </Fragment>
  );
};

export default Payment;
