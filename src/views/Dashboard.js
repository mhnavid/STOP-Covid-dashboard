import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";

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

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-warning" />}
                statsText="TOTAL"
                statsValue="35.560"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph3 text-success" />}
                statsText="TOTAL MASKED"
                statsValue="18.980"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-users text-danger" />}
                statsText="TOTAL NON MASKED"
                statsValue="15,768"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-refresh-2 text-primary" />}
                statsText="TOTAL DISTANCING"
                statsValue="100"
              />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Card
                    id="chartActivity"
                    title="2014 Sales"
                    category="All products including Taxes"
                    stats="Data information certified"
                    statsIcon="fa fa-check"
                    content={
                      <div className="ct-chart">
                        <ChartistGraph
                          data={dataBar}
                          type="Bar"
                          options={optionsBar}
                          responsiveOptions={responsiveBar}
                        />
                      </div>
                    }
                    legend={
                      <div className="legend">{this.createLegend(legendBar)}</div>
                    }
                  />
            </Col>
            <Col md={4}>
              <Card
                  statsIcon="fa fa-clock-o"
                  title="Email Statistics"
                  category="Last Campaign Performance"
                  stats="Campaign sent 2 days ago"
                  content={
                    <div
                        id="chartPreferences"
                        className="ct-chart ct-perfect-fourth"
                    >
                      <ChartistGraph data={dataPie} type="Pie" />
                    </div>
                  }
                  legend={
                    <div className="legend">{this.createLegend(legendPie)}</div>
                  }
              />
            </Col>
            <Col md={4}>
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
                        defaultValue={[new Date(2020, 6, 1), new Date(2020, 6, 20)]}
                        defaultView="month"
                    />
                  </div>
                }
              />
            </Col>
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
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
