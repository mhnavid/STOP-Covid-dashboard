import React, {Component} from "react";
import {Col, Row, Image} from "react-bootstrap";
import ClockLoader from "react-spinners/ClockLoader";

class Images extends Component{
    render() {
        let images = [];
        for (let i = 0; i < this.props.imageList.length; i++){
            images.push(
                <div>
                    {this.props.imageList[i]}
                </div>
            );
        }
        return (
            <div>
                {(this.props.imageList.length === 0)?
                    <Row>
                        <div style={{marginLeft:"46%"}}>
                            <ClockLoader
                                size={100}
                                color={"#23DFBA"}
                                loading={true}
                            />
                        </div>
                    </Row>
                    :
                    <Row>
                        {images}
                    </Row>
                }
            </div>
        );
    }
}

export default Images;
