import React, { useContext, useEffect, useState } from 'react';
import { Button, CustomInput, Col, Row, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom'
import { RawContext } from '../context/RawContextProvider';
import OpacitySlider from './OpacitySlider';

const RawTab = (props) => {

	const { handleDis, display } = useContext(RawContext);
	// useEffect(() => {
	// 	//console.log(display)
	// }, [])

	const [color, setColor] = useState([
		{color:"red",label:"ROCK A"},
		{color:"yellow",label:"ROCK B"},
		{color:"green",label:"ROCK C"},
		{color:"blue",label:"ROCK D"},
	])

  return (
    <div>
    	<Link to='#' style={{textDecoration:'none'}}><Button size="sm" style={{marginBottom:10}}>Input Additional Info</Button></Link>
		{display.map((item, index) => {
			return (
				<div key={index} style={{marginBottom:20}}>
					<div>
						<CustomInput 
							type="checkbox" 
							id={`raw${index}`} 
							label={item.label}
							checked={item.display}
							onChange={() => handleDis(index)} 
						/>
						{item.display ?
							<OpacitySlider id={index}/>
						:
							null
						}
					</div>
					{index === 0 && color.map((item,index) => (
						<div key={index} style={{display:'flex',alignItems:'center', marginLeft:30}}>
							<div style={{height:15,width:15,background:`${item.color}`, marginRight:10}}></div>
							<div>{item.label}</div>
						</div>
					))							
					}					
				</div>				
			)
		})
		}
    </div>
  )
}

export default RawTab;