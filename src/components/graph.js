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
        Client.retrieveGraphData(props.city, props.criteria, (res) => {
            graphData = res.data;
        });
    }

    render()
    {
        const options = {title: {text: "hello there"},
                         data: [{
                             type: "column",
                             dataPoints: [
                                 {label: "happy", y: 1},
                                 {label: "happy", y: 2},
                                 {label: "happy", y: 3},
                                 {label: "happy", y: 4},
                                 {label: "happy", y: 5},
                             ]
                         }]};
        return (
            <div>
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}

export default MyGraph;