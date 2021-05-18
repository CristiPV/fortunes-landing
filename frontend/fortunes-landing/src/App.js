import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import WheelPage from './pages/wheelPage/wheelPage';
import HistoryPage from './pages/historyPage/historyPage';

function App() {
  return (
    <div className="App" 
      style={ { 
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ),
                          url('${process.env.PUBLIC_URL}/images/fortunes-landing-background.jpg')`,
        backgroundColor: "whitesmoke",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      } } 
    >
      <Router>
        <Switch>
          <Route exact path={ ['/wheel', ''] }>
            <WheelPage />
          </Route>
          <Route exact path="/history">
            <HistoryPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
