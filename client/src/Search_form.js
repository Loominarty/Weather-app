import React,{useState} from 'react';
import axios from 'axios';
const SearchForm = ({sendDataToParent}) => {
  const [Form,setForm] = useState({
    cityInput:""
  });
  
const handleChange = (e) =>{
  let cityInput=Form.cityInput;
  cityInput = e.target.value;
  setForm({cityInput});
}

  const handleSubmit = (e) => {
     e.preventDefault();
axios.post('http://localhost:8080/weather', Form)
    .then(response =>{
if(response.status===200){
  sendDataToParent(response.data)
}
    })
    .catch(error =>{
console.log(error);
    })

  }
  
  
  
    return (
        <div className="city_form_container">
      <form method="post" action="/city" onSubmit={handleSubmit} id="form">
        <div className="material-texfield">
      <input type='text' placeholder=" " className="city_input" onChange={(e) => handleChange(e)}  name="cityInput" value={Form.cityInput} required/>
      <label className="city_label">Įveskite miestą </label>
      </div>
      <button type="submit" className="submit_city"> <i className="fas fa-plus"></i><span> Pridėti miestą</span> </button>
      </form>
      
    </div>
    
    );
  
}
export default SearchForm;