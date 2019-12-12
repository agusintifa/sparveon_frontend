import React from 'react'
import { Jumbotron, Button } from 'reactstrap';
import Login from './Login'

export default function Jumbo() {
    return (
        <Jumbotron style={{display:'flex', flexDirection:'row'}}>
            <div style={{flex:2, paddingRight:50}}>
                <h1 className="display-3">Welcome to Sparveon</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <Button color="primary">Get Started</Button>
            </div>
            <div style={{flex:1}}>
                <Login/>
            </div>
        </Jumbotron>
    )
}
