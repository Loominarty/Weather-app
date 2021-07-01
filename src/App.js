import React from 'react';
import SideBar from './SideBar';
import Home from './Home';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import InfoScreen from './InfoScreen'
function App() {
  
 
      
  return (
    
      
    
    <Router>
    <div className="App">
    <div className="background"> </div>
      <SideBar/>
  
    
       
     
     <div className="content">
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
    </Router>
   
  );
}

export default App;
