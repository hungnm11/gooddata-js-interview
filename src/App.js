// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
// const dateAttributeInMonths = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttributeInYears =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2005";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  constructor() {
    super();

    this.onHandleYears = this.onHandleYears.bind(this);

    this.state = {
      firstDay: "2016-01-01",
      lastDay: "2016-12-31",
    };
  }
  getYearFilter() {
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
          uri: dateAttributeInYears,
        },
        localIdentifier: "a1",
      },
    };
  }

  formatDate(ddd) {
    let today = new Date(ddd);
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    [yyyy, mm, dd].join('-');
    // today = yyyy + "-" + mm + "-" + dd;
    return [yyyy, mm, dd].join('-');;
  }

  onHandleYears(e) {
    const lastDayOfYear = new Date(
      new Date(parseInt(e.target.value), 1, 1).getFullYear(),
      11,
      31
    );
    this.setState({
      firstDay: parseInt(e.target.value) + "-1-1",
      lastDay: this.formatDate(lastDayOfYear),
    });
  }

  //   onHandleMonths(e) {
  //     console.log(parseInt(e.target.value) + 1);
  //     const firstDay = this.formatDate(2016, parseInt(e.target.value), 1);
  //     const lastDay = this.formatDate(2016, parseInt(e.target.value) + 1, 0);
  //     console.log("FirstDay: ", firstDay, "LastDay :", lastDay);
  //     this.setState({
  //       firstDay,
  //       lastDay,
  //     });
  //   }

  renderDropdown() {
    const years = ["2015", "2016", "2017"];
    // const months = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    return (
      <select defaultValue="2016" onChange={this.onHandleYears}>
        {years.map((yrs, i) => (
          <option key={i} value={yrs}>
            {yrs}
          </option>
        ))}
        ;
      </select>
    );
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const filters = [this.getYearFilter()];
    // const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    return (
      <div className="App">
        <h1>$ Gross Profit in Year {this.renderDropdown()}</h1>
        {/* <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1> */}
        <div>
          <ColumnChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>
        <h1>$ Gross Profit - All years</h1>
        {/* <h1>$ Gross Profit - All months</h1> */}
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
