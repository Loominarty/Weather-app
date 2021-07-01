import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {useEffect, useState} from 'react'
import axios from 'axios'
const InfoScreen = React.memo((props) =>{
const { name } = useParams()
const [CityResponse, setCityResponse]=useState(null);
const location=useLocation();
useEffect(() =>{
axios.post("http://localhost:8080/forecast/selected_city",{name: name})
.then(response =>{
   if(response.status===200){
      setCityResponse(response.data);
console.log(response)
   }
   
 }) 


},[name])



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



 },[CityResponse])
 
 




 

return (
<div>
   <h2>{name}</h2>
</div>


);

})

export default InfoScreen;