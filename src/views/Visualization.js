import React, {Component} from "react";
import {Col, Grid, Row} from "react-bootstrap";
import moment from "moment";
import Card from "../components/Card/Card";
import Chart from "react-google-charts";
import {Dropdown} from "semantic-ui-react";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from 'react-spinners/PropagateLoader';

class Visualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "countryList":[],
            "selectedCountry":"Bangladesh_cases",
            "allData":[],
            "worldSituationData":[],
            "worldSituationChartShow":false,
        }
    }
    componentDidMount() {
        this.handleWorldSituationDataRequest();
        this.handleMapDataRequest();
    //     fetch("https://app.katanaml.io/katana-ml/api/v1.0/forecast/covid19/countries")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 result.map((val)=>{
    //                     this.state.countryList.push({"key":val["0"], "value":val["0"], "text":val[0].replace("_cases", "")});
    //                 });
    //                 if (this.state.countryList !== []){
    //                     this.setState({
    //                         "selectedCountry": this.state.countryList[0].value
    //                     },()=> this.handleMapDataRequest());
    //                     // console.log(this.state.countryList[0].value)
    //                 }
    //             },
    //             (error) => {}
    //         );
    }

    handleMapDataRequest(){
        this.setState({
            "allData":[
                [
                    "Day",
                    "yhat",
                    "yhat_lower",
                    "yhat_upper",
                    "y",
                    "y_hill",
                    "y_hill_b1",
                    "yhat_b1",
                    "yhat_b1_lower",
                    "yhat_b1_upper",
                    "active_patients",
                    "fastest_growth_day"
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
                    allData: [
                        ...this.state.allData,
                        [
                            moment(val.ds).format('MMM D'),
                            val.yhat,
                            val.yhat_lower,
                            val.yhat_upper,
                            val.y,
                            val.y_hill,
                            val.y_hill_b1,
                            val.yhat_b1,
                            val.yhat_b1_lower,
                            val.yhat_b1_upper,
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

    // handleCountrySelect(e, {value}){
    //     // console.log(value)
    //     this.setState({
    //         "selectedCountry":value,
    //         "allData":[],
    //         "worldSituationChartShow":false
    //     }, ()=> this.handleMapDataRequest())
    // }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        {/* <Col md={4}>
                            <Card
                                content={
                                    <div>
                                        <Dropdown
                                            placeholder='Select Country'
                                            fluid
                                            search
                                            selection
                                            value={this.state.selectedCountry}
                                            options={this.state.countryList}
                                            onChange={this.handleCountrySelect.bind(this)}
                                        />
                                    </div>
                                }
                            />
                        </Col> */}
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
                                        <div style={{marginLeft:"40%"}}>
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
                                            <Chart
                                                width={'100%'}
                                                height={'100%'}
                                                chartType="Line"
                                                loader={<div>Loading Chart</div>}
                                                data={this.state.allData}
                                                options={{
                                                    chart: {
                                                        title: 'katanaml covid19 data',
                                                        subtitle: this.state.selectedCountry+' Data'
                                                    }
                                                }}

                                                rootProps={{ 'data-testid': '2' }}
                                            />
                                            :
                                            <div style={{marginLeft:"50%", marginTop:"30%"}}>
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

export default Visualization;
