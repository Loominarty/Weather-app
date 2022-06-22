require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const got = require('got');
const api=process.env.API_KEY;
var url="http://api.openweathermap.org/data/2.5/weather?q="
var url_2="http://api.openweathermap.org/data/2.5/forecast?q="
const exclude="&exclude=current,minutely,hourly,alerts"
const port=process.env.PORT || 8080;
const units="&units=metric";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = ['http://localhost:3000','https://6147383f82275d52b521a6a6--clever-bohr-bed43a.netlify.app']
app.use(cors({
  origin:allowedOrigins }));
const normalizeName = (string) =>{
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
app.post('/addCity',async (req,res) =>{
  try{
    let cityToAdd = req.body.cityToAdd;
    const numberOfCities = req.body.numberOfCities;
    cityToAdd = normalizeName(cityToAdd);
    let current_url= url + cityToAdd + exclude + "&appid=" + api + units;
    const apiResponse = await got.get(current_url).json();
    if(!apiResponse) throw new Error('City not found');
    if(numberOfCities >= 5) throw new Error('City limit reached');
    res.send({id:apiResponse.id, name: apiResponse.name, info:apiResponse.main, wind: apiResponse.wind.speed, slug: normalizeName(apiResponse.name)});
  }catch(error){
    console.log(error);
    res.status(400).send('Error occured' + error);
  }
})

app.get('/city/:name', async (req, res) => {
  try{
    const city = req.params.name;
    const current_url = url + city + exclude + '&appid=' + api + units;
    const apiResponse = await got.get(current_url).json();
    if(!apiResponse) throw new Error('City not found');
    res.send({id:apiResponse.id, name: apiResponse.name, info:apiResponse.main, wind:apiResponse.wind.speed, slyg: normalizeName(apiResponse.name)});
  }catch(error) {
    res.status(400).send('There was an error in fetching city:' + error);
  }
});
const fetchWeatherAsync = (city) =>{
  const current_url = url + city + exclude + "&appid=" + api + units;
  return new Promise((resolve) =>{
    const apiResponse = got.get(current_url).json();
    resolve(apiResponse);
  })
}
app.post('/multipleWeather', async(req, res) => {
  try{
    const promises = [];
    const citiesArray = await req.body.cities;
    const weatherArray = [];
    citiesArray.forEach(city =>{
      promises.push(fetchWeatherAsync(city));
    })
    const results = await Promise.all(promises);
    results.forEach((city) =>{
      weatherArray.push({id: city.id, name: city.name, info:city.main, wind: city.wind.speed})
    })
    res.send(weatherArray);
  }catch(error){
    res.status(404).send('Error Occured' + error);
  }
})
app.get('/forecast/:name', async(req,res) => {
  try{
    let city=req.params.name;
city = normalizeName(city);
forecast_url=url_2+city+exclude+"&appid="+api+units;
    //const apiResponse = await got.get(forecast_url).json();
    //if(!apiResponse) throw new Error('Error occured in fetching data');
    //console.log(apiResponse);
    //res.send(apiResponse);
  }catch(error) {
    res.status(400).send('An error occured:' + error);
  }

})
app.listen(port);