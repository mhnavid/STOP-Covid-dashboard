import React, {Component} from 'react';
import {Row, Col } from "react-bootstrap";

class CovidDataCard extends Component {
    render() {
        let cardValueStatus = "";
        if(this.props.cardValueStatusClass === "negative") {
            cardValueStatus = <small style={{ color: "red" }}>(+{this.props.cardValueStatus})</small>
        } else {
            cardValueStatus = <small style={{ color: "green" }}>(+{this.props.cardValueStatus})</small>;
        }
        return (
            <div className="card card-stats">
                <div className="content">
                    <Row>
                        <Col xs={5}>
                            <div className="icon-big text-center icon-warning">
                                <img height="56" width="56" alt={this.props.iconAlt} src={this.props.iconSrc} />
                            </div>
                        </Col>
                        <Col xs={7}>
                            <div className="d-inline-block text-center w-100">
                                <div style={{ fontWeight:"400", color:"grey" }}>
                                    <span>{this.props.cardText}</span>
                                </div>
                                
                                <div style={{ fontWeight:"700" }}>
                                    <h3>
                                        <b>{this.props.cardValue}</b>
                                        {(this.props.cardValueStatus !== "")?
                                            <span>
                                                {cardValueStatus}
                                            </span>    
                                            : ""
                                        }
                                        
                                    </h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default CovidDataCard;

const style = {
    negative: {
        
    }
}