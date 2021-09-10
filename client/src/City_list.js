import React from 'react';
import {useState,useEffect} from 'react';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import {Link, useHistory} from 'react-router-dom';
const CityList = React.memo((props) => {
      const {
        push
      } = useHistory();
      const [retrieved_object, setObject] = useState(null)
      const [newCity, setNewCity] = useState(null)

      useEffect(() => {
        //console.log(localStorage.getItem('cities'))
        if (localStorage.getItem('cities') !== null) {
          setObject(JSON.parse(localStorage.getItem('cities')))
        }

      }, [])
      useEffect(() => {

        if (props.city.name !== "") {
          setNewCity(props.city)
        }

      }, [props.city])



      useEffect(() => {
        if (newCity !== null) {


          var old = localStorage.getItem('cities', JSON.stringify(newCity))
          if (old === null) {

            localStorage.setItem('cities', JSON.stringify(newCity))
            setObject(JSON.parse(localStorage.getItem('cities')))
          } else {
            old = JSON.parse(old);
            localStorage.setItem('cities', JSON.stringify(old.concat(newCity)))
            setObject(JSON.parse(localStorage.getItem('cities')))
          }
        }
        //console.log(JSON.parse(localStorage.getItem('cities')).length)

        //console.log(retrieved_object)
      }, [newCity])

      const removecity = (CityToRemove) => {
        var arr = [];
        arr = JSON.parse(localStorage.getItem('cities')).filter((t) => t.index !== CityToRemove)
        //console.log(arr);
        localStorage.setItem('cities', JSON.stringify(arr))
        setObject(JSON.parse(localStorage.getItem('cities')))
      }


 


return (
  <div className="city-list">
    <TransitionGroup  className="my-card">

      {retrieved_object ?
         
        retrieved_object.map((item) =>(
          
         <CSSTransition classNames="card" key={item.index} timeout={500}>
           
           
          
          <div className="city-card" id="city-card" key={item.index} >
            <button className="remove-button" onClick={() => {removecity(item.index);push("/")}
}><i className="fas fa-times"></i>
<Link to="/"></Link>
</button>     
     <p className="city-name">{item.name}</p>       
              
        
 <span className="city-card-info" onClick={() => {
   push(`/forecast/${item.name}`);
   
}}>
  <p className="city-temperature">{item.temp}&#176;C</p>   


<div className="inline-city-information" id="inline-city-information">

<p className="city-wind">Vėjas<br/> {item.wind}m/s</p>
<p className="city-pressure">Slėgis<br/> {item.pressure}mbar</p>
<p className="city-humidity">Drėgmė<br/> {item.humidity}%</p>
</div>
</span> 




</div>



 </CSSTransition>
))
       
      :''}



</TransitionGroup>

</div>
);
})
export default CityList;