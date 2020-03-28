import React, { Component } from "react";

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { city: "", criteria: "" };
  }

  myChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
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
    console.log(this.state);
    // console.log(this.state.criteria);
    return (
      <div>
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
export default MyForm;
