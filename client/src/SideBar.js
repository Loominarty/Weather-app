import React, {useEffect, useState} from 'react';
import CityList from './City_list';
import axios from 'axios'
const SideBar = () => {
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
    }, [])

    const [city, setCity] = useState([]);

    const [isActive, setActive] = useState("false");
    const [isShown, setShown] = useState("false");
    const [Form, setForm] = useState({
      cityInput: ""
    });

    const handleChange = (e) => {
      let cityInput = Form.cityInput;
      cityInput = e.target.value;
      setForm({
        cityInput
      });
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8080/weather', Form)
        .then(response => {
          // console.log(response)
          if (response.status === 200) {
            setCity({
              index: localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')).length : 0,
              name: response.data.name,
              temp: response.data.main.temp,
              wind: response.data.wind.speed,
              pressure: response.data.main.pressure,
              humidity: response.data.main.humidity
            })
            //console.log(city)
            //sendDataToParent(response.data)
          }
        })
        .catch(error => {
          //console.log(error);
        })

    }
   
  
  
 
return (
<nav className="sidebar" id="sidebar">
   <div className={isActive ? "hamburger-container" : "hamburger-container change"} id="hamburger" onClick={ToggleClass}>
   <div className="bar1"></div>
  <div className="bar2"></div>
  <div className="bar3"></div>
   </div>
   
<div className={isShown ? "sidebar-elements hide" : "sidebar-elements"} id="sidebar-elements" >
<div className="city_form_container">
      <form method="post" action="/city" onSubmit={handleSubmit} id="form">
        <div className="material-texfield">
      <input type='text' placeholder=" " className="city_input" onChange={(e) => handleChange(e)}  name="cityInput" value={Form.cityInput} required/>
      <label className="city_label">Įveskite miestą </label>
      </div>
      <button type="submit" className="submit_city"> <i className="fas fa-plus"></i><span> Pridėti miestą</span> </button>
      </form>
      
    </div>


</div>
<div className="cities-container">
<h2 id="cities-header">Miestai</h2>  

  
{<CityList city={city}/>}



</div>
</nav>  
);
}
export default SideBar;