import React from 'react';
import { CustomInput, Form, FormGroup, Label, Row, Col, Button} from 'reactstrap';
import PlanCard from '../components/PlanCard';
import { Link } from "react-router-dom";

export default function Payments() {
    return (
        <Row style={{display: 'flex', justifyContent:'space-around', marginTop:100}}>
            <Col sm="4">
                <PlanCard/>
            </Col>
            <Col sm="4">
                <FormGroup>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-around', height:'50vh'}}>
                    <Label for="exampleCheckbox">Pilih Metode Pembayaran</Label>
                        <CustomInput type="radio" id="exampleCustomRadio" name="customRadio" label="Cash" />
                        <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Transfer" />
                        <CustomInput type="radio" id="exampleCustomRadio3" name="customRadio" label="Kartu Kredit"/>
                        <CustomInput type="radio" id="exampleCustomRadio4" name="customRadio"label="Indomaret/Alfamart"/>
                </div>
                <Link to="/dashboard"><Button color='warning' block>Bayar</Button></Link>
                </FormGroup>
            </Col>
        </Row>
    )
}
