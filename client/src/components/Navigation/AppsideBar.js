import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import clsx from "clsx";

import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Proforma from "../Pages/Proforma";
import UploadProforma from "../Pages/UploadProforma";
import Payment from "../Pages/Payment";
import { Link } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    // background: 'rgba(73,155,234,1);'
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const AppbarSidebar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const Link1 = [
    ["AssetList", "chrome_reader_mode"],
    ["Work Request", "list"],
    ["Work Order", "list_alt"],
  ];

  const Link2 = [
    ["Preventive Maintenace", "chrome_reader_mode"],
    ["Maintenance", "build"],
    ["Settings", "settings"],
  ];

  function handleDrawerClose() {
    setOpen(false);
  }
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <h4>Equipment Management System</h4>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="material-icons">home</i>
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {['Asset', 'Work Request', 'Work Order'].map((text, index) => ( */}
          {Link1.map((text, index) => (
            <ListItem button key={text[0]}>
              <ListItemIcon>
                <i className="material-icons">{text[1]}</i>
              </ListItemIcon>
              <ListItemText>
                <Link to={`/${text[0]}`}>{text[0]}</Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="material-icons">commute</i>
            </ListItemIcon>
            <ListItemText primary="SVR" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <i className="material-icons">local_car_wash</i>
            </ListItemIcon>
            <ListItemText primary="Job Order" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {['Preventive Maintenace', 'Maintenance', 'Settings'].map( */}
          {Link2.map((text, index) => (
            <ListItem button key={text[0]}>
              <ListItemIcon>
                <i className="material-icons">{text[1]}</i>
              </ListItemIcon>
              <ListItemText primary={text[0]} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Proforma" component={Proforma} />
          <Route exact path="/UploadProforma" component={UploadProforma} />
          <Route exact path="/Payment" component={Payment} />
        </Switch>
      </main>
    </div>
  );
};

export default AppbarSidebar;
