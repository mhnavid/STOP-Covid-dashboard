import React, { Component } from "react";
import UserImage from '../../assets/img/faces/face-0.jpg';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Image,
    MenuItem,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    OverlayTrigger,
    Popover
} from "react-bootstrap";

class AdminNavbarLinks extends Component {
    constructor(props) {
        super(props);
        this.signOutButtonClickHandle = this.signOutButtonClickHandle.bind(this);
    }

    signOutButtonClickHandle() {
        sessionStorage.clear();
        this.props.history.push('/signin');
    }

    render() {
        const notification1 = (
            <div>
                <i className="pe-7s-mail" />
                <b className="caret" />
                <span className="notification">5</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );
        const notification2 = (
            <div>
                <i className="icon-big pe-7s-bell" />
                <b className="caret" />
                <span className="notification">4</span>
                <p className="hidden-lg hidden-md">Notification</p>
            </div>
        );

        const popoverUserDetails = (
            <Popover id="popover-positioned-bottom" title="User details">
                <div style={{width:"180px", textAlign: "center"}}>
                    <p>
                        <span>System Admin</span>
                    </p>
                    <Button bsStyle="danger" onClick={this.signOutButtonClickHandle}>SIGN OUT</Button>
                </div>
            </Popover>
        );

        return (
            <div>
                <Nav pullRight>
                    <NavDropdown
                        eventKey={1}
                        title={notification1}
                        noCaret
                        id="basic-nav-dropdown"
                    >
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                        <MenuItem eventKey={2.5}>Another notifications</MenuItem>
                    </NavDropdown>
                    <NavDropdown
                        eventKey={2}
                        title={notification2}
                        noCaret
                        id="basic-nav-dropdown"
                    >
                        <MenuItem eventKey={2.1}>Notification 1</MenuItem>
                        <MenuItem eventKey={2.2}>Notification 2</MenuItem>
                        <MenuItem eventKey={2.3}>Notification 3</MenuItem>
                        <MenuItem eventKey={2.4}>Notification 4</MenuItem>
                    </NavDropdown>
                    <Navbar.Text eventKey={3}>
                        <span>System Admin</span>
                    </Navbar.Text>
                    <OverlayTrigger eventKey={4} trigger="click" placement="bottom" overlay={popoverUserDetails}>
                        <NavItem>
                            <Image src={UserImage} circle style={{height:"28px", width:"28px"}}/>
                        </NavItem>

                    </OverlayTrigger>
                </Nav>
            </div>
        );
    }
}

export default withRouter(AdminNavbarLinks);
