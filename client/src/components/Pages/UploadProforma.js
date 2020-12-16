import React from "react";
import ComboBox from "../SelectOption/ComboBox";
import { makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import BasicTable from "../Tables/BasicTable";
import Button from "@material-ui/core/Button";
import FileUploader from "../Uploader/FileUpload";

// IMPORTANT: kapag "" = styles.css, kapag {} = material styles
const useStyles = makeStyles((theme) => ({
  container: { marginTop: "1rem" },
  labelStyle: {
    //NOTE: problem palagi ung text at katapat na selectbox hindi pantay
    paddingTop: "1rem",
  },
  buttonStyle: {
    //NOTE: problem palagi ung text at katapat na selectbox hindi pantay
    margin: theme.spacing(1),
    backgroundColor: "#ef6c00",
    color: "#fff",
    borderBottom: "3px solid #9e9e9e",
    "&:hover": {
      backgroundColor: "#ffc107",
      borderBottom: "3px solid #263238",
    },
  },
}));
const UploadProforma = () => {
  const classess = useStyles();
  return (
    <Card id="info-block">
      <section className="file-marker">
        <div>
          <div className="box-title">Proforma Billing</div>
          <div className="box-contents">
            <div className={classess.container}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant="subtitle1"
                    className={classess.labelStyle}
                  >
                    Document Type
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ComboBox />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant="subtitle1"
                    className={classess.labelStyle}
                  >
                    Document
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className="container mt-4">
                    <h4 className="display-4 text-center mb-4">
                      <i className="fab fa-react" /> React File Upload
                    </h4>
                    {/* FIX: gagawin ko pa ung file uploadtest.js */}
                    <FileUploader />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <Typography
                    variant="subtitle1"
                    className={classess.labelStyle}
                  >
                    Comments
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <ComboBox />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classess.buttonStyle}
                  >
                    Add attachment
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <BasicTable />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </Card>
  );
};

export default UploadProforma;
