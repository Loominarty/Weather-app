import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import axios from 'axios'
const InfoScreen = React.memo((props) =>{
const { name } = useParams();

const [CityResponse, setCityResponse]=useState(null);
const location=useLocation();
var date= new Date().toLocaleDateString('lt');

useEffect(() =>{
axios.post("http://localhost:8080/forecast/selected_city",{name: name})
.then(response =>{
   if(response.status===200){
      setCityResponse(response.data);
console.log(response)
   }
   
 }) 


},[name])


/*
 useEffect(() =>{
    if(CityResponse!==null){
   axios({
   method: 'post',
   url: 'http://localhost:8080/forecast/:name'
 })
 .then(res=>{

console.log(res.data)
 })
    }

console.log(date);

 },[CityResponse])
 
 */




 

return (
<div className="Info-screen">
   
   <div className="current-city-data">
    
<h2 className="current-city-name">{name}</h2>
<p className="current-date">{date}</p>
<p className="current-city-temp">{Math.round(location.state.current_temp)}&#176;C</p>
<p className="current-city-wind"><span className="wind-label">Vėjo greitis</span><br/>{Math.round(location.state.current_wind)} m/s</p>
<p className="current-city-pressure"><span className="pressure-label">Slėgis</span><br/>{location.state.current_pressure} mbar</p>
<p className="current-city-humidity"><span className="humidity-label">Drėgmė</span><br/>{location.state.current_humidity}%</p>
   </div>
   
</div>


);

})

export default InfoScreen;