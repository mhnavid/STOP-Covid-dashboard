import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import Chart from "react-google-charts";
import moment from "moment";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from 'react-spinners/PropagateLoader';

import { StatsCard } from "../components/StatsCard/StatsCard.js";
import {
  dataPie,
  legendPie,
  // dataSales,
  // optionsSales,
  // responsiveSales,
  // legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.js";
import Card from "../components/Card/Card";
import CovidData from "./sub_views/CovidData/CovidData.js";

class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      maskClearCount: 0,
      maskMaskedCount: 0,
      maskChartCategoryText:"",
      allData:[],
      totalMasked:0,
      totalNonMasked:0,
      maskChartMessage:"Loading Data...",
      selectedDate: new Date()
    }
  }

  componentDidMount(){
    this.allDataRequest();
  }

  allDataRequest() {
    fetch('http://ec2-15-206-174-242.ap-south-1.compute.amazonaws.com:4000/api/all-camera-data')
      .then(response => response.json())
      .then((data) => {
        this.setState({
          allData: data.data,
          maskChartCategoryText:"Based on total Data"
        });
        data.data.map((value) => {
          if(value.mask_status === "clear"){
            this.setState({
              maskClearCount: this.state.maskClearCount+1,
              totalMasked: this.state.totalMasked+1
            })
          }
          else if(value.mask_status === "masked"){
            this.setState({
              maskMaskedCount: this.state.maskMaskedCount+1,
              totalNonMasked: this.state.totalNonMasked+1,
            })
          }
        })
      },
      (error) => {
        console.log(error)
      })
  }

  onDateChange = (date) => {
    date = moment(date).format("YYYY-MM-DD")
    this.setState({
      selectedDate: date,
      maskClearCount: 0,
      maskMaskedCount: 0,
      maskChartCategoryText: "Based on " + moment(date).format("MMM DD") +" data"
    }, () => this.handleMaskDataByDate())
  }

  handleMaskDataByDate() {
    let tempMaskClearCount = 0, tempMaskMaskedCount = 0;
    this.state.allData.map((value) => {
      if(value.date_time.split(' ')[0] === this.state.selectedDate.toString()){
        if(value.mask_status === "clear"){
          tempMaskClearCount += 1;
        }
        else if(value.mask_status === "masked"){
          tempMaskMaskedCount += 1;
        }
      }
    })
    if(tempMaskClearCount === 0 && tempMaskMaskedCount === 0){
      this.setState({ maskChartMessage: "No Data Found" })
    } else {
      this.setState({
        maskClearCount: tempMaskClearCount,
        maskMaskedCount: tempMaskMaskedCount
      })
    }
    
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={4} md={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="Total Face Detected"
                statsValue={this.state.allData.length}
              />
            </Col>
            <Col lg={4} md={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph3 text-success" />}
                statsText="Total Masked Faces"
                statsValue={this.state.totalMasked}
              />
            </Col>
            <Col lg={4} md={4} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="Total Non Masked Faces"
                statsValue={this.state.totalNonMasked}
              />
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-refresh-2 text-primary" />}
                statsText="TOTAL DISTANCING"
                statsValue="0"
              />
            </Col> */}
          </Row>
          <Row>
          
            {/* <Col md={4}>
              <Card
                    id="chartActivity"
                    title="Mask status"
                    category={this.state.maskChartCategoryText}
                    // stats=""
                    // statsIcon="fa fa-check"
                    content={
                      <div>
                        {(this.state.maskMaskedCount === 0 && this.state.maskClearCount === 0)?
                      
                        <div>{this.state.maskChartMessage}</div>
                          :
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
                      </div>
                    }
                  />
            </Col> */}
            {/* <Col md={4}> */}
              {/* <Card
                  statsIcon="fa fa-clock-o"
                  title="Email Statistics"
                  category="Last Campaign Performance"
                  stats="Campaign sent 2 days ago"
                  content={
                    <div
                        id="chartPreferences"
                        className="ct-chart ct-perfect-fourth"
                        style={{fontSize:"10px"}}
                    >
                      <ChartistGraph data={dataPie} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
              /> */}
            {/* </Col> */}
            {/* <Col md={4}>
              <Card
                // statsIcon="pe-7s-clock"
                title="Calender"
                category="Statistics date"
                // stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <Calendar
                        // defaultValue={[new Date(2020, 6, 1), new Date(2020, 6, 20)]}
                        defaultView="month"
                        onChange={this.onDateChange}
                    />
                  </div>
                }
              />
            </Col> */}
          </Row>

          {/*<Row>*/}
          {/*  <Col md={6}>*/}
          {/*    <Card*/}
          {/*      id="chartActivity"*/}
          {/*      title="2014 Sales"*/}
          {/*      category="All products including Taxes"*/}
          {/*      stats="Data information certified"*/}
          {/*      statsIcon="fa fa-check"*/}
          {/*      content={*/}
          {/*        <div className="ct-chart">*/}
          {/*          <ChartistGraph*/}
          {/*            data={dataBar}*/}
          {/*            type="Bar"*/}
          {/*            options={optionsBar}*/}
          {/*            responsiveOptions={responsiveBar}*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      }*/}
          {/*      legend={*/}
          {/*        <div className="legend">{this.createLegend(legendBar)}</div>*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </Col>*/}

          {/*  <Col md={6}>*/}
          {/*    <Card*/}
          {/*      title="Tasks"*/}
          {/*      category="Backend development"*/}
          {/*      stats="Updated 3 minutes ago"*/}
          {/*      statsIcon="fa fa-history"*/}
          {/*      content={*/}
          {/*        <div className="table-full-width">*/}
          {/*          <table className="table">*/}
          {/*            <Tasks />*/}
          {/*          </table>*/}
          {/*        </div>*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </Col>*/}
          {/*</Row>*/}

          <Row>
            <Card 
              content={
                <div>
                  <CovidData />
                </div>
              }
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;

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
