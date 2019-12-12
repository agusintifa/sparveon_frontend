import React from 'react'
import { Row, Col} from 'reactstrap';
import PlanCard from '../components/PlanCard';

export default function Plan() {
    return (
        <div style={{marginLeft:20, marginRight:20, marginTop:100}}>
            <h3 style={{marginBottom:10}}>Choose a Plan</h3>
            <Row>
            <Col sm="4">
                <PlanCard/>
            </Col>
            <Col sm="4">
                <PlanCard/>
            </Col>
            <Col sm="4">
                <PlanCard/>
            </Col>
            </Row>
        </div>
    )
}
