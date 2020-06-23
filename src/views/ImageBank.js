import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";
import Card from "../components/Card/Card";
import Folders from "../components/Folders/Folders";

class ImageBank extends Component{
    render() {
        return (
            <div className="content">
                <Grid>
                    <Row>
                        <Col>
                            <Card
                                content={
                                    <Folders
                                        folderList={[
                                            "Wari", "Jhigatola", "East Rajabazar", "Mohammadpur", "Rampura", "West Rajabazar",
                                            "Banani", "Mohakhali"
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

export default ImageBank;
