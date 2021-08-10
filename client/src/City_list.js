
import React from 'react';
import {useState,useEffect} from 'react';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import {Link, useHistory} from 'react-router-dom';
const CityList = React.memo( (props) =>{
const [cityList,setCity]=useState([]);
const { push } = useHistory();


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
    
  }
  
}

useEffect(() => {

  setCity(prevCity =>[...prevCity, [newCity]]) 

    console.log(cityList)
}, [props]);
useEffect(() =>{
  localStorage.clear();
cityList.map((item)=>{
localStorage.setItem('current_temp',item[0][0].temp)
localStorage.setItem('current_wind',item[0][0].wind)
localStorage.setItem('current_pressure',item[0][0].pressure)
localStorage.setItem('current_humidity',item[0][0].humidity)
})

},[cityList])

 


return (
  <div className="city-list">
    <TransitionGroup  className="my-card">

      {
         
        cityList.map((item) =>(
          
         <CSSTransition classNames="card" key={item[0][0].index} timeout={500}>
          
          <div className="city-card" id="city-card" key={item[0][0].index } >
            
            <button className="remove-button" onClick={() => {removecity(item[0][0].index);push("/")}
}><i className="fas fa-times"></i>
<Link to="/"></Link>
</button>     
            <span className="city-card-info" onClick={() => push(`/forecast/${item[0][0].name}`)}>   
        
 
<p className="city-name">{item[0][0].name}</p>     
<p className="city-id">{item[0][0].index}</p>

<p className="city-temperature">Temperatūra:<br/> {item[0][0].temp}&#176;C</p>
<p className="city-wind">Vėjo greitis:<br/> {item[0][0].wind}m/s</p>
<p className="city-pressure">Slėgis:<br/> {item[0][0].pressure}mbar</p>
<p className="city-humidity">Drėgnumas:<br/> {item[0][0].humidity}%</p>


</span> 


</div>



 </CSSTransition>
))
       
      }



</TransitionGroup>

</div>
);
})
export default CityList;