import React, { useState, createContext } from 'react';
const plotty = require("plotty");

export const StrukturContext = createContext();

const StrukturContextProvider = (props) => {

	plotty.addColorScale("lineament", ["black", "red","red","red","red","red","red","red"], [0, 0.01,0.05,0.1,0.2,0.3, 0.75, 1]);

	const [struktur, setStruktur] = useState([
		require('../images/Struktur/Lineament2.tif'),
	])

	const [displayStruktur, setDisplay] = useState([
		{
			label: 'Lineament',
			display: false,
			colorScale: "lineament"
		},
	])

	const strukturHandleDis = (index) => {
		setDisplay(displayStruktur
			.map((item, j) => (j === index ? Object.assign(item, { display: !item.display }) : item)
		))
    }

	return (
		<StrukturContext.Provider value={{struktur, displayStruktur, strukturHandleDis}}>
			{ props.children }
		</StrukturContext.Provider>
	)
}

export default StrukturContextProvider;