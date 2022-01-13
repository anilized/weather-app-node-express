const axios = require('axios');

 const forecast = (lat,long,address,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bf6f8d9fbf78b58e96194ac30a41d1ba&query='+lat +','+ long;
    axios.get(url).then(result => {
        
        let weatherDegree = result.data.current.temperature;
        let rainPercentage = result.data.current.precip;
        let desc = result.data.current.weather_descriptions[0];
        let res = 'Location: ' + address+ ' Result is ' + weatherDegree + ' ' + rainPercentage + ' ' + desc;
        callback(res);
    })
    .catch((error)=>{
        console.log(error);
    })

 }

 module.exports = forecast;