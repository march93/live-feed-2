import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from './containers/AppliedRoute';
import Login from "./containers/Login";
import Streams from "./containers/Streams";

export default ({ childProps }) =>
  <Switch>
        <AppliedRoute path="/" exact component={Login} props={childProps} />
        <AppliedRoute path="/streams" exact component={Streams} props={childProps} />
  </Switch>;