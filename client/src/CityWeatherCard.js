import { Link, useHistory } from "react-router-dom";


const CityWeatherCard = ({ city, removeCity }) =>{
  const handleCardClick = (e) => {
    if(e.stopPropagation()) e.stopPropagation();
    push(`/forecast/${city.name}`);
  }
const { push } = useHistory();
return(

    <div className="city-card" id="city-card" key={city.id} onClick={handleCardClick}>
      <button onClick={(e) => {removeCity(city.name); e.stopPropagation()}} className="remove-button">
        <i className="fas fa-times"></i>
        <Link to="/"></Link>
      </button>     
      <p className="city-name">{city.name}</p>    
      <p className="city-temperature">{city.info.temp}&#176;C</p>
      <span className="city-card-info" >
           
        <div className="inline-city-information" id="inline-city-information">
          <p className="city-wind">Vėjas<br/> {city.wind}m/s</p>
          <p className="city-pressure">Slėgis<br/> {city.info.pressure}mbar</p>
          <p className="city-humidity">Drėgmė<br/> {city.info.humidity}%</p>
        </div>
      </span> 
  </div>
 
)
}
export default CityWeatherCard;