import React, {Component} from "react";
import {Col, Grid, Row, ControlLabel, FormControl, FormGroup, Button} from "react-bootstrap";
import moment from "moment";
import Card from "../components/Card/Card";
import Chart from "react-google-charts";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from 'react-spinners/PropagateLoader';
import FormInputs from "../components/FormInputs/FormInputs";

class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSourceDropDownValue: "1",
            cameraList:[],
            cameraDataFromDate:"",
            cameraDataToDate:"",
            selectedCamera:"0",
            inputErrorMessage:"",
            maskClearCount: 0,
            maskMaskedCount: 0,
            allCameraData: []
        }
    }
    componentDidMount() {
        this.handleCameraListRequest();
    }

    handleCameraListRequest() {
        fetch('http://ec2-54-169-134-126.ap-southeast-1.compute.amazonaws.com:4000/api/find-all-camera')
            .then(response => response.json())
            .then((data) => {
                data.data.map((camera)=>{
                    this.setState({
                        cameraList:[
                            ...this.state.cameraList,
                            camera.camera_id
                        ]
                    })
                })
                this.setState({
                    cameraList:this.state.cameraList.sort()
                })
                
                
            },
            (error) => {
                console.log(error)
            })
    }

    handleAllCameraDataRequest() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "camera":this.state.selectedCamera
            })
        };

        fetch('http://ec2-54-169-134-126.ap-southeast-1.compute.amazonaws.com:4000/api/details-by-camera', requestOptions)
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    allCameraData:data.data
                }, () => this.handleDateWiseMaskStatusValues())
            },
            (error) => {
                console.log(error)
            })
    }

    handleDateWiseMaskStatusValues() {
        let dates = this.getDatesBetweenDates(this.state.cameraDataFromDate, this.state.cameraDataToDate);
        let tempMaskClearCount = 0, tempMaskMaskedCount = 0;
        for(let i = 0; i < dates.length; i++){
            this.state.allCameraData.map((value)=> {
                if(moment(dates[i]).format("YYYY-MM-DD") === moment(value.date_time.split(' ')[0]).format("YYYY-MM-DD")) {
                    if(value.mask_status === "clear"){
                        tempMaskClearCount += 1;
                      }
                      else if(value.mask_status === "masked"){
                        tempMaskMaskedCount += 1;
                      }
                }
            })
        }
        this.setState({
            maskClearCount: tempMaskClearCount,
            maskMaskedCount: tempMaskMaskedCount
          })
        
    }
    
    // handleCountrySelect(e, {value}){
    //     // console.log(value)
    //     this.setState({
    //         "selectedCountry":value,
    //         "allData":[],
    //         "worldSituationChartShow":false
    //     }, ()=> this.handleMapDataRequest())
    // }

    handleDataSourceDropdown(e) {
        this.setState({
            dataSourceDropDownValue: e.target.value
        })
    }

    handleCameraSelectDropdown(e) {
        this.setState({
            selectedCamera: e.target.value
        })
    }

    handleCameraDataFromDate(e) {
        this.setState({
            cameraDataFromDate: new Date(e.target.value)
        })
    }

    handleCameraDataToDate(e) {
        this.setState({
            cameraDataToDate: new Date(e.target.value)
        })
    }

    handleGenerateResultButton() {
        if(this.state.cameraDataFromDate === "") {
            this.setState({ inputErrorMessage: "From date not selected." })
        }
        if(this.state.cameraDataToDate === "") {
            this.setState({ inputErrorMessage: "To date not selected." })
        }
        else {
            this.handleAllCameraDataRequest();
        }
    }

    getDatesBetweenDates = (startDate, endDate) => {
        let dates = []
        //to avoid modifying the original date
        const theDate = new Date(startDate)
        while (theDate < endDate) {
          dates = [...dates, new Date(theDate)]
          theDate.setDate(theDate.getDate() + 1)
        }
        return dates;
      }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col>
                            <Card
                                content= {
                                    <div>
                                        <Row>
                                            <Col md={5}>
                                                <FormGroup controlId="dataSourceSelect">
                                                    <ControlLabel>Select</ControlLabel>
                                                    <FormControl 
                                                        componentClass="select" 
                                                        placeholder="select"
                                                        onChange={(e) => this.handleDataSourceDropdown(e)}>
                                                        <option value="1">From Camera</option>
                                                        <option value="2">From Location</option>
                                                    </FormControl>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {(this.state.dataSourceDropDownValue === "2")?
                                            <div>Under development.</div> 
                                            :
                                            <Row>
                                                <Col md={3}>
                                                    <FormGroup controlId="dataSourceSelect">
                                                        <ControlLabel>Select</ControlLabel>
                                                        <FormControl 
                                                            componentClass="select" 
                                                            placeholder="select"
                                                            onChange={(e) => this.handleCameraSelectDropdown(e)}>
                                                            {
                                                                this.state.cameraList.map((camera, key) => {
                                                                return <option value={camera} key={key}>Camera {camera}</option>
                                                                })
                                                            }
                                                        </FormControl>
                                                    </FormGroup>
                                                </Col>

                                                <Col md={3}>
                                                    <FormGroup>
                                                        <ControlLabel>From Date</ControlLabel>
                                                        <FormControl 
                                                            type="date" 
                                                            placeholder="From Date" 
                                                            onChange={(e) => this.handleCameraDataFromDate(e)}/>
                                                    </FormGroup>
                                                </Col>

                                                <Col md={3}>
                                                    <FormGroup>
                                                        <ControlLabel>To Date</ControlLabel>
                                                        <FormControl 
                                                            type="date" 
                                                            placeholder="To Date" 
                                                            onChange={(e) => this.handleCameraDataToDate(e)}/>
                                                    </FormGroup>
                                                </Col>

                                                <Col md={3}>
                                                    <br/>
                                                    <Button bsStyle="warning btn-fill" type="submit" 
                                                        onClick={() => this.handleGenerateResultButton()}>
                                                        Generate Result
                                                    </Button>
                                                </Col>
                                            </Row>
                                        }
                                        
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    
                    <Row>
                        {(this.state.maskMaskedCount === 0 && this.state.maskClearCount === 0)?
                            
                            <div></div>
                            :
                            <Card
                                id="chartActivity"
                                title="Mask status"
                                // category={this.state.maskChartCategoryText}
                                // stats=""
                                // statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart" style={{height:"350px"}}>  
                                        <Chart
                                        chartType="PieChart"
                                        loader={<div>Loading Chart</div>}
                                        data={[["Mask Status", "Count"], ["Masked", this.state.maskMaskedCount], ["Clear", this.state.maskClearCount]]}
                                        options={pieOptions}
                                        graph_id="PieChart"
                                        width={"100%"}
                                        height={"100%"}
                                        legend_toggle
                                        />
                                    </div>
                                }
                            />
                        }
                        
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Visualization;


const pieOptions = {
    title: "",
    pieHole: 0.6,
    slices: [
      {
        color: "#2BB673"
      },
      {
        color: "#d91e48"
      },
      {
        color: "#007fad"
      },
      {
        color: "#e9a227"
      }
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 16
      }
    },
    tooltip: {
      showColorCode: true
    },
    chartArea: {
      left: 0,
      top: 10,
      width: "100%",
      height: "80%"
    }
  };
  