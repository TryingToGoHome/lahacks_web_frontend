import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'reactstrap';
import GraphForm from './form';

class Background extends React.Component
{
    render()
    {
        return (
            <div>
                <Jumbotron>
                    <h1>Covid-19 trend matching</h1>
                </Jumbotron>
                <GraphForm/>
            </div>
        )
    }
}

export default Background