import React, { useContext, useEffect, useState } from 'react';
import { Button, CustomInput } from 'reactstrap';
import { Link } from 'react-router-dom'
import { TargetContext } from '../context/TargetContextProvider';

const TargetTab = (props) => {

	const { targetHandleDis, displayTarget } = useContext(TargetContext);

	const [tab, setTab] = useState(false)

	useEffect(() => {
		//console.log(display)
	}, [])

	const handleGenerate = () => {
		setTab(true)
	}

  return (
    <div>
    	<Link to='#' style={{textDecoration:'none'}}>
			<Button
				onClick={handleGenerate}
				size="sm" style={{marginBottom:10}}
			>Generate</Button>
		</Link>
		{tab ?
			displayTarget.map((item, index) => {
				return (
					<div key={index} style={{marginBottom:10}}>
						<CustomInput 
							type="checkbox" 
							id={`target${index}`} 
							label={item.label}
							checked={item.display}
							onChange={() => targetHandleDis(index)} 
						/>			
					</div>				
				)
			})		
		:
			null
		}

    </div>
  )
}

export default TargetTab;