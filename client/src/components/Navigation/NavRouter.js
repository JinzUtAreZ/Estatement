import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Pages/Home";
import Proforma from "../Pages/Proforma";
import UploadProforma from "../Pages/UploadProforma";
import Payment from "../Pages/Payment";
import ProfReport from "../Pages/ProfReport";
import ErrPage from "../ErrorFacility/ErrorPage";
import AdminRoute from "../Navigation/AdminRoute";
import Private from "../Pages/Private";

//FIX: aaysuin ko pa to kung gumagana ung private routes

const NavRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Proforma" component={Proforma} />
      <Route exact path="/UploadProforma" component={UploadProforma} />
      <Route exact path="/Payment" component={Payment} />
      <Route exact path="/ProfReport" component={ProfReport} />

      <AdminRoute exact path="/What" component={Private} />
      <Route component={ErrPage} />
    </Switch>
  );
};

export default NavRouter;
