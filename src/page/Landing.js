import React, { useEffect } from 'react';
import Jumbo from '../components/Jumbo';
import Login from '../components/Login'

export default function Landing() {

    return (
    <div style={{marginTop:100, display:'flex', justifyContent:'center', alignItems:'center'}}>
       	<Login/>	
    </div>
    )
}
