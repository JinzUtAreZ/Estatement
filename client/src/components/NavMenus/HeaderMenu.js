import React, { Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import logo from "../imageassets/mhcpsi.png";

import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

import history from "../Navigation/History";

// IMPORTANT: complete the estatement form with buttons and table in dashboard

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuStyle: {
    backgroundColor: "#ef6c00", ///NOTE: orange
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    height: "2rem",
    width: "10rem",
  },
  title: {
    //alignSelf: "center"
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerRight: {
    //NOTE: problem palagi ung text at icon hindi pantay eto ang fix
    display: "inline-flex",
    verticalAlign: "middle",
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
  },
  headerOptions: {
    //NOTE: flex-start at spacebetween to pero hindi kaya
    display: "grid",
    paddingLeft: "20px",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "40px",
    columnGap: "20px",
  },
}));

const Header = (props) => {
  //const { history } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Proforma",
      pageURL: "/Proforma",
    },
    {
      menuTitle: "UploadProforma",
      pageURL: "/UploadProforma",
    },
    {
      menuTitle: "Payment",
      pageURL: "/Payment",
    },
    {
      menuTitle: "ProfReport",
      pageURL: "/ProfReport",
    },
    {
      menuTitle: "PrivatePage",
      pageURL: "/What",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.menuStyle}>
        <Toolbar>
          <img src={logo} alt="companylogo" className={classes.logo} />

          {isMobile ? (
            <div className={classes.headerOptions}>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          ) : (
            <Fragment>
              <div className={classes.container}>
                <div className={classes.headerOptions}>
                  <Typography variant="h6" className={classes.title}>
                    ESTATEMENT
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/")}
                  >
                    HOME
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/Proforma")}
                  >
                    Proforma
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/UploadProforma")}
                  >
                    Upload
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/Payment")}
                  >
                    Payment
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/ProfReport")}
                  >
                    Invoice
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleButtonClick("/What")}
                  >
                    Private
                  </Button>
                </div>
                {/* FIX: fixed na to for reference lang */}
                <Typography variant="h6" className={classes.title}>
                  TESTING IF RIGHT{" "}
                  <PermContactCalendarIcon className={classes.headerRight} />
                </Typography>
              </div>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
