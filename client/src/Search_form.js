import React from 'react';
import axios from 'axios';
const SearchForm = ({sendDataToParent}) => {
  
  





 
  const handleSubmit = (event) => {

     event.preventDefault();
    const data= new FormData(document.querySelector('#form'));
    
    data.set('cityInput', data.get('cityInput'));
    
  
axios.post('http://localhost:8080/weather',data)
    .then(response =>{
if(response.data.cod===200){
  sendDataToParent(response.data)
}


    })
    .catch(error =>{
console.log(error);
    })

  }
  
  
  
    return (
        <div className="city_form_container">
      <form method="post" action="/city" encType="multipart/form-data" onSubmit={handleSubmit} id="form">
        <div className="material-texfield">
      <input type='text' placeholder=" " className="city_input" name="cityInput" required/>
      <label className="city_label">Įveskite miestą </label>
      </div>
      <button type="submit" className="submit_city"> <i className="fas fa-plus"></i><span> Pridėti miestą</span> </button>
      </form>
      
    </div>
    
    );
  
}
export default SearchForm;