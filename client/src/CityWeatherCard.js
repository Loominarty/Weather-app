import { Link, useHistory } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const CityWeatherCard = ({ city }) =>{
const { push } = useHistory();
return(
  <CSSTransition classNames="card" key={city.id} timeout={500}>
    <div className="city-card" id="city-card" key={city.id} onClick={() => {push(`/forecast/${city.name}`);}}>
      <button className="remove-button">
        <i className="fas fa-times"></i>
        <Link to="/"></Link>
      </button>     
      <p className="city-name">{city.name}</p>       
      <span className="city-card-info" >
        <p className="city-temperature">{city.info.temp}&#176;C</p>   
        <div className="inline-city-information" id="inline-city-information">
          <p className="city-wind">Vėjas<br/> {city.wind}m/s</p>
          <p className="city-pressure">Slėgis<br/> {city.info.pressure}mbar</p>
          <p className="city-humidity">Drėgmė<br/> {city.info.humidity}%</p>
        </div>
      </span> 
  </div>
  </CSSTransition>
)
}
export default CityWeatherCard;