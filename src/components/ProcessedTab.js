import React, { useState, useContext, useEffect } from 'react';
import { Button, CustomInput, FormGroup, Form } from 'reactstrap';
import { Link } from 'react-router-dom'
import { MineralContext } from '../context/MineralContextProvider';
import { StrukturContext } from '../context/StrukturContextProvider';

const ProcessedTab = (props) => {
	const { mineralHandleDis, closeAll, displayMineral, handleProcess } = useContext(MineralContext)
	const { strukturHandleDis, displayStruktur } = useContext(StrukturContext)
	const [mineralDisplay, setMineralDisplay] = useState(false)
	const [lithologyDisplay, setLithologyDisplay] = useState(false)
	const [tab, setTab] = useState(false)
	
	useEffect(() => {
		if(!mineralDisplay){
			closeAll()
		}
	},[mineralDisplay])

	const handleGenerate = () => {
		setTab(true)
		handleProcess()
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
			<div>
				<div style={{marginBottom:10}}>
					<CustomInput 
						type="checkbox" 
						id="processed1" 
						label="Mineral"
						checked={mineralDisplay}
						onChange={(e) => setMineralDisplay(!mineralDisplay)} 
					/>
					<div style={{marginLeft:30}}>
					{mineralDisplay && displayMineral.map((item, index) => (
						<div key={index}>
							<CustomInput 
								type="checkbox" 
								id={`mineral${index}`} 
								label={item.label}
								checked={item.display}
								onChange={() => mineralHandleDis(index)}
							/>
						</div>		
					))
					}
					</div>
				</div>
				<div style={{marginBottom:10}}>
				{displayStruktur.map((item, index) => (
					<div key={index}>
						<CustomInput 
							type="checkbox" 
							id={`lineament${index}`} 
							label={item.label}
							checked={item.display}
							onChange={() => strukturHandleDis(index)}
						/>
					</div>		
				))
				}
				</div>
				{/* <div style={{marginBottom:10}}>
					<CustomInput 
						type="checkbox" 
						id="processed4" 
						label="Lithology Zone"
						onChange={(e) => setLithologyDisplay(!lithologyDisplay)}  
					/>
					{lithologyDisplay ?
						<div style={{marginLeft:30}}>
							<CustomInput 
								type="checkbox" 
								id="rock1" 
								label="Rock A" 
							/>
							<CustomInput 
								type="checkbox" 
								id="rock2" 
								label="Rock B" 
							/>	
							<CustomInput 
								type="checkbox" 
								id="rock3" 
								label="Rock C" 
							/>	
						</div>
					:
						null
					}
				</div> */}
			</div>		
		:
			null
		}

    </div>
  )
}

export default ProcessedTab;