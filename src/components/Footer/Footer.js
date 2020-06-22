import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <Grid fluid>
                    <p className="copyright text-center">
                        &copy; {new Date().getFullYear()}{" "}
                        <a href="">
                            HeadBlocks
                        </a>
                    </p>
                </Grid>
            </footer>
        );
    }
}

export default Footer;
