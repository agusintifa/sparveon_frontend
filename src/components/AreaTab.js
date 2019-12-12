import React, { useContext } from 'react';
import { Button, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom'
import { AreaContext } from '../context/AreaContextProvider';

const AreaTab = (props) => {

	const { area } = useContext(AreaContext)
	//console.log(area)
  return (
    <div>
    	<Link to='/dashboard' style={{textDecoration:'none'}}><Button size="sm" style={{marginBottom:10}}>New Selection</Button></Link>
		<div style={{marginBottom:10}} key={0}>
			<CustomInput 
				type="radio" 
				id={0} 
				label="Demo Area" 
				name="checked"
			/>
		</div>
		{area.map((item , index) => {
			return (
				<div style={{marginBottom:10}} key={index+1}>
				<CustomInput 
					type="radio" 
					id={index+1} 
					label={item.name} 
					name="checked"
				/>
			</div>
			)	
		})
		}
    </div>
  )
}

export default AreaTab;