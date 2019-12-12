import React, { useState, createContext } from 'react';
const plotty = require("plotty");

export const TargetContext = createContext();

const TargetContextProvider = (props) => {

	const [target, setTarget] = useState([
		require('../images/Prospeksi/Area_Prospect_Decimal_8.tif'),
	])

	plotty.addColorScale("target", ["red","yellow","yellow","blue"], [0.25,0.375,0.5,0.625]);

	const [displayTarget, setDisplay] = useState([
		{
			label: 'Target',
			display: false,
			colorScale: "target"
		},
	])

	const targetHandleDis = (index) => {
		setDisplay(displayTarget
			.map((item, j) => (j === index ? Object.assign(item, { display: !item.display }) : item)
		))
    }

	return (
		<TargetContext.Provider value={{target, displayTarget, targetHandleDis}}>
			{ props.children }
		</TargetContext.Provider>
	)
}

export default TargetContextProvider;