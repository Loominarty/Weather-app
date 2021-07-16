import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import axios from 'axios'
const InfoScreen = React.memo((props) =>{
const { name } = useParams();
const [Forecast,setForecast] = useState([]);
const [CityResponse, setCityResponse]=useState(null);
const [AverageTemp, setAverageTemp]=useState([])
const location=useLocation();
var date= new Date().toLocaleDateString('lt');
const toggleClass = (e,index) =>{
   let element_class = document.getElementsByClassName('arrow-icon');
   //console.log(element_class)
   element_class[index].classList.toggle('open');
  // e.classList.toggle('open')
 // console.log(e.currentTarget.className);
   
   
}
useEffect(() =>{
axios.post("http://localhost:8080/forecast/selected_city",{name: name})
.then(response =>{
   if(response.status===200){
      setCityResponse(response.data);
//console.log(response)
   }
   
 }) 


},[name])



 useEffect(() =>{
    if(CityResponse!==null){
   axios.post({
   method: 'post',
   url: 'http://localhost:8080/forecast/:name'
 })
 .then(res=>{
    
setForecast(res.data)

console.log(Forecast)
 })

 
    }

//console.log(date);
  
 },[CityResponse])
useEffect(()=>{
   if(Forecast.length!==0){
    // getUniqueDates(Forecast); 
     getAverageTemp(Forecast);
     getTempsByTime(Forecast);
   }
console.log(Forecast)

},[Forecast])




const getAverageTemp = (forecastdata) =>{
   
const temps = forecastdata.list.map(x => x.main.temp)
const dates= forecastdata.list.map(x => x.dt_txt.split(" ")[0]);
const merged_array = [];
let counts = [];
for(var i=0;i<temps.length;i++){
   merged_array.push(`${dates[i]} ${temps[i]}`)
}
dates.forEach(function(x) {counts[x]=(counts[x] || 0)+1});
console.log(counts);
const splited_array=merged_array.map(x => x.split(" "))
const average = splited_array.reduce((accumulator, currentValue) => {
if(!accumulator[currentValue[0]]){
   accumulator[currentValue[0]]=0;
  
}
accumulator[currentValue[0]]+=Math.round(parseFloat(currentValue[1]/counts[currentValue[0]]))
return accumulator
},{});
setAverageTemp(average);
console.log(AverageTemp);
//console.log(average)
}
const getTempsByTime = (forecastdata) =>{
  

}

 

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
   <div className="forecast-data">
{

 AverageTemp ? Object.keys(AverageTemp).map((keyname,i) =>

 

   

   
    
       
      <div className="forecast-card" key={i}>
         
       
         <div className="forecast-info">




            <div className="forecast-date">{keyname}</div>
            <div className="forecast-average-temp">{AverageTemp[keyname]}&#176;C</div>


            



                  </div>
                  <div>
                  <a className={"arrow-icon"} onClick={(e)=>toggleClass(e,i)}>
  <span className="left-bar"></span>
  <span className="right-bar"></span>
</a>
           </div>      
      </div>
  ):"Kraunama"
   
}
   </div>
</div>


);

})

export default InfoScreen;