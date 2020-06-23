import React from "react";
import {Col, Row} from "react-bootstrap";

function ApplicationName() {
    return (
        <div style={{width:"90%"}}>
            <Row>
                <Col className="text-center" style={{fontSize:"22px", marginTop:"10px"}}>
                    <span className="text-danger"><b>STOP</b> </span>
                    <span><b>Covid</b></span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p className="text-center">
                        <span style={{color:"#ec823a"}}>S</span>urveillance <span style={{color:"#ec823a"}}>T</span>echnology
                        <br/>
                        to <span style={{color:"#ec823a"}}>O</span>vercome <span style={{color:"#ec823a"}}>P</span>andamic
                    </p>

                </Col>
            </Row>
        </div>
    );
}

export default ApplicationName;
