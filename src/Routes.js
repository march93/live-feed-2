import React from "react";
import { Switch } from "react-router-dom";
import AppliedRoute from './containers/AppliedRoute';
import Login from "./containers/Login";
import Streams from "./containers/Streams";
import Video from "./containers/Video";
import Search from "./containers/Search";

export default ({ childProps }) =>
  <Switch>
        <AppliedRoute path="/" exact component={Login} props={childProps} />
        <AppliedRoute path="/streams" exact component={Streams} props={childProps} />
        <AppliedRoute path="/video" exact component={Video} props={childProps} />
        <AppliedRoute path="/messages" exact component={Search} props={childProps} />
  </Switch>;