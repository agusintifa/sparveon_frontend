import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Landing from './page/Landing';
import Plan from './page/Plan';
import MapPage from './page/Map';

import Navbar from './components/Navbar';
import Payments from './page/Payments';
import Result from './page/Result';
import MineralContextProvider from './context/MineralContextProvider';
import RawContextProvider from './context/RawContextProvider';
import StrukturContextProvider from './context/StrukturContextProvider';
import TargetContextProvider from './context/TargetContextProvider';
import AreaContextProvider from './context/AreaContextProvider';

const container = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent : 'center',
  //alignItems: 'center'
}

class App extends Component {
  render() {
    return (
      <AreaContextProvider>
      <TargetContextProvider>
      <StrukturContextProvider>
      <RawContextProvider>
      <MineralContextProvider>
      <Router>
        <div style={container}>
          <Route path="/" exact component={Landing} />
          <Route path="/plan" component={Plan} />
          <Route path="/dashboard" component={MapPage} />
          <Route path="/payments" component={Payments} />
          <Route path="/result" component={Result} />
        </div>
      </Router>
      </MineralContextProvider>
      </RawContextProvider>
      </StrukturContextProvider>
      </TargetContextProvider>
      </AreaContextProvider>
    );
  }
}

export default App;