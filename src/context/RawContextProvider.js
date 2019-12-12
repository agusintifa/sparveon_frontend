import React, { useState, createContext } from 'react';
const plotty = require("plotty");

export const RawContext = createContext();

const RawContextProvider = (props) => {

	plotty.addColorScale("regionalGeology", 
		["rgb(255, 0, 0)","rgb(211, 255, 190)","rgb(56, 168, 0)","rgb(255, 115, 223)","rgb(255, 170, 0)","rgb(156, 156, 156)","rgb(230, 0, 169)","rgb(255, 211, 127)"], 
		[0.0625,0.375,0.4375,0.5,0.5625,0.625,0.6875,1]
	);
	plotty.addColorScale("DEM", 
		["black","grey","white"], 
		[0,0.5,1]
	);

	const [raw, setRaw] = useState([
		require('../images/RAW/Geologi_Regional3_compressed.tif'),
		require('../images/RAW/Digital_Elevation_Model_compressed.tif'),
		//require('../images/RAW/GeofisikaRTP_Clip.tif'),
	])

	const [display, setDisplay] = useState([
		{
			label: 'Geologi Regional',
			display: false,
			colorScale: "regionalGeology",
			opacity: 1,
		},
		{
			label: 'Digital Elevation Model',
			display: false,
			colorScale: "DEM",
			opacity: 1,
		},
		// {
		// 	label: 'Geofisika',
		// 	display: false,
		// 	colorScale: "electric",
		// 	opacity: 1,
		// }
	])

	const handleDis = (index) => {
		setDisplay(display
			.map((item, j) => (j === index ? Object.assign(item, { display: !item.display }) : item)
		))
	}
	
	const handleOpacity = (index, val) => {
		setDisplay(display
			.map((item, j) => (j === index ? Object.assign(item, { opacity: val }) : item)
		))
	}

	return (
		<RawContext.Provider value={{raw, display, handleDis, handleOpacity}}>
			{ props.children }
		</RawContext.Provider>
	)
}

export default RawContextProvider;