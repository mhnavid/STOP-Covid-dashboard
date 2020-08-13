import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Grid fluid>
                    <p className="copyright text-center">
                        &copy; {new Date().getFullYear()}{" "}
                        <a href="https://sigmind.ai/" target="_blank">
                            SIGMIND.ai
                        </a>
                    </p>
                </Grid>
            </footer>
        );
    }
}

export default Footer;
