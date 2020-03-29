import React, { Component } from "react";
import Client from "../Client";
import MyGraph from './graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class GraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", criteria: "", data: {}, target:"", goal:"", isOpen:false};
        this.available_cities = ["Los Angeles", "New York"]
    }

    myChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => { 
        Client.retrieveGraphData(this.state.city, this.state.criteria, (res) => {
            this.setState({data: res.data, target: this.state.city});
        })
    };

    toggle = () =>
    {
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        let cityOptions = this.available_cities.map((city, idx) =>
            <DropdownItem key={idx} value={city}>{city}</DropdownItem>
        )
        let criteriaOptions = [
        <option key="first">5 days</option>,
        <option key="second">10 days</option>
        ];
        var target;
        if (this.state.target == "")
        {
            target = "Select a city";
        }
        else 
        {
            target = this.state.target;
        }
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
            <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <Button id="caret" color="primary">{target}</Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu right>
                    <DropdownItem header>Select a city</DropdownItem>
                    <DropdownItem divider/>

                </DropdownMenu>
            </ButtonDropdown>
            <Button color="primary" type="submit" onClick={this.onSubmit}>
                Submit
            </Button>
        </div>
        );
    }
}
export default GraphForm;
