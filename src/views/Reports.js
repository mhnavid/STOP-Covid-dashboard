import React, {Component} from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import Card from "../components/Card/Card";
import FormInputs from "../components/FormInputs/FormInputs";
import Tables from "../components/Tables/Tables";

class Reports extends Component {
    render() {
        return (
            <div className="content">
                <Grid>
                    <Row>
                        <Col>
                            <Card
                                content={
                                    <form>
                                        <Row>
                                            <Col md={6}>
                                                <FormInputs
                                                    ncols={["col-md-10"]}
                                                    properties={[
                                                        {
                                                            label:"From Date",
                                                            type:"Date",
                                                            placeholder:"From Date"
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup controlId="formControlsSelect">
                                                    <ControlLabel>Select</ControlLabel>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="1">All</option>
                                                        <option value="2">Musked Faces</option>
                                                        <option value="3">Non Musked</option>
                                                        <option value="4">Social Distancing</option>
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={6}>
                                                <FormInputs
                                                    ncols={["col-md-10"]}
                                                    properties={[
                                                        {
                                                            label:"To Date",
                                                            type:"Date",
                                                            placeholder:"From Date"
                                                        }
                                                    ]}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={8}>
                                                <Button bsStyle="warning btn-fill" type="submit">
                                                    Generate Report
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row>
                        <Col>
                            <Card
                                content={
                                    <Tables
                                        headers={["Face ID", "Time", "Gate Number", "Image URL"]}
                                        tableData={[
                                            ["1", "2", "3", "4"],
                                            ["1", "2", "3", "4"],
                                            ["1", "2", "3", "4"]
                                        ]}
                                    />
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Reports;
