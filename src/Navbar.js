import React, {useState} from 'react';
import Search_form from './Search_form';
const Navbar = () => {
  const [isActive, setActive]= useState("false");

  const ToggleClass = () =>{
    setActive(!isActive);
    if(!isActive){
      document.getElementById("navbar").style.left = "0%";
    }else{
      document.getElementById("navbar").style.left = "-16%";
    }
  };
return (
<nav className="navbar" id="navbar">
   <div className={isActive ? "hamburger-container change" : "hamburger-container"} id="hamburger" onClick={ToggleClass}>
   <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
   </div>
   <Search_form/>
<div className="nav-elements"></div>
<h2 id="cities-header">Miestai</h2>
<div className="nav-cities"></div>

</nav>  
);
}
export default Navbar;