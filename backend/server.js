require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path=require('path');
var multer = require('multer');
var api=process.env.API_KEY;
var url="http://api.openweathermap.org/data/2.5/weather?q="
var url_2="http://api.openweathermap.org/data/2.5/forecast?q="
var exclude="&exclude=current,minutely,hourly,alerts"
const port=process.env.PORT || 8080;
console.log(port);
var units="&units=metric";
var upload = multer();
var request = require('request');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.post('/weather',upload.none(), (req,res) =>{
//console.log(req.body)
  let city=req.body.cityInput;
  city=city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
current_url=url+city+exclude+"&appid="+api+units;

request(current_url, (error, response, body) =>{
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

app.post('/forecast/:name', (req,res) => {
//console.log(req.body)
let city=req.body.name;
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




app.listen(port);