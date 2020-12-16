import React from "react";
import "./App.css";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import soaReducer from "./redux/reducers/soaReducers";

import { makeStyles } from "@material-ui/core/styles";

import Header from "./components/NavMenus/HeaderMenu";
import NavRoutes from "./components/Navigation/NavRouter";
import history from "./components/Navigation/History";

import { Router } from "react-router-dom";
const useStyles = makeStyles({});

const rootReducer = combineReducers({
  soa: soaReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Header />
          <NavRoutes />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

// FIX: pwede ding router to
{
  /* <Switch>
<Route exact from="/" render={(props) => <Home {...props} />} />
<Route
  exact
  path="/Proforma"
  render={(props) => <Proforma {...props} />}
/>
<Route
  exact
  path="/UploadProforma"
  render={(props) => <UploadProforma {...props} />}
/>
<Route exact path="/Payment" render={(props) => <Payment {...props} />} />
<Route
  exact
  path="/ProfReport"
  render={(props) => <ProfReport {...props} />}
/>
</Switch> */
}
