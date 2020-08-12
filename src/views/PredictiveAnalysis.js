import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Chart from "react-google-charts";
import moment from "moment";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from 'react-spinners/PropagateLoader';

import { StatsCard } from "../components/StatsCard/StatsCard.js";
import Card from "../components/Card/Card";

class PredictiveAnalysis extends Component {
    constructor(props){
        super(props);
        this.state = {
            "countryList":[],
            "selectedCountry":"Bangladesh_cases",
            "allCaseData":[],
            "worldSituationData":[],
            "worldSituationChartShow":false,
        }
    }

    componentDidMount(){
        this.handleWorldSituationDataRequest();
        this.handleMapDataRequest();
    }

    handleMapDataRequest(){
        this.setState({
            "allCaseData":[
                [
                    "Day",
                    "Actual Infections",
                    "Hill Education Forecast",
                    "Hill Forecast Backtest",
                    "Forecast Logistic Backtest",
                    "Active Patients",
                    "Fastest Growth Day"
                ]
            ]
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "country":this.state.selectedCountry
            })
        };
        fetch('https://app.katanaml.io/katana-ml/api/v1.0/forecast/covid19', requestOptions)
            .then(response => response.json())
            .then(data => data.map((val)=>{
                this.setState({
                //   allCaseData: [
                //         ...this.state.allCaseData,
                //         [
                //             moment(val.ds).format('MMM D'),
                //             val.yhat,
                //             val.yhat_lower,
                //             val.yhat_upper,
                //             val.y,
                //             val.y_hill,
                //             val.y_hill_b1,
                //             val.yhat_b1,
                //             val.yhat_b1_lower,
                //             val.yhat_b1_upper,
                //             val.active_patients,
                //             val.fastest_growth_day
                //         ]
                //     ]
                    allCaseData: [
                        ...this.state.allCaseData,
                        [
                            moment(val.ds).format('MMM D'),
                            val.y,
                            val.y_hill,
                            val.y_hill_b1,
                            val.yhat_b1_lower,
                            val.active_patients,
                            val.fastest_growth_day
                        ]
                    ]
                }, ()=> this.setState({
                    "worldSituationChartShow":true
                }));
            }));
    }
    
    handleWorldSituationDataRequest(){
    this.setState({
        "worldSituationData":[
            ["Countries Total", "Countries Stabilized", "Countries Increasing"],
        ]
    });
    fetch("https://app.katanaml.io/katana-ml/api/v1.0/forecast/covid19/stats")
        .then(res => res.json())
        .then(
            (result) => {
                result.map((val)=>{
                    this.setState({
                        "worldSituationData":[
                            ...this.state.worldSituationData,
                            [val.countries_processed, val.countries_stabilized, val.countries_increasing]
                        ]
                    });

                    // console.log(this.state.worldSituationData)
                });
            },
            (error) => {}
        );
    }

    render() {
        return (
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                      content={
                          <div className="ct-chart" style={{height:"100px"}}>
                              {(this.state.worldSituationData.length > 1)?
                              <Chart
                                  width={'100%'}
                                  height={'100%'}
                                  chartType="BarChart"
                                  loader={<div>Loading Chart</div>}
                                  data={this.state.worldSituationData}
                                  options={{
                                      title: 'CURRENT SITUATION',
                                      chartArea: { width: '50%' },
                                      isStacked: true,
                                      hAxis: {
                                          minValue: 0
                                      },
                                      vAxis: {
                                          title: 'Total Countries',
                                      },
                                  }}
                                  rootProps={{ 'data-testid': '1' }}
                              />
                              :
                              <div style={{marginLeft:"50%"}}>
                                  <PropagateLoader
                                      size={10}
                                      color={"#23DFBA"}
                                      loading={true}
                                  />
                              </div>
                              }
                          </div>
                          }
                      />
                  </Col>
              </Row>
              <Row>
                  <Col md={12}>
                      <Card
                          id="chartActivity"
                          content={
                              <div className="ct-chart" style={{height:"500px"}}>
                                  {(this.state.worldSituationChartShow)?
                                      <div style={{height:"100%"}}>
                                      <Chart
                                          width={'100%'}
                                          height={'100%'}
                                          chartType="Line"
                                          loader={<div>Loading Chart</div>}
                                          data={this.state.allCaseData}
                                          options={{
                                              chart: {
                                                  title: 'katanaml covid19 data',
                                                  subtitle: this.state.selectedCountry+' Data'
                                              }
                                          }}
    
                                          rootProps={{ 'data-testid': '2' }}
                                      />
                                      </div>
                                      :
                                      <div style={{marginLeft:"50%"}}>
                                          <RingLoader
                                              size={80}
                                              color={"#23DFBA"}
                                              loading={true}
                                          />
                                      </div>
                                  }
                                  
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

export default PredictiveAnalysis;