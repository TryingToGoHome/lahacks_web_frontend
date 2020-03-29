import React, { Component } from "react";
import Client from "../Client";
import MyGraph from './graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Card, CardBody, CardTitle, CardText, Row, Col} from 'reactstrap';

class GraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", criteria: "", data: {}, target:"", goal:"", goalList:[], isOpenCity:false, isOpenCrit:false, isOpenPoli:false, goalSelDisabled:true};
        this.available_cities = ["Los Angeles", "New York"];
        this.criteria = ["5 days", "10 days"];
    }

    myChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => { 
        if (this.state.city == "" || this.state.criteria == "")
        {
            alert("select a city and a criteria to perform a match!");
            return;
        }
        Client.retrieveGraphData(this.state.city, this.state.criteria, (res) => {
            this.setState({data: res.data, target: res.target, goalList:res.goal,
                 goalSelDisabled:false, goal:res.goal[0]});
        })
    };

    toggleCrit = () =>
    {
        this.setState({isOpenCrit: !this.state.isOpenCrit});
    }
    toggleCity = () =>
    {
        this.setState({isOpenCity: !this.state.isOpenCity});
    }
    togglePoli = () =>
    {
        this.setState({isOpenPoli: !this.state.isOpenPoli});
    }
    toggleGoal = () =>
    {
        this.setState({isOpenGoal: !this.state.isOpenGoal});
    }

    render() {
        let cityOptions = this.available_cities.map((city, idx) =>
            <DropdownItem name="city" key={idx} value={city} onClick={this.myChangeHandler}>{city}</DropdownItem>
        );
        let criteriaOptions = this.criteria.map((cri, idx) =>
            <DropdownItem name="criteria" key={idx} value={cri} onClick={this.myChangeHandler}>{cri}</DropdownItem>
        );
        let goalOptions = this.state.goalList.map((goal, idx) => 
            <DropdownItem name="goal" key={idx} value={goal} onClick={this.myChangeHandler}>{goal}</DropdownItem>
        )

        var city;
        if (this.state.city == "")
        {
            city = "Select a city";
        }
        else 
        {
            city = this.state.city;
        }
        var criteria;
        if (this.state.criteria == "")
        {
            criteria = "Select a criteria";
        }
        else
        {
            criteria = this.state.criteria;
        }
        var match;
        if (this.state.goal == "")
        {
            match = "select a city to perform match";
        }
        else
        {
            match = this.state.goal;
        }
        var data;
        if (this.state.data == {})
        {
            data = {};
        }
        else
        {
            data = {[this.state.target]: this.state.data[this.state.target], [this.state.goal]: this.state.data[this.state.goal]}
        }
        console.log(this.state);
        return (
        <div>
            <ButtonDropdown isOpen={this.state.isOpenGoal} toggle={this.toggleGoal}>
                <Button id="carat" color="primary" disabled={this.state.goalSelDisabled}>{match}</Button>
                <DropdownToggle caret color="primary" disabled={this.state.goalSelDisabled}/>
                <DropdownMenu right>
                    <DropdownItem header>Select a matched city</DropdownItem>
                    <DropdownItem divider/>
                    {goalOptions}
                </DropdownMenu>
            </ButtonDropdown>
            <MyGraph target={this.state.target} goal={this.state.goal} data={data}/>
            <ButtonDropdown isOpen={this.state.isOpenCity} toggle={this.toggleCity}>
                <Button id="caret" color="primary">{city}</Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu right>
                    <DropdownItem header>Select a city</DropdownItem>
                    <DropdownItem divider/>
                    {cityOptions}
                </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown isOpen={this.state.isOpenCrit} toggle={this.toggleCrit}>
                <Button id="caret" color="primary">{criteria}</Button>
                <DropdownToggle caret color="primary" />
                <DropdownMenu right>
                    <DropdownItem header>Select a criteria</DropdownItem>
                    <DropdownItem divider/>
                    {criteriaOptions}
                </DropdownMenu>
            </ButtonDropdown>
            <Button color="primary" type="submit" onClick={this.onSubmit}>
                Submit
            </Button>
            <div>
                <Button color="primary" onClick={this.togglePoli} style={{marginBottom: "1rem"}}>Compare policies</Button>
                <Collapse isOpen={this.state.isOpenPoli}>
                    <Row>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>{this.state.target}</CardTitle>
                                <CardText>
                                    <ul>
                                        <li>Policy 1</li>
                                        <li>Policy 2</li>
                                    </ul>
                                </CardText>
                            </Card>
                        </Col>
                        <Col sm="6">
                            <Card body>
                                <CardTitle>{this.state.goal}</CardTitle>
                                <CardText>
                                    <ul>
                                        <li>Policy 1</li>
                                        <li>Policy 2</li>
                                    </ul>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </Collapse>
            </div>
        </div>
        );
    }
}
export default GraphForm;
