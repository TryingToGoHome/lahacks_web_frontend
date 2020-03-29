import React, { Component } from "react";
import Client from "../Client";
import MyGraph from "../components/graph";

class GraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", criteria: "", matchingCity:null, data: {}, target:"", goal:""};
    }

  myChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = () => { 
    Client.retrieveGraphData(this.state.city, this.state.criteria, (res) => {
        this.setState({data: res.data, target: this.state.city});
    })
  };

  render() {
    let matchingCityOptions = [
        <option key="first" value="LA">
          LA
        </option>,
        <option key="second" value="NY">
          NY
        </option>
      ];
    let cityOptions = [
      <option key="first" value="LA">
        LA
      </option>,
      <option key="second" value="NY">
        NY
      </option>
    ];
    let criteriaOptions = [
      <option key="first">5 days</option>,
      <option key="second">10 days</option>
    ];
    const isChosen = this.state.matchingCity;
    console.log(this.state);
    return (
      <div>
          <div>
            <span>
                Select the matching city:
            </span>
            <select name="matchingCity" onChange={this.myChangeHandler}>
            <option disabled selected value="">
                Select the matching city
            </option>
            {matchingCityOptions}
            </select>
          </div>
        <MyGraph target={this.state.target} goal={this.state.goal} data={this.state.data}/>
        <select name="city" onChange={this.myChangeHandler}>
        <option disabled selected value="">
            Select the city
        </option>
        {cityOptions}
        </select>
        <select name="criteria" onChange={this.myChangeHandler}>
        <option disabled selected value="">
            Select the criteria
        </option>
        {criteriaOptions}
        </select>
        <button type="submit" onClick={this.onSubmit}>
        Submit
        </button>
      </div>
    );
  }
}
export default GraphForm;
