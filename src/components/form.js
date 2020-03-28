import React, { Component } from "react";

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", criteria: "" };
  }

  myChangeHandler = event => {
    this.setState({ [event.target.value]: event.target.value });
  };

  onSubmit = () => {};

  render() {
    let cityOptions = ["LA", "NY"];
    let criteriaOptions = ["5 days", "10 days"];
    return (
      <form onSubmit={this.onSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    );
  }
}
