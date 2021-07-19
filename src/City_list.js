
import React from 'react';
import {useState,useEffect} from 'react';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import {Link, useHistory} from 'react-router-dom';
const CityList = React.memo( (props) =>{
const [cityList,setCity]=useState([]);
const { push } = useHistory();

/*
const newForecast = [
  cityList.length+1,
  props.forecast[0].list
]
*/
  const newCity = [
    {
      index:cityList.length+1,
  name:props.city.name,
    temp:props.city.main.temp,
    wind:props.city.wind.speed,
    pressure:props.city.main.pressure,
    humidity:props.city.main.humidity
    }
    
]

const removecity = (CityToRemove) =>{
  setCity(cityList.filter((t)=>t[0][0].index!==CityToRemove))
  for(let i=CityToRemove;i<=cityList.length-1;i++){
    cityList[i][0][0].index=cityList[i][0][0].index-1
    //ForecastList[i][0][0]=ForecastList[i][0][0]-1
  }
  /*
  setCity(ForecastList.filter((t)=>t[0]!==CityToRemove))
  for(let i=CityToRemove;i<=ForecastList.length-1;i++){
    ForecastList[i][0]=ForecastList[i][0]-1
  }
*/
}

useEffect(() => {

    setCity(prevCity =>[...prevCity, [newCity]])
    //setForecastList(prevForecast =>[...prevForecast, [newForecast]])
    
    console.log(cityList)
}, [props]);


 


return (
  <div className="city-list">
    <TransitionGroup  className="my-card">

      {
         
        cityList.map((item) =>(
          
         <CSSTransition classNames="card" key={item[0][0].index} timeout={500}>
           
          <div className="city-card" id="city-card" key={item[0][0].index }>
<Link to={{pathname:`/forecast/${item[0][0].name}`, state:{current_temp: item[0][0].temp, current_wind:item[0][0].wind, current_pressure: item[0][0].pressure, current_humidity:item[0][0].humidity}}}>            
<p className="city-id">{item[0][0].index}</p>
<p className="city-name">Miestas: {item[0][0].name}</p>
<p className="city-temperature">Temperatūra: {item[0][0].temp}&#176;C</p>
<p className="city-wind">Vėjo greitis: {item[0][0].wind}m/s</p>
<p className="city-pressure">Slėgis: {item[0][0].pressure}mbar</p>
<p className="city-humidity">Drėgnumas: {item[0][0].humidity}%</p>
</Link>

<button className="remove-button" onClick={() => {removecity(item[0][0].index);push("/")}
}><i className="fas fa-times"></i>
<Link to="/"></Link>
</button>

</div>

{/*</Link> */}

 </CSSTransition>
))
       
      }



</TransitionGroup>

</div>
);
})
export default CityList;