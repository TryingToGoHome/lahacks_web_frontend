import React, { Component } from "react";
import Client from "../Client";
import MyGraph from './graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, } from 'reactstrap';

class GraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", criteria: "", data: {}, target:"", goal:""};
    }

    myChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => { 
        Client.retrieveGraphData(this.state.city, this.state.criteria, (res) => {
            this.setState({data: res.data, target: this.state.city});
        })
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
        return (
        <div>
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
            <Button color="primary" type="submit" onClick={this.onSubmit}>
            Submit
            </Button>
        </div>
        );
    }
}
export default GraphForm;
