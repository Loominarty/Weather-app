import React from 'react';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
import ForecastCard from './ForecastCard';
const InfoScreen = () => {
         const {
            name
         } = useParams();
         const [Forecast, setForecast] = useState([]);
         const [CityResponse, setCityResponse] = useState(null);
         const [AverageTemp, setAverageTemp] = useState([])
         var date = new Date().toLocaleDateString('lt');
   useEffect(() => {
            //console.log(name);
      axios.get(`${process.env.REACT_APP_SERVER_URL}/city/${name}`)
      .then(response => {
         //console.log(response)
         if (response.status === 200) {
            setCityResponse(response.data)
            //console.log(CityResponse)
            }
      })
      .catch(error => {
         console.log(error);
      })
      axios.get(`${process.env.REACT_APP_SERVER_URL}/forecast/${name}`)
      .then(res => {
         if(res.status === 200) {
            const tempForecast = res.data.forecast;
            const keys = Object.keys(tempForecast);
            const average = {};
            keys.forEach((key) => {
               const count = tempForecast[key].length;
               tempForecast[key].map((element) =>{
                  if(!average[key]) average[key] = 0;
                  average[key] += parseFloat(element.temp);
               });
               average[key] = average[key] / count;
            });
            setForecast(tempForecast);
            setAverageTemp(average);
            console.log(Object.keys(average))
         }
      })
      
   }, [name])

return (
<div className="Info-screen">
   
   <div className="current-city-data">   
      <h2 className="current-city-name">{CityResponse && CityResponse.name}</h2>
      <p className="current-date">{date}</p>
      <p className="current-city-temp">{CityResponse && Math.round(CityResponse.info.temp)}&#176;C</p>
      <div className="current-info-wrapper">
      <div className="current-city-wind"><div className="wind-label">Vėjo greitis</div>{CityResponse && Math.round(CityResponse.wind)} m/s</div>
      <div className="current-city-pressure"><div className="pressure-label">Slėgis</div>{CityResponse && CityResponse.info.pressure} mbar</div>
      <div className="current-city-humidity"><div className="humidity-label">Drėgmė</div>{CityResponse && CityResponse.info.humidity}%</div>
      </div>
      
   </div>
      <div className="forecast-data">
   { Object.keys(Forecast).length !== 0 && Object.keys(Forecast).map((key) => (
      <ForecastCard date={key} key={key} average={AverageTemp[key] && AverageTemp[key]} forecast={Forecast[key]}/>
   ))
   }
      </div>
</div>


);

}

export default InfoScreen;