require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path=require('path');
var multer = require('multer');
if(process.env.NODE_ENV==='production'){
  app.use(express.static('build'));
}
app.use(express.static(path.resolve(__dirname, '/build')));
var api=process.env.API_KEY;
var url="http://api.openweathermap.org/data/2.5/weather?q="
var url_2="http://api.openweathermap.org/data/2.5/forecast?q="
var exclude="&exclude=current,minutely,hourly,alerts"
const port_1=process.env.PORT || 8080;
console.log(port_1);
var units="&units=metric";
var upload = multer();
var request = require('request');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.post('/city', upload.none(), (req, res) => {
    app.locals.newCity=req.body.cityInput;
    res.send(app.locals.newCity);
  })
app.post('/weather', (req,res) =>{
let city=req.app.locals.newCity;
current_url=url+city+exclude+"&appid="+api+units;

request(current_url, (error, response, body) =>{
body= JSON.parse(body);

if(error && response.statusCode != 200){
  throw error;
}
else{
  res.send(body);
}
console.log(body);
})

})
app.post('/forecast/selected_city', (req,res)=>{
app.locals.selected_city=req.body.name;
//console.log(app.locals.selected_city)

res.send(app.locals.selected_city);






})

app.post('/forecast/:name', (req,res) => {

let city=req.app.locals.selected_city;
city=city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
//console.log(city);
forecast_url=url_2+city+exclude+"&appid="+api+units;

request(forecast_url, (error, response, body) =>{
  body= JSON.parse(body);
  
  if(error && response.statusCode != 200){
    throw error;
  }
  else{
    res.send(body);
  }
  //console.log(body);
  })



})
app.post('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});
app.listen(port_1);