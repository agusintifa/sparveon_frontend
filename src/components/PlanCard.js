import React from 'react';
import { Card, CardText,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Link } from "react-router-dom";


export default function PlanCard() {
    return (
        <div>
            <Card body>
                <CardTitle><h2>Premium</h2></CardTitle>
                <CardSubtitle><h1>200 M</h1></CardSubtitle>
                <CardText>25 km<sup>2</sup></CardText>
                <CardText>3 months</CardText>
                <Link to="/payments"><Button color='warning'>I want this</Button></Link>
            </Card>
        </div>
    )
}
