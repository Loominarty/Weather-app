import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios'
import { appendToLocalStorage, getLocalStorageItemCount, getLocalStorageItems, isCityInLocalStorage } from './utils/storage';
import CityWeatherCard from './CityWeatherCard';
import { TransitionGroup } from 'react-transition-group';

const SideBar = () => {
    const [cities, setCities] = useState([]);
    const [isActive, setActive] = useState("false");
    const [isShown, setShown] = useState("false");
    const [error, setError] = useState(null);
    const form = useRef(null);
    const updateCities = () => {
      axios.post(`${process.env.REACT_APP_SERVER_URL}/multipleWeather`,{cities: getLocalStorageItems()})
      .then((response) => {
        setCities(response.data);
      })
    }
    const ToggleClass = () => {
      let sidebar = document.getElementById("sidebar");
      let city_cards = document.getElementsByClassName('city-list');
      setActive(!isActive);
      setShown(!isShown);
      if (isActive) {
        sidebar.classList.add('sidebar-opened');
      } else {
        sidebar.classList.remove('sidebar-opened');

      }
      //console.log(city_cards)
      if (city_cards.length > 0 && sidebar.classList.contains('sidebar-opened')) {
        city_cards[0].style.display = "block";
      }

      if (city_cards.length > 0 && sidebar.classList.contains('sidebar-opened') === false) {
        city_cards[0].style.display = "none";
      }
    };
    useEffect(() => {
      let sidebar = document.getElementById("sidebar");
      let city_cards = document.getElementsByClassName('city-list');
      if (city_cards.length > 0 && sidebar.classList.contains('sidebar-opened') === false) {
        city_cards[0].style.display = "none";
      }
      updateCities();
    }, [])
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("activated")
      const inputtedCity = form.current.value;
      console.log(inputtedCity);
      if(inputtedCity) {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/addCity`, {cityToAdd: inputtedCity, numberOfCities: getLocalStorageItemCount()})
        .then((response) =>{
          if(response.status === 200){
            console.log(response);
            if(!isCityInLocalStorage(response.data.name)){
              appendToLocalStorage(response.data.name);
              setCities(oldCities => [...oldCities, response.data]);
            }
            
          }
        })
      }
      
    }
return(
<nav className="sidebar" id="sidebar">
   <div className={isActive ? "hamburger-container" : "hamburger-container change"} id="hamburger" onClick={ToggleClass}>
   <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
   </div>
   
<div className={isShown ? "sidebar-elements hide" : "sidebar-elements"} id="sidebar-elements" >
<div className="city_form_container">
      <form method="post" onSubmit={handleSubmit} id="form">
        <div className="material-texfield">
      <input ref={form} type='text' placeholder="" className="city_input" name="cityInput"/>
      <label className="city_label">Įveskite miestą </label>
      </div>
      <button type="submit" className="submit_city"> <i className="fas fa-plus"></i><span> Pridėti miestą</span> </button>
      </form>
      
    </div>


</div>
<div className="cities-container">
<h2 id="cities-header">Miestai</h2>  

<div className="city-list">
  <TransitionGroup  className="my-card">
    {cities.length > 0 &&
      cities.map((city) => (
        <CityWeatherCard key={city.id} city={city}/>
      ))
    }
  </TransitionGroup>
</div>
{/* <CityList city={city}/> */}



</div>
</nav>  
);
}
export default SideBar;