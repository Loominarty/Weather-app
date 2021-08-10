import React from 'react';
import SideBar from './SideBar';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';
import InfoScreen from './InfoScreen'
function App() {
  
 
      
  return (
    
      
    
    <HashRouter basename="/">
      
    <div className="App">
    
      <SideBar/>
  
    
       
     
     <div className="content">
     <div className="background"></div> 
 <Switch>
   <Route exact path="/">
<Home/>
   </Route>
   <Route exact path="/forecast/:name">
     <InfoScreen/>
   </Route>
 </Switch>

    
      
     </div>
      
      
       
    </div>
    </HashRouter>
   
  );
}

export default App;
