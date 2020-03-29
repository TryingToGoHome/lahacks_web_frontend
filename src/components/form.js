import React, { Component } from "react";
import Client from "../Client";
import MyGraph from './graph';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ButtonDropdown, ButtonGroup, DropdownToggle, DropdownMenu, DropdownItem, Collapse, Card, CardBody, CardTitle, CardText, Row, Col} from 'reactstrap';

class GraphForm extends Component {
    constructor(props) {
        super(props);
        this.state = { city: "", criteria: "", data: {}, target:"", goal:"", isOpenCity:false, isOpenCrit:false, isOpenPoli:false};
        this.available_cities = ["Los Angeles", "New York"];
        this.criteria = ["5 days", "10 days"];
    }

    myChangeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => { 
        Client.retrieveGraphData(this.state.city, this.state.criteria, (res) => {
            this.setState({data: res.data, target: this.state.city});
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

    render() {
        let cityOptions = this.available_cities.map((city, idx) =>
            <DropdownItem name="city" key={idx} value={city} onClick={this.myChangeHandler}>{city}</DropdownItem>
        );
        let criteriaOptions = this.criteria.map((cri, idx) =>
            <DropdownItem name="criteria" key={idx} value={cri} onClick={this.myChangeHandler}>{cri}</DropdownItem>
        );

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
        console.log(this.state);
        return (
        <div>
            <MyGraph target={this.state.target} goal={this.state.goal} data={this.state.data}/>
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
