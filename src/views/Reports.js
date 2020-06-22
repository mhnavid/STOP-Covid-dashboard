import React, {Component} from "react";
import {Button, Col, Grid, Row} from "react-bootstrap";
import Card from "../components/Card/Card";
import FormInputs from "../components/FormInputs/FormInputs";
import Tables from "../components/Tables/Tables";

class Reports extends Component {
    render() {
        return (
            <div className="content">
                <Grid>
                    <Row>
                        <Col md={8}>
                            <Card
                                content={
                                    <form>
                                        <FormInputs
                                            ncols={["col-md-5"]}
                                            properties={[
                                                {
                                                    label:"From Date",
                                                    type:"Date",
                                                    placeholder:"From Date"
                                                }
                                            ]}
                                        />
                                        <FormInputs
                                            ncols={["col-md-5"]}
                                            properties={[
                                                {
                                                    label:"To Date",
                                                    type:"Date",
                                                    placeholder:"From Date"
                                                }
                                            ]}
                                        />
                                        <Button bsStyle="warning btn-fill" type="submit">
                                            Generate Report
                                        </Button>
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
