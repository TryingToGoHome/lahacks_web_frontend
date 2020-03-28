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
            goal: props.goal
        };
    }

    render()
    {
        const options = {
            animationEnabled: true,
            title: {text: "hello there"},
            data: [{
                name: this.state.target, 
                type: "spline",
                showInLegend: true,
                dataPoints: [
                    {x: 1, y: 1},
                    {x: 2, y: 2},
                    {x: 3, y: 3},
                    {x: 4, y: 4},
                    {x: 5, y: 5},
                ]
            }, 
            {
                name: this.state.goal,
                type: "spline",
                showInLegend: true,
                dataPoints: [
                    {x: 1, y: 5},
                    {x: 2, y: 4},
                    {x: 3, y: 3},
                    {x: 4, y: 2},
                    {x: 5, y: 1},
                ]
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