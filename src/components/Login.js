import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', width:'20%'}}>
            <h5 style={{alignSelf:'center'}}>WELCOME</h5>
            <Form>
                <FormGroup>
                    <Input placeholder="username"/>
                </FormGroup>
                <FormGroup>
                    <Input placeholder="password" type="password"/>
                </FormGroup>
                <Link to="/dashboard" style={{textDecoration:'none'}}><Button style={{marginBottom:10, backgroundColor:'white', color:'black'}} size="sm" block>LOGIN</Button></Link>
                <Link style={{textDecoration:'none'}}><Button size="sm" block color='warning'>SIGN UP</Button></Link>
            </Form>
        </div>
    )
}
