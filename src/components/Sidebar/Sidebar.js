import React, { Component } from "react";
import { NavLink } from "react-router-dom";


import logo from "../../assets/img/reactlogo.png";
import ApplicationName from "../ApplicationName/ApplicationName";
import AdminNavbarLinks from "../Navbars/AdminNavLinks";
import {MenuItem, NavDropdown} from "react-bootstrap";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      collapse:false
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  handleDropdown(){
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
      >
        <div className="logo">
          <a
            href=""
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href=""
            className="simple-text logo-normal"
          >
            HeadBlocks
          </a>
        </div>
        <div className="sidebar-wrapper">
          <div>
            <ApplicationName/>
          </div>
          <ul className="nav">
            {/*<NavDropdown*/}
            {/*    eventKey={3}*/}
            {/*    title="Dropdown"*/}
            {/*    id="basic-nav-dropdown"*/}
            {/*    aria-expanded="true">*/}
            {/*  <MenuItem eventKey={3.1}>Action</MenuItem>*/}
            {/*  <MenuItem eventKey={3.2}>Another action</MenuItem>*/}
            {/*  <MenuItem eventKey={3.3}>Something else here</MenuItem>*/}
            {/*  <MenuItem divider />*/}
            {/*  <MenuItem eventKey={3.4}>Separated link</MenuItem>*/}
            {/*</NavDropdown>*/}

            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect) {
                return (
                    <li
                        className={
                          this.activeRoute(prop.layout + prop.path)
                        }
                        key={key}
                    >
                      <NavLink
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                      >
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
