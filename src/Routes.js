import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './containers/AppliedRoute';
import Login from "./containers/Login";

export default ({ childProps }) =>
  <Switch>
        <AppliedRoute path="/" exact component={Login} props={childProps} />
  </Switch>;