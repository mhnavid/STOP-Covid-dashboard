import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

class Folders extends Component{
    render() {
        let folders = [];
        for (let i = 0; i < this.props.folderList.length; i++){
            folders.push(
                <Col md={4}>
                    <p  
                        onClick={e => this.props.handleFolderClick(e.currentTarget.dataset.value)}
                        data-value={this.props.folderList[i]}
                        className="pe-7s-folder"
                        style={{fontSize:"36px", cursor:"pointer", marginBottom:"50px"}}>
                        &nbsp;
                        {this.props.folderList[i]}
                    </p>
                </Col>
            );
        }
        return (
            <Row>
                {folders}
            </Row>
        );
    }
}

export default Folders;
