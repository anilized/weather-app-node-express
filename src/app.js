const path = require('path');
const express = require("express");
const hbs = require('hbs');
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast.js");

console.log(__dirname);
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.use(express.static(publicDirPath ));


app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Anil Can'
  });
});

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About Me',
    imageLink: '../img/anger.png'
  });
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help',
    help: 'You need help?'
  });
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'Must provide address'
    });
  }
  const address = req.query.address
  geocode(address, ({error,lat, long} = {}) => {
    if(!lat || !long){
      return res.send({error: error})
    }
    forecast(lat, long, address,(data) => {
      res.send({
          forecast: data,
          location: address,
          address: address
      })
    });
  });
  
});

app.get('/products', (req,res) => {
  if(!req.query.search){
    return res.send({
      error: 'Must provide search term'
    });
  }
  return res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
    res.render('notfound', {
      title: 'Page Not Found',
      message: 'Help article not found'
    });
});

// Must get last
app.get('*',(req,res) => {
    res.render('notfound', {
      title: '404',
      message: 'Page not found'
    });
});

app.listen(3000, () => {
  console.log("====== SERVER IS UP ON 3000 ======");
});
