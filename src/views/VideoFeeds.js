import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "../components/Card/Card";

class VideoFeeds extends Component {

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                title="STOP-COVID Field Trial at Kawran Bazar"
                                content={
                                    <div style={{ padding:"5px 30px" }}>
                                        <iframe 
                                            width="100%" 
                                            height="420" 
                                            src="https://www.youtube.com/embed/86WspkDtXrU" 
                                            frameborder="0" 
                                            title="video"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowfullscreen >
                                        </iframe>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default VideoFeeds;