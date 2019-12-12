import React, { useState, createContext, useEffect } from 'react';
const plotty = require("plotty");

export const AreaContext = createContext();

const AreaContextProvider = (props) => {

    var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    var [area, setArea] = useState(values)

	return (
		<AreaContext.Provider value={{area}}>
			{ props.children }
		</AreaContext.Provider>
	)
}

export default AreaContextProvider;