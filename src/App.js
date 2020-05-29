// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  constructor() {
    super();

    this.onHandleMonths = this.onHandleMonths.bind(this);

    this.state = {
      firstDay: "2016-01-01",
      lastDay: "2016-12-31",
    };
  }
  getMonthFilter() {
    const { firstDay, lastDay } = this.state;
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute,
        },
        from: firstDay,
        to: lastDay,
      },
    };
  }

  getMeasures() {
    return [
      {
        measure: {
          localIdentifier: "m1",
          definition: {
            measureDefinition: {
              item: {
                uri: grossProfitMeasure,
              },
            },
          },
          alias: "$ Gross Profit",
        },
      },
    ];
  }

  getViewBy() {
    return {
      visualizationAttribute: {
        displayForm: {
          uri: dateAttributeInMonths,
        },
        localIdentifier: "a1",
      },
    };
  }

  formatDate(y, m, d) {
    let today = new Date(y, m, d);
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = 2016;
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  }

  onHandleMonths(e) {
    console.log(parseInt(e.target.value) + 1);
    const firstDay = this.formatDate(2016, parseInt(e.target.value), 1);
    const lastDay = this.formatDate(2016, parseInt(e.target.value) + 1, 0);
    console.log("FirstDay: ", firstDay, "LastDay :", lastDay);
    this.setState({
      firstDay,
      lastDay,
    });
  }

  renderDropdown() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <select defaultValue="1" onChange={this.onHandleMonths}>
        {months.map((mon, i) => (
          <option key={i} value={i}>
            {mon}
          </option>
        ))}
        ;
      </select>
    );
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    console.log('viewBy ==>', viewBy)
    return (
      <div className="App">
        <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1>
        <div>
          <ColumnChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>
        <h1>$ Gross Profit - All months</h1>
        <div>
          <ColumnChart
            measures={measures}
            viewBy={viewBy}
            projectId={projectId}
          />
        </div>
      </div>
    );
  }
}

export default App;
