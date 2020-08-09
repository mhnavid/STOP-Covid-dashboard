import React, {Component} from "react";
import {Col, Grid, Row, Image} from "react-bootstrap";
import Card from "../components/Card/Card";
import Folders from "../components/Folders/Folders";
import Images from "../components/Images/Images";

class ImageBank extends Component{
    constructor(props){
        super(props);
        this.state = {
            allDivisionDistrict:[],
            folderList:[],
            imageList:[],
            divisionSelected: false,
            districtSelected: false
        }

        this.handleFolderClick = this.handleFolderClick.bind(this);
    }

    componentDidMount(){
        this.getDataDivisionDistrictData();
    }

    getPersonByDistrict(district) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ district: district })
        };
        fetch('http://ec2-54-169-134-126.ap-southeast-1.compute.amazonaws.com:4000/api/person-by-district', requestOptions)
            .then(response => response.json())
            .then(data => {
                data.data.map((value) => {
                    let images = [];
                    if ( value.person !== ""){
                        images.push(
                            <Col md={3}>
                                <div style={{marginBottom:"30px"}}>
                                    <Image src={`data:image/jpeg;base64,${value.person}`} responsive rounded/>
                                </div>
                            </Col>    
                        )
                    }
                    this.setState({
                        imageList: [this.state.imageList, images]
                    })
                })
                console.log(data.data)
            });
    }

    getDataDivisionDistrictData() {
        fetch('http://ec2-54-169-134-126.ap-southeast-1.compute.amazonaws.com:4000/api/division-district-data')
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    allDivisionDistrict:data.data
                })
                data.data.map((value) => {
                    this.setState({
                        folderList: [...this.state.folderList, value.division]
                    })
                })
            })
    }

    handleFolderClick = (e) => {
        if (!this.state.divisionSelected){
            this.setState({
                folderList:[],
                divisionSelected:true
            }, () => this.getDistrictList(e));
        } else {
            this.setState({
                districtSelected: true
            }, () => this.getPersonByDistrict(e));
        }
    }

    getDistrictList(division) {
        for(let i = 0; i< this.state.allDivisionDistrict.length; i++){
            if (this.state.allDivisionDistrict[i].division === division){
                this.setState({
                    folderList: [...this.state.folderList, this.state.allDivisionDistrict[i].district]
                })
            }
        }
    }

    handleBackButtonClick(){
        this.setState({
            allDivisionDistrict:[],
            folderList:[],
            imageList:[],
            divisionSelected: false,
            districtSelected: false
        }, () => this.getDataDivisionDistrictData());
    }

    render() {
        return (
            <div className="content">
                <Grid>
                    {(this.state.divisionSelected)?
                        <Row>
                            <Col>
                                <div>
                                    <p 
                                        onClick={this.handleBackButtonClick.bind(this)}
                                        className="pe-7s-back"  
                                        style={{fontSize:"36px", cursor:"pointer", marginBottom:"20px"}}>
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        : ""
                    }
                    
                    <Row>
                        <Col>
                            <Card
                                content={
                                    (!this.state.divisionSelected || !this.state.districtSelected)? 
                                        <Folders
                                            handleFolderClick = {this.handleFolderClick}
                                            // folderList={[
                                            //     "Wari", "Jhigatola", "East Rajabazar", "Mohammadpur", "Rampura", "West Rajabazar",
                                            //     "Banani", "Mohakhali"
                                            // ]}
                                            folderList = {
                                                this.state.folderList
                                            }
                                        
                                        /> 
                                        :
                                        <Images 
                                            imageList = {this.state.imageList}
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
