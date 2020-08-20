import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import 'semantic-ui-css/semantic.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-calendar/dist/Calendar.css';
import 'font-awesome/css/font-awesome.min.css';

import AdminLayout from "./layouts/Admin.js";
import './assets/css/style.css';
import SignIn from "./views/SignIn";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/signin" render={props => <SignIn {...props}/>}/>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      {(window.sessionStorage.getItem("key"))?
        <Redirect from="/" to="/admin/dashboard" />
        :
        <Redirect from="/" to="/signin" />
      }
    
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
