import React from 'react'
import Client from '../Client'
import canvasJS from 'canvasjs'

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
}

export default {MyGraph};