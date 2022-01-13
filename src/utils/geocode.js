const axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW5pbGl6ZWQiLCJhIjoiY2t5OHZjb2FoMDBiZTJvbWZ2NXRsbWM2ZCJ9.JNkend05lASma3nTMOY-JA';
    const latlng = {
      lat: 0,
      long: 0,
      error: ''
    }
    axios.get(url).then(result => {
        if(result.data.features.length != 0){
          latlng.long = result.data.features[0].geometry.coordinates[0];
          latlng.lat = result.data.features[0].geometry.coordinates[1];
          return callback(latlng, address);
        } else {
          latlng.error = 'No address found'
          return callback(latlng);
        }
    }).catch(error=>{
      console.log(error);
    });
  }

module.exports = geocode;