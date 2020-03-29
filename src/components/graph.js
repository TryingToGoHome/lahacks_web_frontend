import React from 'react';
import Client from '../Client';
import CanvasJSReact from './canvasjs.react';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class MyGraph extends React.Component
{
    constructor(props)
    {
        super(props);
        var graphData;
        this.state = {
            target: props.target,
            goal: props.goal,
            data: props.data
        };
    }
    
    componentDidUpdate(prevProps)
    {
        if (prevProps.target != this.props.target || prevProps.goal != this.props.goal || prevProps.data != this.props.data)
        {
            this.setState({target: this.props.target, goal: this.props.goal, data: this.props.data})
        }
    }

    render()
    {
        console.log(this.state.target)
        var title;
        if (this.state.target == "")
        {
            title = "";
        }
        else
        {
            title = `${this.state.target} vs. ${this.state.goal}`;
        }
        const options = {
            animationEnabled: true,
            title: {text: title},
            data: [{
                name: this.state.target, 
                type: "spline",
                showInLegend: true,
                dataPoints: this.state.data[this.state.target]
            }, 
            {
                name: this.state.goal,
                type: "spline",
                showInLegend: true,
                dataPoints: this.state.data[this.state.goal]
            }]
        };
        return (
            <div>
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}

export default MyGraph;