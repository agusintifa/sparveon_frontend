import React, { useState, createContext } from 'react';
const plotty = require("plotty");

export const MineralContext = createContext();

const MineralContextProvider = (props) => {

	plotty.addColorScale("alunite", ["black", "rgb(255, 255, 255)"], [0, 1]);
	plotty.addColorScale("chlorite", ["black", "rgb(170, 255, 0)"], [0, 1]);
	plotty.addColorScale("hematite", ["black", "rgb(230, 0, 169)"], [0, 1]);
	plotty.addColorScale("illite", ["black", "rgb(0, 92, 230)"], [0, 1]);
	plotty.addColorScale("kaolinite", ["black", "rgb(255, 255, 0)"], [0, 1]);

	const [mineral, setMineral] = useState([
		require('../images/Mineral/Alunite_New.tif'),
		require('../images/Mineral/Chlorite_New.tif'),
		require('../images/Mineral/Hematite_New.tif'),
		require('../images/Mineral/Illite_New.tif'),
		require('../images/Mineral/Kaolinite_New.tif'),
	])

	const [process, setProcess] = useState(false);

	const [displayMineral, setDisplay] = useState([
		{
			label: 'Alunite',
			display: false,
			colorScale: "alunite"
		},
		{
			label: 'Chlorite',
			display: false,
			colorScale: "chlorite"
		},
		{
			label: 'Hematite',
			display: false,
			colorScale: "hematite"
		},
		{
			label: 'Illite',
			display: false,
			colorScale: "illite"
		},
		{
			label: 'Kaolinite',
			display: false,
			colorScale: "kaolinite"
		},
	])

	const mineralHandleDis = (index) => {
		setDisplay(displayMineral
			.map((item, j) => (j === index ? Object.assign(item, { display: !item.display }) : item)
		))
	}

	const handleProcess = () => {
		setProcess(true)
	}
	
	const closeAll = () => {
		setDisplay(displayMineral
			.map(item => (Object.assign(item, { display: false })
		)))
	}

	return (
		<MineralContext.Provider 
			value={{mineral, displayMineral, mineralHandleDis, closeAll, process, handleProcess
			}}
		>
			{ props.children }
		</MineralContext.Provider>
	)
}

export default MineralContextProvider;