import React, {useState} from 'react';
import SearchForm from './Search_form';
import CityList from './City_list';
const SideBar = () => {
  const [city, setCity]=useState(null);
  const [isActive, setActive]= useState("false");
  const[isShown, setShown]=useState("false");
  const ToggleClass = () =>{
    setActive(!isActive);
    setShown(!isShown);
    if(!isActive){
      document.getElementById("navbar").style.left = "0%";
    
      
    }else{
      document.getElementById("navbar").style.left = "-19rem";
     
    }
  };
  
  
 
return (
<nav className="navbar" id="navbar">
   <div className={isActive ? "hamburger-container change" : "hamburger-container"} id="hamburger" onClick={ToggleClass}>
   <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
   </div>
   
<div className={isShown ? "nav-elements " : "nav-elements hide"} id="nav-elements" >
<SearchForm sendDataToParent={setCity}/>


</div>
<div className="cities-container">
<h2 id="cities-header">Miestai</h2>  

  
{city && <CityList city={city}/>}



</div>
</nav>  
);
}
export default SideBar;