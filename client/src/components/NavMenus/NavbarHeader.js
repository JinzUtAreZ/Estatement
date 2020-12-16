import React, { Fragment } from 'react';
import NavbarPerMenu from './NavbarPerMenu';
import ACircleIcon from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  navbarstyle: {
    marginRight: theme.spacing(2)
  }
}));

const NavbarHeader = () => {
  // const Link1 = ['Home', 'About'];
  // const Link2 = ['ContactUs', 'Create'];
  const Link1Name = [['home', 'Home'], ['about', 'About']];
  // [link, textvalue]
  const Link2Name = [
    ['contactus', 'Contact Us'],
    ['create', 'Create Page'],
    ['profile', 'User Profile']
  ];

  const classes = useStyles();

  return (
    <Fragment>
      {/* <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <TypoGraphy variant="h6" color="inherit">
            Information
          </TypoGraphy> */}
      <List component="nav">
        <ListItem component="div">
          <ListItemText inset>
            <NavbarPerMenu
              className={classes.navbarstyle}
              iconType={ACircleIcon}
              NavName={'Account'}
              //items={Link1}
              items={Link1Name}
            />
          </ListItemText>
          <ListItemText>
            <NavbarPerMenu
              className={classes.navbarstyle}
              iconType={MenuIcon}
              NavName={'Notifications'}
              //items={Link2}
              items={Link2Name}
            />
          </ListItemText>
        </ListItem>
      </List>
      {/* </Toolbar>
      </AppBar>*/}
    </Fragment>
  );
};

export default NavbarHeader;
