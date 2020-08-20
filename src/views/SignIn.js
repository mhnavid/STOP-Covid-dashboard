import React, { Component } from "react";
import { Grid, Row, Col, FormGroup, FormControl, Button, Alert } from "react-bootstrap";
import Card from "../components/Card/Card";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password:"",
            showAlert: false,
            alertMessage: "",
            user: true
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFromSubmit     = this.handleFromSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleFromSubmit(e) {
        e.preventDefault();
        if(this.state.username === "" || 
            this.state.password === "") {
                this.setState({
                    alertMessage: "Please fill up username and password.",
                    showAlert: true
                })
        } else {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "user": this.state.username,
                    "pass": this.state.password
                })
            };
    
            fetch('http://localhost:4000/api/find-user', requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if(data.error === false && data.user === true) {
                        window.sessionStorage.setItem("key", this.state.username);
                        this.props.history.push('/admin/dashboard')
                    } else {
                        this.setState({
                            alertMessage: "Wrong username or password.",
                            showAlert: true
                        })
                    }
                },
                (error) => {
                    console.log(error)
                })
        }
    }

    render() {
        if(window.sessionStorage.getItem("key")) {
            return <Redirect to="/" />
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6} lg={4} sm={10} mdOffset={3} smOffset={1} lgOffset={4} style={{marginTop:"30vh"}}>
                            <Card
                                content={
                                    <form onSubmit={this.handleFromSubmit}>
                                        <Row style={{textAlign:"center", paddingLeft:"20px", paddingRight:"20px"}}>
                                            <Col style={{marginBottom:"20px"}}>
                                                <span style={{fontSize:"22px", fontWeight:"800"}}>
                                                    SIGN IN
                                                </span>
                                            </Col>
                                            <Col style={{marginBottom:"20px"}}>
                                                <FormGroup>
                                                    <FormControl
                                                        type="text"
                                                        value={this.state.username}
                                                        placeholder="Enter Your Username"
                                                        onChange={this.handleUsernameChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col style={{marginBottom:"20px"}}>
                                                <FormGroup>
                                                    <FormControl
                                                        type="password"
                                                        value={this.state.password}
                                                        placeholder="Enter Your Password"
                                                        onChange={this.handlePasswordChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <Button bsStyle="success" type="submit">Sign In</Button>
                                            </Col>
                                            {(this.state.showAlert)?
                                                <Col style={{marginTop:"20px"}}>
                                                    <Alert bsStyle="danger">
                                                        {this.state.alertMessage}
                                                    </Alert>
                                                </Col>
                                                : ""
                                            }
                                        </Row>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default SignIn;