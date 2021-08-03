import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';
const InfoScreen = React.memo((props) =>{
const { name } = useParams();
const [Forecast,setForecast] = useState([]);
const [CityResponse, setCityResponse]=useState(null);
const [AverageTemp, setAverageTemp]=useState([])

const location=useLocation();
var date= new Date().toLocaleDateString('lt');
const toggleClass = (e,index) =>{
   let arrow_class = document.getElementsByClassName('arrow-icon');
   let forecast_class=document.getElementsByClassName('forecast-card');
   let forecast_box=document.getElementsByClassName('forecast-by-time-box');
   //console.log(element_class)
   arrow_class[index].classList.toggle('open');
   
   if(arrow_class[index].classList.contains('open')){
   forecast_class[index].classList.add('opened-card');
      forecast_class[index].classList.remove('closed-card');
      
     forecast_box[index].classList.remove('hidden-forecast');
   }else{
   forecast_box[index].classList.add('hidden-forecast');
      forecast_class[index].classList.remove('opened-card');
      forecast_class[index].classList.add('closed-card');
      
   }
  
   
   
}
useEffect(() =>{
axios.post("/forecast/selected_city",{name: name})
.then(response =>{
   if(response.status===200){
      setCityResponse(response.data);
   }
   
 }) 


},[name])



 useEffect(() =>{
    if(CityResponse!==null){
   axios.post({
   method: 'post',
   url: '/forecast/:name'
 })
 .then(res=>{
    
setForecast(res.data)

console.log(Forecast)
 })

 
    }

  
 },[CityResponse])
useEffect(()=>{
   if(Forecast.length!==0){ 
     getAverageTemp(Forecast);
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

 

   

   
    
       
      <div className="forecast-card closed-card" key={i}>
         
       
         <div className="forecast-info">




            <div className="forecast-date">{keyname}</div>
            <div className="forecast-average-temp">{AverageTemp[keyname]}&#176;C</div>


            



                  </div>
                  <div className="forecast-by-time-box hidden-forecast">
                  {Forecast.list.filter(date=>date.dt_txt.includes(keyname)).map(filtereddates=>(
                     <div className="forecast-by-time" key={filtereddates.dt_txt}>
<p className="time-for-temps">{filtereddates.dt_txt.slice(11,16)}</p>
<p className="temps-by-time">{Math.round(filtereddates.main.temp)}&#176;C</p>
</div>
 ))}
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