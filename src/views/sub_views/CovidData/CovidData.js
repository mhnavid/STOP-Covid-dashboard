import React, {Component} from 'react';
import { Grid, Row, Col } from "react-bootstrap";
import Chart from "react-google-charts";
import CovidDataCard from '../../../components/CovidDataCard/CovidDataCard';

class CovidData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            covidDataLastUpdate: 0,
            covidDataTotalCases: 0,
            covidDataTodayCases: 0,
            covidDataTotalDeaths: 0,
            covidDataTodayDeaths: 0,
            covidDataTotalRecovered: 0,
            covidDataTodayRecovered: 0,
            covidDataTotalActive: 0,
            covidDataTodayActive: 0,
            covidDataTotalCritical: 0,
            covidDataTodayCritical: 0,
            covidDataCasesPerMillion: 0,
            covidDataCasesPerMillionToday: 0,
            covidDataDeathsPerMillion: 0,
            covidDataDeathsPerMillionToday: 0,
            covidDataTotalTests: 0,
            covidDataTodayTests:0
        }
    }

    componentDidMount() {
        this.handleCovidDataRequest();
    }

    handleCovidDataRequest() {
        fetch("https://corona.lmao.ninja/v2/countries/Bangladesh?yesterday=false&strict=true&query=Bangladesh")
            .then(response => response.json())
            .then((data) => {
                let updateTime = parseInt(Math.floor(Date.now() - data.updated)/(1000*60)%60);
                this.setState({
                    covidDataLastUpdate: updateTime,
                    covidDataTotalCases: data.cases,
                    covidDataTodayCases: data.todayCases,
                    covidDataTotalDeaths: data.deaths,
                    covidDataTodayDeaths: data.todayDeaths,
                    covidDataTotalRecovered: data.recovered,
                    covidDataTodayRecovered: data.todayRecovered,
                    covidDataTotalActive: data.active,
                    covidDataTotalCritical: data.critical,
                    covidDataCasesPerMillion: data.casesPerOneMillion,
                    covidDataDeathsPerMillion: data.deathsPerOneMillion,
                    covidDataTotalTests: data.tests
                }, () => this.handleCovidDataYesterdayRequest())
            },
            (error) => {
                console.log(error)
            })
    }

    handleCovidDataYesterdayRequest() {
        fetch("https://corona.lmao.ninja/v2/countries/Bangladesh?yesterday=true&strict=true&query=Bangladesh")
            .then(response => response.json())
            .then((data) => {
                this.setState({
                    covidDataTodayActive: parseInt(this.state.covidDataTotalActive) - parseInt(data.active),
                    covidDataTodayCritical: parseInt(this.state.covidDataTotalCritical) - parseInt(data.critical),
                    covidDataCasesPerMillionToday: parseInt(this.state.covidDataCasesPerMillion) - parseInt(data.casesPerOneMillion),
                    covidDataDeathsPerMillionToday: parseInt(this.state.covidDataDeathsPerMillion) - parseInt(data.deathsPerOneMillion),
                    covidDataTodayTests: parseInt(this.state.covidDataTotalTests) - parseInt(data.tests)
                })
            },
            (error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <Grid fluid>
                <Row  className="center-block ">
                    <Col md={6} lg={6} sm={12} xsOffset={3} style={{ marginBottom:"30px" }}>
                        <div className="content text-center">
                            <h2><b>Covid Detail</b></h2>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="bangladesh"
                            iconSrc="https://disease.sh/assets/img/flags/bd.png"
                            cardText="Country"
                            cardValue="Bangladesh"
                            cardValueStatus=""
                            cardValueStatusClass=""
                        />
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="time"
                            iconSrc="https://img.icons8.com/color/96/000000/historical.png"
                            cardText="Last Updated"
                            cardValue={this.state.covidDataLastUpdate + " minutes"}
                            cardValueStatus=""
                            cardValueStatusClass=""
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="doctor-bag"
                            iconSrc="https://img.icons8.com/color/96/000000/doctors-bag.png"
                            cardText="Total Cases"
                            cardValue={this.state.covidDataTotalCases}
                            cardValueStatus={this.state.covidDataTodayCases}
                            cardValueStatusClass={(this.state.covidDataTodayCases > 0)? "negative": "positive"}
                        />
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="cemetery"
                            iconSrc="https://img.icons8.com/color/96/000000/cemetery.png"
                            cardText="Total Deaths"
                            cardValue={this.state.covidDataTotalDeaths}
                            cardValueStatus={this.state.covidDataTodayDeaths}
                            cardValueStatusClass={(this.state.covidDataTodayDeaths > 0)? "negative": "positive"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="coronavirus"
                            iconSrc="https://img.icons8.com/color/96/000000/coronavirus.png"
                            cardText="Total Active"
                            cardValue={this.state.covidDataTotalActive}
                            cardValueStatus={this.state.covidDataTodayActive}
                            cardValueStatusClass={(this.state.covidDataTodayActive > 0)? "negative": "positive"}
                        />
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="recovery"
                            iconSrc="https://img.icons8.com/color/96/000000/recovery.png"
                            cardText="Total Recovered"
                            cardValue={this.state.covidDataTotalRecovered}
                            cardValueStatus={this.state.covidDataTodayRecovered}
                            cardValueStatusClass={this.state.covidDataTodayRecovered < 0? "negative": "positive"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="hospital-bed"
                            iconSrc="https://img.icons8.com/color/96/000000/hospital-bed.png"
                            cardText="Critical Cases"
                            cardValue={this.state.covidDataTotalCritical}
                            cardValueStatus={this.state.covidDataTotalCritical}
                            cardValueStatusClass={this.state.covidDataTotalCritical > 0? "negative": "positive"}
                        />
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="group"
                            iconSrc="https://img.icons8.com/color/96/000000/group.png"
                            cardText="Cases Per Million"
                            cardValue={this.state.covidDataCasesPerMillion}
                            cardValueStatus={this.state.covidDataCasesPerMillionToday}
                            cardValueStatusClass={this.state.covidDataCasesPerMillionToday > 0? "negative": "positive"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="skull"
                            iconSrc="https://img.icons8.com/color/96/000000/skull.png"
                            cardText="Deaths Per Million"
                            cardValue={this.state.covidDataDeathsPerMillion}
                            cardValueStatus={this.state.covidDataDeathsPerMillionToday}
                            cardValueStatusClass={this.state.covidDataDeathsPerMillionToday > 0? "negative": "positive"}
                        />
                    </Col>
                    <Col md={6} lg={6} sm={12}>
                        <CovidDataCard 
                            iconAlt="test"
                            iconSrc="https://img.icons8.com/color/96/000000/test-passed.png"
                            cardText="Tests"
                            cardValue={this.state.covidDataTotalTests}
                            cardValueStatus={this.state.covidDataTodayTests}
                            cardValueStatusClass={this.state.covidDataTodayTests < 0? "negative": "positive"}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Chart
                            width={'100%'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Status', 'Number'],
                                ['Active', this.state.covidDataTotalActive], 
                                ['Recovered', this.state.covidDataTotalRecovered],
                                ['Deaths', this.state.covidDataTotalDeaths]
                            ]}
                            options={{
                                title: '',
                                slices: [
                                    {
                                      color: "#FFCE56"
                                    },
                                    {
                                      color: "#4BC0C0"
                                    },
                                    {
                                      color: "#FF8AA3"
                                    }
                                ],
                                legend: {
                                    position: "left",
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
                                    left: "20%",
                                    top: 10,
                                    width: "60%",
                                    height: "90%"
                                }
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }

}

export default CovidData;