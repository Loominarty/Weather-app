import React, {useState} from 'react';
import SearchForm from './Search_form';
import CityList from './City_list';
const SideBar = () => {
  const [city, setCity]=useState(null);
  const [isActive, setActive]= useState("false");
  const[isShown, setShown]=useState("false");
  const ToggleClass = () =>{
    let sidebar=document.getElementById("sidebar");
    let city_cards=document.getElementsByClassName('city-list');
    setActive(!isActive);
    setShown(!isShown);
    if(isActive){
      sidebar.classList.add('sidebar-opened');
      
      
    }else{
      sidebar.classList.remove('sidebar-opened');
      
    }
    console.log(city_cards)
    if(city_cards.length>0 && sidebar.classList.contains('sidebar-opened')){
      city_cards[0].style.display = "block";
    }
    if(city_cards.length>0 && sidebar.classList.contains('sidebar-opened')===false){
      city_cards[0].style.display = "none";
    }
    

  };
  
  
 
return (
<nav className="sidebar" id="sidebar">
   <div className={isActive ? "hamburger-container" : "hamburger-container change"} id="hamburger" onClick={ToggleClass}>
   <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
   </div>
   
<div className={isShown ? "sidebar-elements hide" : "sidebar-elements"} id="sidebar-elements" >
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